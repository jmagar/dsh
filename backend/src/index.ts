import { createServer } from './server';
import { config } from './config';
import { logger } from './utils/logger';
import { initializeDb } from './utils/db';

async function startServer() {
  try {
    // Ensure database is connected before starting the server
    const db = await initializeDb();

    // Perform a simple query to verify database connection
    await db.$queryRaw`SELECT 1`;

    const server = await createServer();

    // Start the server
    server.listen(config.server.port, () => {
      logger.info(`Server running on port ${config.server.port}`, {
        component: 'server',
        metrics: {
          port: config.server.port,
        },
      });
    });
  } catch (error) {
    logger.error('Failed to start server', {
      component: 'server',
      error: error instanceof Error ? error : new Error(String(error))
    });
    process.exit(1);
  }
}

startServer();
