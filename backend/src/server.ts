import { createServer as createHttpServer, type Server } from 'http';

import compression from 'compression';
import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { Server as SocketServer, type Socket } from 'socket.io';

import { config } from './config';
import { logger } from './utils/logger';

interface SocketData {
  user: JwtPayload;
}

export async function createServer(): Promise<Server> {
  const app: Express = express();

  // Security middleware
  app.use(helmet());
  app.use(cors());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
    })
  );

  // Request handling middleware
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger.requestLogger());

  // Error handling
  app.use(logger.errorLogger());

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // Create HTTP server
  const server = createHttpServer(app);

  // Socket.IO setup
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
  });

  // Socket authentication middleware
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (typeof token !== 'string') {
      next(new Error('Authentication required'));
      return;
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  // Socket connection handling
  io.on('connection', (socket: Socket) => {
    logger.info('Socket connected', {
      component: 'server',
      metrics: {
        socketConnections: io.engine.clientsCount,
        socketId: parseInt(socket.id.replace(/\D/g, ''), 10) || 0,
      },
    });

    socket.on('error', (error: Error) => {
      logger.error('Socket error', {
        component: 'server',
        error: error instanceof Error ? error : new Error(String(error)),
        metrics: {
          socketConnections: io.engine.clientsCount,
          socketId: parseInt(socket.id.replace(/\D/g, ''), 10) || 0,
        },
      });
    });

    socket.on('disconnect', () => {
      logger.info('Socket disconnected', {
        component: 'server',
        metrics: {
          socketConnections: io.engine.clientsCount,
          socketId: parseInt(socket.id.replace(/\D/g, ''), 10) || 0,
        },
      });
    });
  });

  return server;
}
