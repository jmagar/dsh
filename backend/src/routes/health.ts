import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

import { logger } from '../utils/logger';
import { RedisClient } from '../utils/redis';
import { config } from '../config';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
}

const pool = new Pool({
  connectionString: config.database.url,
  ssl: false, // Explicitly disable SSL for local development
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
  connectionTimeoutMillis: 5000, // How long to wait when requesting a connection
});

export function setupHealthRoutes(_db: any, redis: RedisClient): Router {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    void (async () => {
      try {
        const status: HealthStatus = {
          status: 'healthy',
          details: {
            database: true,
            redis: true,
          },
        };

        const databaseCheck = async (): Promise<void> => {
          try {
            logger.info('Attempting to connect to database', {
              component: 'health',
              query: config.database.url.replace(/:[^:]*@/, ':****@'), // Mask password
            });

            const client = await pool.connect();
            try {
              const startTime = Date.now();
              await client.query('SELECT 1');
              const duration = Date.now() - startTime;

              logger.info('Database connection successful', {
                component: 'health',
                duration,
              });
            } finally {
              client.release();
            }
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Database connection failed');

            logger.error('Database health check failed', {
              component: 'health',
              error: errorObj,
              query: config.database.url.replace(/:[^:]*@/, ':****@'), // Mask password
            });

            status.status = 'unhealthy';
            status.details = {
              ...status.details,
              database: false,
              error: errorObj.message,
            };
          }
        };

        const redisCheck = async (): Promise<void> => {
          try {
            logger.info('Attempting to connect to Redis', {
              component: 'health',
              query: config.redis.url.replace(/:[^:]*@/, ':****@'), // Mask password
            });

            const startTime = Date.now();
            await redis.ping();
            const duration = Date.now() - startTime;

            logger.info('Redis connection successful', {
              component: 'health',
              duration,
            });
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Redis connection failed');

            logger.error('Redis health check failed', {
              component: 'health',
              error: errorObj,
              query: config.redis.url.replace(/:[^:]*@/, ':****@'), // Mask password
            });

            status.status = 'unhealthy';
            status.details = {
              ...status.details,
              redis: false,
              error: errorObj.message,
            };
          }
        };

        await Promise.all([databaseCheck(), redisCheck()]);
        res.json(status);
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('Health check failed');

        logger.error('Health check failed', {
          component: 'health',
          error: errorObj,
        });

        res.status(500).json({
          status: 'unhealthy',
          error: errorObj.message,
        });
      }
    })();
  });

  return router;
}
