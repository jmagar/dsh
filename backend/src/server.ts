import 'dotenv/config';
import { createServer as createHttpServer } from 'http';

import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { verify } from 'jsonwebtoken';
import { Server as SocketServer } from 'socket.io';

import { config } from './config';
import { setupAgentRoutes } from './routes/agent';
import { setupHealthRoutes } from './routes/health';
import { AgentMonitor } from './utils/agent';
import { db } from './utils/db';
import { logger } from './utils/logger';
import { redis } from './utils/redis';

interface SocketData {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface SocketAuth {
  token: string;
}

// Extend SocketServer with additional properties while maintaining base functionality
type SocketIOServer = SocketServer<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
> & {
  engine: {
    clientsCount: number;
  };
};

export function createServer(): ReturnType<typeof createHttpServer> {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors());
  app.use(
    rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.max,
    })
  );

  // Request handling middleware
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(logger.requestLogger());

  // Error handling
  app.use(logger.errorLogger());

  // Create HTTP server
  const server = createHttpServer(app);

  // Socket.IO setup with proper typing
  const io = new SocketServer<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    SocketData
  >(server, {
    cors: {
      origin: config.server.frontendUrl,
      methods: ['GET', 'POST'],
    },
  }) as SocketIOServer;

  const agentMonitor = AgentMonitor.getInstance(db, redis);

  // Add routes
  app.use('/health', setupHealthRoutes(db, redis));
  app.use('/agent', setupAgentRoutes(io, db, redis, agentMonitor));

  // Socket authentication middleware (for non-agent connections)
  io.of('/').use((socket, next) => {
    const auth = socket.handshake.auth as SocketAuth;
    if (!auth?.token || typeof auth.token !== 'string') {
      next(new Error('Authentication required'));
      return;
    }

    try {
      const decoded = verify(auth.token, config.jwt.secret) as SocketData['user'];
      socket.data = { user: decoded };
      next();
    } catch (error) {
      next(new Error('Invalid authentication token'));
    }
  });

  // Socket connection handling
  io.on('connection', socket => {
    logger.info('Socket connected', {
      component: 'server',
      metrics: {
        socketConnections: io.engine.clientsCount,
      },
    });

    socket.on('error', (error: unknown) => {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      logger.error('Socket error', {
        component: 'server',
        error: errorObj,
        metrics: {
          socketConnections: io.engine.clientsCount,
        },
      });
    });

    socket.on('disconnect', () => {
      logger.info('Socket disconnected', {
        component: 'server',
        metrics: {
          socketConnections: io.engine.clientsCount,
        },
      });
    });
  });

  return server;
}
