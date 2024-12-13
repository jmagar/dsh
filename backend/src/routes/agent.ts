import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';

import { AgentMonitor } from '../utils/agent';
import { DatabaseClient } from '../utils/db';
import { logger } from '../utils/logger';
import { RedisClient } from '../utils/redis';

interface AgentData {
  cpu?: {
    usage: number;
  };
  memory?: {
    used: number;
    total: number;
  };
  os?: {
    platform: string;
    release: string;
  };
  timestamp?: number;
}

interface MetricsData extends AgentData {
  timestamp: number;
}

export function setupAgentRoutes(
  io: SocketIOServer,
  db: DatabaseClient,
  redis: RedisClient,
  agentMonitor: AgentMonitor
): Router {
  const router = Router();
  const namespace = io.of('/agent');

  namespace.on('connection', async (socket: Socket): Promise<void> => {
    const { hostname, ipAddress } = socket.handshake.query;

    if (typeof hostname !== 'string' || hostname.length === 0) {
      socket.disconnect();
      return;
    }

    const ttl = 300; // 5 minutes in seconds
    const safeHostname = hostname;
    const safeIpAddress = typeof ipAddress === 'string' ? ipAddress : '';

    try {
      // Find or create server in database
      const server = await db.server.upsert({
        where: {
          hostname_ipAddress: {
            hostname: safeHostname,
            ipAddress: safeIpAddress,
          },
        },
        create: {
          name: safeHostname,
          hostname: safeHostname,
          ipAddress: safeIpAddress,
          status: 'online',
        },
        update: {
          status: 'online',
          lastSeen: new Date(),
        },
      });

      // Cache server info in Redis
      await redis.set(`server:${safeHostname}`, JSON.stringify(server), 'EX', ttl);

      // Handle metrics from agent
      socket.on('metrics', async (data: AgentData): Promise<void> => {
        const startTime = Date.now();
        try {
          const metricsData: MetricsData = {
            ...data,
            timestamp: startTime,
          };

          await agentMonitor.handleMetrics(safeHostname, metricsData);

          // Update resource usage in database
          const updateData: Prisma.ServerUpdateInput = {
            lastSeen: new Date(),
          };

          if (data.cpu) {
            updateData.cpuInfo = {
              set: { usage: data.cpu.usage },
            };
          }
          if (data.memory) {
            updateData.memoryInfo = {
              set: {
                used: data.memory.used,
                total: data.memory.total,
              },
            };
          }
          if (data.os) {
            updateData.osInfo = {
              set: {
                platform: data.os.platform,
                release: data.os.release,
              },
            };
          }

          await db.server.update({
            where: {
              hostname_ipAddress: {
                hostname: safeHostname,
                ipAddress: safeIpAddress,
              },
            },
            data: updateData,
          });

          logger.info('Processed agent metrics', {
            component: 'agent',
            metrics: {
              cpu_usage: data.cpu?.usage ?? 0,
              memory_used: data.memory?.used ?? 0,
              memory_total: data.memory?.total ?? 0,
              processing_time: Date.now() - startTime,
            },
          });
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          logger.error('Failed to process agent metrics', {
            component: 'agent',
            error: err,
            metrics: {
              processing_time: Date.now() - startTime,
            },
          });
        }
      });

      // Handle disconnect
      socket.on('disconnect', async (): Promise<void> => {
        const startTime = Date.now();
        try {
          await db.server.update({
            where: {
              hostname_ipAddress: {
                hostname: safeHostname,
                ipAddress: safeIpAddress,
              },
            },
            data: {
              status: 'offline',
              lastSeen: new Date(),
            },
          });

          await redis.del(`server:${safeHostname}`);

          logger.info('Agent disconnected', {
            component: 'agent',
            metrics: {
              processing_time: Date.now() - startTime,
            },
          });
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error));
          logger.error('Failed to process agent disconnect', {
            component: 'agent',
            error: err,
            metrics: {
              processing_time: Date.now() - startTime,
            },
          });
        }
      });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      const startTime = Date.now();
      logger.error('Error in socket connection', {
        component: 'agent',
        error: err,
        metrics: {
          processing_time: Date.now() - startTime,
        },
      });
      socket.disconnect();
    }
  });

  return router;
}
