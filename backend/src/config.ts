/* eslint-disable no-process-env */
import 'dotenv/config';

interface EnvironmentConfig {
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  FRONTEND_URL: string;
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
}

// Utility function to safely extract environment variables
function getEnvVar(env: Record<string, string | undefined>, key: string, defaultValue?: string): string {
  const value = Object.prototype.hasOwnProperty.call(env, key) 
    ? env[key] 
    : defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

function validateEnv(env: Record<string, string | undefined> = {}): EnvironmentConfig {
  // Merge process.env with provided environment
  const mergedEnv = { ...process.env, ...env };

  // Extract environment variables with defaults
  const nodeEnv = getEnvVar(mergedEnv, 'NODE_ENV', 'development');
  const port = getEnvVar(mergedEnv, 'PORT', '3000');
  const frontendUrl = getEnvVar(mergedEnv, 'FRONTEND_URL', 'http://localhost:3001');
  const redisUrl = getEnvVar(mergedEnv, 'REDIS_URL', 'redis://localhost:6379');
  const rateWindowMs = getEnvVar(mergedEnv, 'RATE_LIMIT_WINDOW_MS', '900000');
  const rateMaxRequests = getEnvVar(mergedEnv, 'RATE_LIMIT_MAX_REQUESTS', '100');

  // Validate critical environment variables
  const databaseUrl = getEnvVar(mergedEnv, 'DATABASE_URL');
  const jwtSecret = getEnvVar(mergedEnv, 'JWT_SECRET');

  // Validate and parse numeric values
  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
    throw new Error(`Invalid PORT value: ${port}. Must be a number between 1 and 65535.`);
  }

  const parsedRateWindowMs = parseInt(rateWindowMs, 10);
  if (isNaN(parsedRateWindowMs) || parsedRateWindowMs <= 0) {
    throw new Error(`Invalid RATE_LIMIT_WINDOW_MS value: ${rateWindowMs}. Must be a positive number.`);
  }

  const parsedRateMaxRequests = parseInt(rateMaxRequests, 10);
  if (isNaN(parsedRateMaxRequests) || parsedRateMaxRequests <= 0) {
    throw new Error(`Invalid RATE_LIMIT_MAX_REQUESTS value: ${rateMaxRequests}. Must be a positive number.`);
  }

  // Validate frontend URL
  try {
    new URL(frontendUrl);
  } catch {
    throw new Error(`Invalid FRONTEND_URL: ${frontendUrl}. Must be a valid URL.`);
  }

  // Validate Redis URL
  try {
    new URL(redisUrl);
  } catch {
    throw new Error(`Invalid REDIS_URL: ${redisUrl}. Must be a valid URL.`);
  }

  return {
    DATABASE_URL: databaseUrl,
    REDIS_URL: redisUrl,
    JWT_SECRET: jwtSecret,
    FRONTEND_URL: frontendUrl,
    PORT: parsedPort,
    NODE_ENV: nodeEnv as EnvironmentConfig['NODE_ENV'],
    RATE_LIMIT_WINDOW_MS: parsedRateWindowMs,
    RATE_LIMIT_MAX_REQUESTS: parsedRateMaxRequests,
  };
}

// Export validated config object
export const config = {
  env: validateEnv().NODE_ENV,
  server: {
    port: validateEnv().PORT,
    frontendUrl: validateEnv().FRONTEND_URL,
  },
  auth: {
    jwtSecret: validateEnv().JWT_SECRET,
  },
  redis: {
    url: validateEnv().REDIS_URL,
  },
  database: {
    url: validateEnv().DATABASE_URL,
  },
  rateLimit: {
    windowMs: validateEnv().RATE_LIMIT_WINDOW_MS,
    maxRequests: validateEnv().RATE_LIMIT_MAX_REQUESTS,
  },
} as const;

// Export type for use in other files
export type Config = typeof config;
