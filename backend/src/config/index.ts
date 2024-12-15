import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenvConfig();

// Define server configuration type
export interface ServerConfig {
  readonly port: number;
  readonly frontendUrl: string;
  readonly rateLimitWindowMs: number;
  readonly rateLimitMaxRequests: number;
}

// Define complete configuration type
export interface Config {
  readonly env: string;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;
  readonly server: ServerConfig;
  readonly database: {
    readonly url: string;
  };
  readonly redis: {
    readonly url: string;
  };
  readonly jwt: {
    readonly secret: string;
  };
}

// Define environment schema for validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().positive().default(100),
  FRONTEND_URL: z.string().url().optional()
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
  FRONTEND_URL: process.env.FRONTEND_URL
});

// Throw error if validation fails
if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${parsedEnv.error.message}`);
}

// Create the validated configuration object
const validatedConfig: Config = {
  env: parsedEnv.data.NODE_ENV,
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isTest: parsedEnv.data.NODE_ENV === 'test',

  server: {
    port: parsedEnv.data.PORT,
    frontendUrl: parsedEnv.data.FRONTEND_URL ?? 'http://localhost:3000',
    rateLimitWindowMs: parsedEnv.data.RATE_LIMIT_WINDOW_MS,
    rateLimitMaxRequests: parsedEnv.data.RATE_LIMIT_MAX_REQUESTS,
  },

  database: {
    url: parsedEnv.data.DATABASE_URL,
  },

  redis: {
    url: parsedEnv.data.REDIS_URL,
  },

  jwt: {
    secret: parsedEnv.data.JWT_SECRET,
  }
};

// Export the validated configuration and its type
export const config: Config = validatedConfig;
