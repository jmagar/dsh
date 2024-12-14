import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from backend/.env
const { parsed: dotenvConfig = {} } = config({
  path: resolve(__dirname, '../.env'),
});

type EnvKey =
  | 'NODE_ENV'
  | 'PORT'
  | 'FRONTEND_URL'
  | 'JWT_SECRET'
  | 'REDIS_URL'
  | 'DATABASE_URL'
  | 'RATE_LIMIT_WINDOW_MS'
  | 'RATE_LIMIT_MAX_REQUESTS';

interface EnvConfig {
  required: boolean;
  default?: string;
  validate?: (value: string) => boolean;
}

// Environment variable configuration
const envConfigs: Record<EnvKey, EnvConfig> = {
  NODE_ENV: {
    required: false,
    default: 'development',
    validate: value => ['development', 'production', 'test'].includes(value),
  },
  PORT: {
    required: false,
    default: '3000',
    validate: value => !isNaN(Number(value)),
  },
  FRONTEND_URL: {
    required: false,
    default: 'http://localhost:3001',
    validate: value => value.startsWith('http://') || value.startsWith('https://'),
  },
  JWT_SECRET: {
    required: true,
    validate: value => value.length >= 32,
  },
  REDIS_URL: {
    required: false,
    default: 'redis://localhost:6379',
    validate: value => value.startsWith('redis://'),
  },
  DATABASE_URL: {
    required: true,
    validate: value => value.includes('://'),
  },
  RATE_LIMIT_WINDOW_MS: {
    required: false,
    default: '900000',
    validate: value => !isNaN(Number(value)) && Number(value) > 0,
  },
  RATE_LIMIT_MAX_REQUESTS: {
    required: false,
    default: '100',
    validate: value => !isNaN(Number(value)) && Number(value) > 0,
  },
};

function validateAndGetEnv(key: EnvKey): string {
  // Use a switch statement for type-safe access to envConfigs
  let config: EnvConfig;
  switch (key) {
    case 'NODE_ENV':
      config = envConfigs.NODE_ENV;
      break;
    case 'PORT':
      config = envConfigs.PORT;
      break;
    case 'FRONTEND_URL':
      config = envConfigs.FRONTEND_URL;
      break;
    case 'JWT_SECRET':
      config = envConfigs.JWT_SECRET;
      break;
    case 'REDIS_URL':
      config = envConfigs.REDIS_URL;
      break;
    case 'DATABASE_URL':
      config = envConfigs.DATABASE_URL;
      break;
    case 'RATE_LIMIT_WINDOW_MS':
      config = envConfigs.RATE_LIMIT_WINDOW_MS;
      break;
    case 'RATE_LIMIT_MAX_REQUESTS':
      config = envConfigs.RATE_LIMIT_MAX_REQUESTS;
      break;
    default: {
      // This should never happen due to TypeScript's exhaustive check
      ((_k: never): never => {
        throw new Error('Unknown environment variable');
      })(key);
    }
  }

  // Use direct property access for dotenvConfig
  const envValue =
    key in dotenvConfig ? dotenvConfig[key as keyof typeof dotenvConfig] : config.default;

  if (envValue === undefined) {
    if (config.required) {
      throw new Error(`Required environment variable ${key} is not defined`);
    }
    return '';
  }

  if (config.validate && !config.validate(envValue)) {
    throw new Error(`Invalid value for environment variable ${key}`);
  }

  return envValue;
}

// Export environment variables with their types
export const env = {
  NODE_ENV: validateAndGetEnv('NODE_ENV'),
  PORT: validateAndGetEnv('PORT'),
  FRONTEND_URL: validateAndGetEnv('FRONTEND_URL'),
  JWT_SECRET: validateAndGetEnv('JWT_SECRET'),
  REDIS_URL: validateAndGetEnv('REDIS_URL'),
  DATABASE_URL: validateAndGetEnv('DATABASE_URL'),
  RATE_LIMIT_WINDOW_MS: validateAndGetEnv('RATE_LIMIT_WINDOW_MS'),
  RATE_LIMIT_MAX_REQUESTS: validateAndGetEnv('RATE_LIMIT_MAX_REQUESTS'),
} as const;
