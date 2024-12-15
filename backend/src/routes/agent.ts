import { Router } from 'express';
import { WebSocket } from 'ws';
import { DatabaseClient } from '../utils/db';
import { RedisClient } from '../utils/redis';
import { AgentMonitor } from '../utils/agent';
import { logger } from '../utils/logger';
import { createLogMetadata } from '@dsh/shared';

interface SystemMetrics {
  hostname: string;
  ipAddress: string;
  cpuUsage: number;
  memoryUsage: number;
  osInfo: {
    platform: string;
    os: string;
    arch: string;
    release?: string;
  };
  timestamp: string;
}

export function setupAgentRoutes(
  db: DatabaseClient,
  redis: RedisClient,
  agentMonitor: AgentMonitor
): Router {
  const router = Router();
  const wss = new WebSocket.Server({ noServer: true });

  // Handle WebSocket upgrade
  router.get('/ws/agent', (req, res) => {
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
      return res.status(400).json({ error: 'Expected WebSocket connection' });
    }

    // Pass request handling to WebSocket server
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), ws => {
      wss.emit('connection', ws, req);
    });
    return undefined;
  });

  // Handle WebSocket connections
  wss.on('connection', async (ws: WebSocket & { remoteAddress?: string, remotePort?: number }) => {
    let agentId: string | null = null;

    logger.info('Agent WebSocket Connected', 
      createLogMetadata('dsh-backend', 'development', {
        component: 'agent-websocket',
        metrics: {
          connections: Number(wss.clients.size)
        }
      })
    );

    // Handle incoming messages
    ws.on('message', async (data: Buffer) => {
      try {
        const rawMetricsStr = data.toString();
        logger.info('Received Agent Metrics', 
          createLogMetadata('dsh-backend', 'development', {
            component: 'agent-websocket',
            metrics: {
              messageSize: rawMetricsStr.length
            }
          })
        );

        const rawMetrics = JSON.parse(rawMetricsStr);
        const metrics: SystemMetrics = {
          ...rawMetrics,
          cpuUsage: Number(rawMetrics.cpuUsage),
          memoryUsage: Number(rawMetrics.memoryUsage),
        };

        // Find or create server
        const server = await db.server.upsert({
          where: {
            hostname_ipAddress: {
              hostname: metrics.hostname,
              ipAddress: metrics.ipAddress || '',
            },
          },
          create: {
            name: metrics.hostname,
            hostname: metrics.hostname,
            ipAddress: metrics.ipAddress,
            status: 'online',
            osInfo: {
              ...metrics.osInfo,
              release: metrics.osInfo.release,
            },
          },
          update: {
            lastSeen: new Date(),
            status: 'online',
            osInfo: {
              ...metrics.osInfo,
              release: metrics.osInfo.release,
            },
          },
        });

        // Store agent ID for cleanup
        agentId = server.id;

        // Update agent status in Redis
        await redis.set(`agent:${server.id}:status`, 'online');
        await redis.set(`agent:${server.id}:lastSeen`, new Date().toISOString());

        // Send metrics to agent monitor
        await agentMonitor.handleMetrics(server.id, {
          cpu: { usage: metrics.cpuUsage },
          memory: {
            used: metrics.memoryUsage,
            total: 100, // Assuming memoryUsage is a percentage
          },
          os: {
            platform: metrics.osInfo.platform,
            release: metrics.osInfo.release || metrics.osInfo.platform,
          },
          timestamp: Date.now(),
        });
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        
        logger.error('Error Processing WebSocket Message', 
          createLogMetadata('dsh-backend', errorObj, {
            component: 'agent-websocket'
          })
        );
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      if (agentId) {
        // Update agent status in Redis
        void redis.set(`agent:${agentId}:status`, 'offline');

        // Update server status in database
        void db.server.update({
          where: { id: agentId },
          data: { status: 'offline' },
        });
      }

      logger.info('Agent WebSocket Disconnected', 
        createLogMetadata('dsh-backend', 'development', {
          component: 'agent-websocket',
          metrics: {
            connections: Number(wss.clients.size)
          }
        })
      );
    });

    ws.on('error', (error: Error) => {
      logger.error('Agent WebSocket Error', 
        createLogMetadata('dsh-backend', error.message, {
          component: 'agent-websocket'
        })
      );
    });
  });

  return router;
}
