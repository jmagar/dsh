/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define type for environment variables
type EnvKey = keyof typeof testEnv;

// Set test environment variables
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

// Safely set environment variables using a type-safe approach
function setTestEnv(key: EnvKey, value: string): void {
  // Use Object.assign to avoid direct mutation of process.env
  Object.assign(process.env, { [key]: value });
}

// Apply test environment variables
Object.entries(testEnv).forEach(([key, value]) => {
  setTestEnv(key as EnvKey, value);
});
