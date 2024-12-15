import { createLogMetadata, LogMetadata, AgentMetadata } from '@dsh/shared';
import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Server as WebSocketServer, WebSocket } from 'ws';

import { DatabaseClient } from '../utils/db';
import { logger } from '../utils/logger';
import { RedisClient } from '../utils/redis';

interface AgentRegistrationRequest {
  hostname: string;
  osInfo: {
    platform: string;
    os: string;
    arch: string;
    release?: string;
  };
  capabilities: string[];
  environment: Record<string, string>;
}

interface AgentMetricsRequest {
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
  timestamp: string;
}

// Match Prisma's expected type
interface ServerCreateInput {
  id: string;
  name: string; // Required by Prisma
  hostname: string;
  status: 'online' | 'offline';
  lastSeen: Date;
  osInfo: AgentRegistrationRequest['osInfo'];
  metadata: string;
}

export function setupAgentRoutes(
  db: DatabaseClient,
  redis: RedisClient,
  wss: WebSocketServer
): Router {
  const router = Router();

  // Handle WebSocket upgrade
  router.get('/ws/agent', (req: Request, res: Response) => {
    const upgradeHeader = req.headers.upgrade;
    if (typeof upgradeHeader !== 'string' || upgradeHeader.toLowerCase() !== 'websocket') {
      return res.status(400).json({ error: 'Expected WebSocket connection' });
    }

    // Type-safe WebSocket server methods
    const wsServer = wss as WebSocketServer & {
      handleUpgrade(
        request: Request,
        socket: import('net').Socket,
        head: Buffer,
        callback: (client: WebSocket) => void
      ): void;
    };

    wsServer.handleUpgrade(req, req.socket, Buffer.alloc(0), (client: WebSocket) => {
      wss.emit('connection', client, req);
    });
    return undefined;
  });

  // Handle agent registration
  router.post('/register', (req: Request, res: Response) => {
    void (async () => {
      try {
        const agentId = uuidv4();
        const payload = req.body as AgentRegistrationRequest;

        const metadata: Partial<LogMetadata & AgentMetadata> = {
          component: 'agent',
          agentId,
          // Remove metrics from registration metadata as it's not relevant here
        };

        logger.info('Registering new agent', createLogMetadata('dsh-backend', undefined, metadata));

        const serverData: ServerCreateInput = {
          id: agentId,
          name: payload.hostname, // Use hostname as name
          hostname: payload.hostname,
          status: 'online',
          lastSeen: new Date(),
          osInfo: payload.osInfo,
          metadata: JSON.stringify({
            capabilities: payload.capabilities,
            environment: payload.environment,
          }),
        };

        const server = await db.server.create({
          data: serverData,
        });

        res.json({
          id: server.id,
          status: 'registered',
        });
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        logger.error('Agent registration failed', 
          createLogMetadata('dsh-backend', errorObj, {
            component: 'agent',
          })
        );
        res.status(500).json({ error: errorObj.message });
      }
    })();
  });

  // Handle agent metrics updates
  router.post('/:id/metrics', (req: Request, res: Response) => {
    void (async () => {
      const agentId = req.params.id;
      if (typeof agentId !== 'string' || agentId.length === 0) {
        res.status(400).json({ error: 'Agent ID is required' });
        return;
      }

      try {
        const payload = req.body as AgentMetricsRequest;

        const metadata: Partial<LogMetadata & AgentMetadata> = {
          component: 'agent',
          agentId,
          metrics: {
            receivedAt: new Date(payload.timestamp).getTime(),
            cpuUsage: payload.metrics.cpuUsage,
            memoryUsage: payload.metrics.memoryUsage,
          },
        };

        logger.debug('Received metrics from agent', createLogMetadata('dsh-backend', undefined, metadata));

        await db.server.update({
          where: { id: agentId },
          data: {
            lastSeen: new Date(),
            status: 'online',
          },
        });

        // Store metrics in Redis with TTL
        const metricsKey = `agent:${agentId}:metrics:latest`;
        await redis.setex(
          metricsKey,
          300, // 5 minutes TTL
          JSON.stringify(payload.metrics)
        );

        // Broadcast metrics update to connected WebSocket clients
        const message = JSON.stringify({
          type: 'metrics',
          agentId,
          metrics: payload.metrics,
          timestamp: payload.timestamp,
        });

        // Type-safe WebSocket broadcast
        const clients = wss.clients as Set<WebSocket>;
        clients.forEach((client: WebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });

        res.json({ status: 'success' });
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        logger.error('Failed to process agent metrics', 
          createLogMetadata('dsh-backend', errorObj, {
            component: 'agent',
            agentId,
          })
        );
        res.status(500).json({ error: errorObj.message });
      }
    })();
  });

  // Handle agent heartbeat
  router.post('/:id/heartbeat', (req: Request, res: Response) => {
    void (async () => {
      const agentId = req.params.id;
      if (typeof agentId !== 'string' || agentId.length === 0) {
        res.status(400).json({ error: 'Agent ID is required' });
        return;
      }

      try {
        const metadata: Partial<LogMetadata & AgentMetadata> = {
          component: 'agent',
          agentId,
        };

        logger.debug('Received heartbeat from agent', createLogMetadata('dsh-backend', undefined, metadata));

        await db.server.update({
          where: { id: agentId },
          data: {
            lastSeen: new Date(),
            status: 'online',
          },
        });

        res.json({ status: 'success' });
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        logger.error('Failed to process agent heartbeat', 
          createLogMetadata('dsh-backend', errorObj, {
            component: 'agent',
            agentId,
          })
        );
        res.status(500).json({ error: errorObj.message });
      }
    })();
  });

  return router;
}
