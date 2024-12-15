import 'dotenv/config';
import { createServer as createHttpServer } from 'http';

import compression from 'compression';
import express, { json, urlencoded } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { verify } from 'jsonwebtoken';
import { Server as _SocketServer } from 'socket.io';
import { Server as WebSocketServer } from 'ws';

import { config } from './config';
import { setupAgentRoutes } from './routes/agent';
import { setupHealthRoutes } from './routes/health';
import { agentMonitorPromise } from './utils/agent';
import { initializeDb } from './utils/db';
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
type SocketIOServer = _SocketServer<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
> & {
  engine: {
    clientsCount: number;
  };
};

export async function createServer(): Promise<express.Application> {
  const app = express();

  // Security middleware
  app.use(helmet());

  // Compression middleware
  app.use(compression());

  // Body parsing middleware
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Rate limiting middleware
  const rateLimitOptions = createRateLimitOptions();
  const limiter = rateLimit(rateLimitOptions);
  app.use(limiter);

  // Create HTTP server
  const httpServer = createHttpServer(app);

  // Create WebSocket server for agent connections
  const wss = new WebSocketServer({ noServer: true });

  // Create Socket.IO server for client connections
  const io = new _SocketServer<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    SocketData
  >(httpServer, {
    cors: {
      origin: config.server.frontendUrl,
    },
  }) as SocketIOServer;

  async function setupDependencies(): Promise<void> {
    const db = await initializeDb();
    
    // Initialize agent monitor
    await agentMonitorPromise;

    // Add routes
    const healthRoutes = setupHealthRoutes(db, redis);
    const agentRoutes = setupAgentRoutes(db, redis, wss);

    app.use('/health', healthRoutes);
    app.use('/', agentRoutes);

    // Handle WebSocket upgrades
    httpServer.on('upgrade', (_request, _socket, _head) => {
      const _requestUrl = _request.url ?? '';
      const _requestHost = _request.headers.host ?? 'localhost';
      const _pathname = new URL(_requestUrl, `http://${_requestHost}`).pathname;

      if (_pathname === '/ws/agent') {
        logger.info('WebSocket upgrade request received', {
          component: 'server',
          url: _pathname,
          metrics: {
            connections: io.engine.clientsCount,
          },
        });

        wss.handleUpgrade(_request, _socket, _head, (_ws) => {
          wss.emit('connection', _ws, _request);
        });
      } else {
        // Close the connection for unhandled upgrade requests
        _socket.destroy();
      }
    });

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
    io.on('connection', (_socket) => {
      logger.info('Socket connected', {
        component: 'server',
        metrics: {
          socketConnections: io.engine.clientsCount || 0,
        },
      });
    });
  }

  await setupDependencies();

  return app;
}

// Rate limit configuration interfaces
interface RateLimitConfig {
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
}

interface RateLimitOptions {
  windowMs: number;
  max: number;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}

// Default rate limit values
const DEFAULT_RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
} as const;

// Type guard for server config
function isRateLimitConfig(value: unknown): value is RateLimitConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    'rateLimitWindowMs' in value &&
    'rateLimitMaxRequests' in value &&
    typeof (value as RateLimitConfig).rateLimitWindowMs === 'number' &&
    typeof (value as RateLimitConfig).rateLimitMaxRequests === 'number'
  );
}

// Create rate limit options with validation
function createRateLimitOptions(): RateLimitOptions {
  if (!isRateLimitConfig(config.server)) {
    return {
      windowMs: DEFAULT_RATE_LIMIT.windowMs,
      max: DEFAULT_RATE_LIMIT.maxRequests,
      standardHeaders: true,
      legacyHeaders: false,
    };
  }

  const { rateLimitWindowMs, rateLimitMaxRequests } = config.server;
  return {
    windowMs: rateLimitWindowMs,
    max: rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false,
  };
}
