import 'dotenv/config';
import { createServer as createHttpServer } from 'http';

import compression from 'compression';
import express, { json, urlencoded } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { verify } from 'jsonwebtoken';
import { Server as SocketServer } from 'socket.io';

import { config } from './config';
import { setupAgentRoutes } from './routes/agent';
import { setupHealthRoutes } from './routes/health';
import { initializeDb } from './utils/db';
import { logger } from './utils/logger';
import { agentMonitorPromise } from './utils/agent';
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

export async function createServer(): Promise<express.Application> {
  const app = express();

  // Define server configuration type
  interface ServerConfig {
    port: number;
    frontendUrl: string;
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
  }

  // Explicitly type config.server
  const serverConfig: ServerConfig = {
    port: (config.server as any).port,
    frontendUrl: (config.server as any).frontendUrl,
    rateLimitWindowMs: (config.server as any).rateLimitWindowMs,
    rateLimitMaxRequests: (config.server as any).rateLimitMaxRequests
  };

  // Security middleware
  app.use(helmet());
  // CORS DISABLED
  // app.use(
  //   cors({
  //     origin: [
  //       serverConfig.frontendUrl, 
  //       'http://localhost:3000',  
  //       'http://127.0.0.1:3000'   
  //     ],
  //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //     allowedHeaders: ['Content-Type', 'Authorization'],
  //     credentials: true
  //   })
  // );

  // Compression middleware
  app.use(compression());

  // Body parsing middleware
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: serverConfig.rateLimitWindowMs,
    max: serverConfig.rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // WebSocket server
  const httpServer = createHttpServer(app);
  const io = new SocketServer<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    SocketData
  >(httpServer, {
    cors: {
      origin: serverConfig.frontendUrl,
    },
  }) as SocketIOServer;

  // Async initialization of dependencies
  async function setupDependencies() {
    const db = await initializeDb();
    const agentMonitor = await agentMonitorPromise;

    // Add routes
    const healthRoutes = setupHealthRoutes(db, redis);
    const agentRoutes = setupAgentRoutes(db, redis, agentMonitor);

    app.use('/health', healthRoutes);
    app.use('/', agentRoutes);

    // Handle WebSocket upgrades
    httpServer.on('upgrade', (request, socket, head) => {
      const pathname = new URL(request.url || '', `http://${request.headers.host}`).pathname;

      if (pathname === '/ws/agent') {
        logger.info('WebSocket upgrade request received', {
          component: 'server',
          url: pathname,
          metrics: {
            connections: io.engine.clientsCount,
          },
        });
        // Let the agent route handle the upgrade
        app._router.handle(request, socket as any, head);
      } else {
        // Close the connection for unhandled upgrade requests
        socket.destroy();
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
  }

  // Call setup dependencies
  await setupDependencies().catch(error => {
    logger.error('Failed to setup dependencies', {
      component: 'server',
      error: error instanceof Error ? error : new Error(String(error))
    });
    process.exit(1);
  });

  return app;
}
