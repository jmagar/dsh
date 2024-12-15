import { config as dotenvConfig } from 'dotenv';

// Load environment variables first
dotenvConfig();

import { config } from './config';
import { createServer } from './server';
import { initializeDb } from './utils/db';
import { logger } from './utils/logger';

async function startServer(): Promise<void> {
  try {
    // Ensure database is connected before starting the server
    const db = await initializeDb();

    // Perform a simple query to verify database connection
    await db.$queryRaw`SELECT 1`;

    const server = await createServer();

    // Start the server
    server.listen(config.server.port, (): void => {
      logger.info(`Server running on port ${config.server.port}`, {
        component: 'server',
        metrics: {
          port: config.server.port,
        },
      });
    });
  } catch (error: unknown) {
    logger.error('Error starting server', {
      component: 'server',
      error: error instanceof Error ? error : new Error(String(error)),
    });
    throw error;
  }
}

// Add Promise<void> return type to the IIFE
startServer().catch((error: unknown): void => {
  logger.error('Unhandled error in server startup', {
    component: 'server',
    error: error instanceof Error ? error : new Error(String(error))
  });
  process.exit(1);
});
