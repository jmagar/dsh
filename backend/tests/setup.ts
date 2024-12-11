/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { config } from 'dotenv';

// Load environment variables from .env.test if it exists
config({ path: '.env.test' });

// Set default test environment variables
const testEnv = {
  NODE_ENV: 'test',
  PORT: '3000',
  FRONTEND_URL: 'http://localhost:3001',
  JWT_SECRET: 'test-jwt-secret',
  REDIS_URL: 'redis://localhost:6379',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/dsh_test',
  RATE_LIMIT_WINDOW_MS: '900000',
  RATE_LIMIT_MAX_REQUESTS: '100',
} as const;

// Apply test environment variables
Object.entries(testEnv).forEach(([key, value]) => {
  process.env[key] = value;
});
