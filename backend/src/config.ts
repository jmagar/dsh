import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

import { env } from './config/env';

// Load environment variables
dotenvConfig();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  FRONTEND_URL: z.string().default('http://localhost:3001'),
  JWT_SECRET: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  DATABASE_URL: z.string(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
});

const validatedEnv = envSchema.parse(env);

export const config = {
  env: validatedEnv.NODE_ENV,
  isProduction: validatedEnv.NODE_ENV === 'production',
  isDevelopment: validatedEnv.NODE_ENV === 'development',
  isTest: validatedEnv.NODE_ENV === 'test',
  server: {
    port: validatedEnv.PORT,
    frontendUrl: validatedEnv.FRONTEND_URL,
  },
  jwt: {
    secret: validatedEnv.JWT_SECRET,
  },
  redis: {
    url: validatedEnv.REDIS_URL,
  },
  database: {
    url: validatedEnv.DATABASE_URL,
  },
  rateLimit: {
    windowMs: validatedEnv.RATE_LIMIT_WINDOW_MS,
    max: validatedEnv.RATE_LIMIT_MAX_REQUESTS,
  },
} as const;
