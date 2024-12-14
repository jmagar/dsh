import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

import { logger } from '../utils/logger';
import { RedisClient } from '../utils/redis';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
}

const pool = new Pool({
  connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/dsh',
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
            const client = await pool.connect();
            try {
              await client.query('SELECT 1');
            } finally {
              client.release();
            }
          } catch (error) {
            const errorObj =
              error instanceof Error ? error : new Error('Database connection failed');

            status.status = 'unhealthy';
            status.details = {
              ...status.details,
              database: false,
              error: errorObj.message,
            };

            logger.error('Database health check failed', {
              component: 'health',
              error: errorObj,
            });
          }
        };

        const redisCheck = async (): Promise<void> => {
          try {
            await redis.ping();
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Redis connection failed');

            status.status = 'unhealthy';
            status.details = {
              ...status.details,
              redis: false,
              error: errorObj.message,
            };

            logger.error('Redis health check failed', {
              component: 'health',
              error: errorObj,
            });
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
