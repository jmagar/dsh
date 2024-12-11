import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Note: This is the only file where we directly access process.env
// All other files should import and use this config module instead
// This ensures environment variables are properly validated and typed

// Environment variable schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  FRONTEND_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().url(),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.string().url(),

  // Security
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url(),

  // Agent
  AGENT_PORT: z.string().transform(Number).default('3002'),
  AGENT_SECRET: z.string().min(32),

  // Rate Limiting
  RATE_LIMIT_WINDOW: z.string().transform(Number).default('15'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',

  server: {
    port: env.PORT,
    frontendUrl: env.FRONTEND_URL,
  },

  database: {
    url: env.DATABASE_URL,
  },

  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    url: env.REDIS_URL,
  },

  security: {
    jwtSecret: env.JWT_SECRET,
    corsOrigin: env.CORS_ORIGIN,
  },

  agent: {
    port: env.AGENT_PORT,
    secret: env.AGENT_SECRET,
  },

  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW * 60 * 1000, // Convert minutes to ms
    max: env.RATE_LIMIT_MAX_REQUESTS,
  },
} as const;
