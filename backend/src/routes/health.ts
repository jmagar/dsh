import { AgentStatus } from '@dsh/shared/types/agent';
import { SystemMetrics } from '@dsh/shared/types/metrics';
import { LogMetadata } from '@dsh/shared/utils/logger';
import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

import { config } from '../config';
import { DatabaseClient } from '../utils/db';
import { logger } from '../utils/logger';
import { RedisClient } from '../utils/redis';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
  agents: AgentStatus[]; // Non-optional
  agentMetrics: Record<string, SystemMetrics>; // Non-optional
}

interface OsInfo {
  platform: string;
  os: string;
  arch: string;
  release?: string | undefined;
}

// Helper function to mask sensitive information in URLs
function maskUrl(url: string): string {
  return url.replace(/:[^:@]*@/, ':****@');
}

// Type guard for Record<string, unknown>
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Type guard to check if osInfo is a valid object
function isValidOsInfo(osInfo: unknown): osInfo is { release?: string } {
  return osInfo !== null && typeof osInfo === 'object';
}

// Helper function to safely parse OS info
function parseOsInfo(data: unknown): OsInfo {
  const defaultOsInfo: OsInfo = {
    platform: 'unknown',
    os: 'unknown',
    arch: 'unknown',
    release: undefined,
  };

  if (!isRecord(data)) {
    return defaultOsInfo;
  }

  return {
    platform: typeof data.platform === 'string' ? data.platform : 'unknown',
    os: typeof data.os === 'string' ? data.os : 'unknown',
    arch: typeof data.arch === 'string' ? data.arch : 'unknown',
    release: typeof data.release === 'string' ? data.release : undefined,
  };
}

// Type guard for CPU metrics
function isCPUMetrics(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.total === 'number' &&
    Array.isArray(value.cores)
  );
}

// Type guard for memory metrics
function isMemoryMetrics(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.total === 'number' &&
    typeof value.used === 'number' &&
    typeof value.free === 'number'
  );
}

// Type guard for metrics data
function isValidMetricsData(data: unknown): data is SystemMetrics {
  if (!isRecord(data)) {
    return false;
  }

  return (
    typeof data.timestamp === 'number' &&
    'cpu' in data &&
    'memory' in data &&
    isCPUMetrics(data.cpu) &&
    isMemoryMetrics(data.memory)
  );
}

// Helper function to safely parse metrics
function parseMetrics(data: string): SystemMetrics | null {
  if (typeof data !== 'string' || data.trim() === '') {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(data);
    return isValidMetricsData(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// Helper function to check if a string is non-empty
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

const pool = new Pool({
  connectionString: config.database.url,
  ssl: false, // Explicitly disable SSL for local development
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
  connectionTimeoutMillis: 5000, // How long to wait when requesting a connection
});

export function setupHealthRoutes(
  db: DatabaseClient, 
  redis: RedisClient
): Router {
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
          agents: [],
          agentMetrics: {},
        };

        const databaseCheck = async (): Promise<void> => {
          try {
            const maskedUrl = maskUrl(config.database.url);
            logger.info('Attempting to connect to database', {
              component: 'health',
              query: maskedUrl,
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
              query: maskUrl(config.database.url),
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
            const maskedUrl = maskUrl(config.redis.url);
            logger.info('Attempting to connect to Redis', {
              component: 'health',
              query: maskedUrl,
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
              query: maskUrl(config.redis.url),
            });

            status.status = 'unhealthy';
            status.details = {
              ...status.details,
              redis: false,
              error: errorObj.message,
            };
          }
        };

        const agentCheck = async (): Promise<void> => {
          try {
            // Fetch all servers (agents)
            const servers = await db.server.findMany({
              orderBy: { lastSeen: 'desc' },
              take: 10, // Limit to 10 most recent agents
            });

            // Fetch agent statuses and metrics
            for (const server of servers) {
              const osInfo = isValidOsInfo(server.osInfo) 
                ? parseOsInfo(server.osInfo) 
                : { platform: 'unknown', os: 'unknown', arch: 'unknown', release: undefined };
              const agentStatus: AgentStatus = {
                id: server.id,
                connected: server.status === 'online',
                lastSeen: server.lastSeen ?? new Date(),
                version: isNonEmptyString(osInfo.release) 
                  ? osInfo.release 
                  : 'unknown',
                systemInfo: {
                  hostname: server.hostname,
                  platform: osInfo.platform,
                  os: osInfo.os,
                  version: isNonEmptyString(osInfo.release)
                    ? osInfo.release 
                    : 'unknown',
                  architecture: osInfo.arch,
                  cpuInfo: [],
                  memoryInfo: {
                    total: 0,
                    available: 0,
                    used: 0,
                    free: 0,
                    swapTotal: 0,
                    swapUsed: 0,
                    swapFree: 0,
                  },
                  environment: {},
                  capabilities: [],
                },
              };

              status.agents.push(agentStatus);

              // Fetch agent metrics from Redis
              try {
                const metricsKey = `agent:${server.id}:metrics:latest`;
                const metricsStr = await redis.get(metricsKey);
                
                if (metricsStr === null) {
                  continue;
                }

                const metrics = parseMetrics(metricsStr);
                if (isValidMetricsData(metrics)) {
                  status.agentMetrics[server.id] = metrics;
                }
              } catch (metricsError) {
                const metadata: Partial<LogMetadata> = {
                  component: 'health',
                  error: metricsError instanceof Error ? metricsError : new Error(String(metricsError)),
                  metrics: {
                    serverId: Number(server.id),
                  },
                };

                logger.warn('Failed to fetch agent metrics', metadata);
              }
            }
          } catch (error) {
            const errorObj = error instanceof Error ? error : new Error('Agent check failed');

            logger.warn('Agent health check failed', {
              component: 'health',
              error: errorObj,
            });
          }
        };

        await Promise.all([databaseCheck(), redisCheck(), agentCheck()]);
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
