import { Router } from 'express';
import { Server as SocketServer } from 'socket.io';
import { DatabaseClient } from '../utils/db';
import { RedisClient } from '../utils/redis';
import { AgentMonitor } from '../utils/agent';
import { logger } from '../utils/logger';
import { WebSocket } from 'ws';

interface SystemMetrics {
  hostname: string;
  ipAddress: string;
  cpuUsage: number;
  memoryUsage: number;
  osInfo: {
    platform: string;
    os: string;
    arch: string;
  };
  timestamp: string;
}

export function setupAgentRoutes(
  io: SocketServer,
  db: DatabaseClient,
  redis: RedisClient,
  agentMonitor: AgentMonitor
): Router {
  const router = Router();
  const wss = new WebSocket.Server({ noServer: true });

  // Handle WebSocket upgrade
  router.get('/ws', (req, res) => {
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
      return res.status(400).json({ error: 'Expected WebSocket connection' });
    }

    // Pass request handling to WebSocket server
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), ws => {
      wss.emit('connection', ws, req);
    });
  });

  // Handle WebSocket connections
  wss.on('connection', async ws => {
    logger.info('Agent connected', {
      component: 'agent',
      metrics: {
        connections: wss.clients.size,
      },
    });

    // Handle incoming messages
    ws.on('message', async data => {
      try {
        const metrics = JSON.parse(data.toString()) as SystemMetrics;

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
            osInfo: metrics.osInfo,
          },
          update: {
            lastSeen: new Date(),
            status: 'online',
            osInfo: metrics.osInfo,
          },
        });

        // Create CPU metric
        await db.metric.create({
          data: {
            type: 'cpu',
            value: Number(metrics.cpuUsage),
            serverId: server.id,
          },
        });

        // Create memory metric
        await db.metric.create({
          data: {
            type: 'memory',
            value: Number(metrics.memoryUsage),
            serverId: server.id,
          },
        });

        // Emit metrics to connected clients
        io.emit('agent:metrics', {
          serverId: server.id,
          ...metrics,
        });

        logger.info('Received metrics from agent', {
          component: 'agent',
          metrics: {
            hostname: metrics.hostname,
            cpuUsage: metrics.cpuUsage,
            memoryUsage: metrics.memoryUsage,
          },
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error processing metrics');
        logger.error('Error processing agent metrics', {
          component: 'agent',
          error,
        });
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      logger.info('Agent disconnected', {
        component: 'agent',
        metrics: {
          connections: wss.clients.size,
        },
      });
    });
  });

  return router;
}
