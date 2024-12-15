import 'dotenv/config';
import { z } from 'zod';

// Load environment variables
dotenvConfig();

// Define environment schema for validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  FRONTEND_URL: z.string().url().default('http://localhost:3001'),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  DATABASE_URL: z.string().url(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().positive().default(100),
});

// Validate environment variables at startup
const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_URL: process.env.REDIS_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
});

// Export validated config object
export const config = {
  env: env.NODE_ENV,
  server: {
    port: env.PORT,
    frontendUrl: env.FRONTEND_URL,
  },
  auth: {
    jwtSecret: env.JWT_SECRET,
  },
  redis: {
    url: env.REDIS_URL,
  },
  database: {
    url: env.DATABASE_URL,
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
  },
} as const;

// Export type for use in other files
export type Config = typeof config;
