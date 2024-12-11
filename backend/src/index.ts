import express from 'express';
import { VERSION } from '@dsh/shared';
import { config } from './config';

const app = express();

app.get('/', (_req, res) => {
  res.json({
    name: 'DSH API',
    version: VERSION,
    status: 'running'
  });
});

app.listen(config.server.port, () => {
  console.info(`Server running on port ${config.server.port}`);
});
