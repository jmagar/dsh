import { createServer } from './server';
import { config } from './config';
import { logger } from './utils/logger';

const server = createServer();

// Start the server
server.listen(config.server.port, () => {
  logger.info(`Server running on port ${config.server.port}`, {
    component: 'server',
    metrics: {
      port: config.server.port,
    },
  });
});
