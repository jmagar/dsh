import path from 'path';

import { config as dotenvConfig } from 'dotenv';

/**
 * Environment Configuration Management
 * 
 * This module provides a type-safe and secure way to manage environment variables
 * with validation, default values, and error handling.
 */

// Supported environment modes (kept for potential future use)
const _ALLOWED_ENV_MODES = ['development', 'production', 'test'] as const;
type EnvMode = typeof _ALLOWED_ENV_MODES[number];

// Environment variable configuration interface
interface EnvConfig<T> {
  readonly required: boolean;
  readonly default?: T;
  readonly validate: (value: T) => boolean;
  readonly transform: (value: string) => T;
}

// Supported environment variables
interface EnvValues {
  NODE_ENV: string;
  PORT: number;
  FRONTEND_URL: string;
  JWT_SECRET: string;
  REDIS_URL: string;
  DATABASE_URL: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
}

// Environment variable configurations
const ENV_CONFIGS: {
  [K in keyof EnvValues]: EnvConfig<EnvValues[K]>;
} = {
  NODE_ENV: {
    required: false,
    default: 'development',
    validate: (value: string) => _ALLOWED_ENV_MODES.includes(value as EnvMode),
    transform: String,
  },
  PORT: {
    required: false,
    default: 3000,
    validate: (value: number) => value > 0 && value < 65536,
    transform: (value: string) => {
      const parsed = Number(value);
      if (isNaN(parsed)) {
        throw new Error('Invalid port number');
      }
      return parsed;
    },
  },
  FRONTEND_URL: {
    required: false,
    default: 'http://localhost:3001',
    validate: (value: string) => /^https?:\/\//.test(value),
    transform: String,
  },
  JWT_SECRET: {
    required: true,
    validate: (value: string) => value.length >= 32,
    transform: String,
  },
  REDIS_URL: {
    required: false,
    default: 'redis://localhost:6379',
    validate: (value: string) => /^redis:\/\//.test(value),
    transform: String,
  },
  DATABASE_URL: {
    required: true,
    validate: (value: string) => /^[a-z]+:\/\//.test(value),
    transform: String,
  },
  RATE_LIMIT_WINDOW_MS: {
    required: false,
    default: 900000,
    validate: (value: number) => value > 0,
    transform: (value: string) => {
      const parsed = Number(value);
      if (isNaN(parsed)) {
        throw new Error('Invalid rate limit window');
      }
      return parsed;
    },
  },
  RATE_LIMIT_MAX_REQUESTS: {
    required: false,
    default: 100,
    validate: (value: number) => value > 0,
    transform: (value: string) => {
      const parsed = Number(value);
      if (isNaN(parsed)) {
        throw new Error('Invalid max requests');
      }
      return parsed;
    },
  },
};

/**
 * Environment Configuration Manager
 * Handles loading, validating, and providing access to environment variables
 */
class EnvManager {
  private static instance: EnvManager | null = null;
  private readonly envConfig: Readonly<Record<string, string | undefined>>;

  private constructor() {
    // Load environment variables from .env file
    const result = dotenvConfig({
      path: path.resolve(__dirname, '../../.env'),
    });

    // Safely combine process.env and dotenv parsed config
    this.envConfig = Object.freeze(
      Object.entries({
        ...process.env,
        ...result.parsed,
      }).reduce((acc, [key, value]) => {
        acc[key] = value ?? undefined;
        return acc;
      }, {} as Record<string, string | undefined>)
    );
  }

  /**
   * Singleton instance getter
   */
  public static getInstance(): EnvManager {
    if (this.instance === null) {
      this.instance = new EnvManager();
    }
    return this.instance;
  }

  /**
   * Get a typed and validated environment variable
   * @param key Environment variable key
   * @returns Validated environment variable value
   */
  public get<K extends keyof EnvValues>(key: K): EnvValues[K] {
    const config = ENV_CONFIGS[key];
    const rawValue = this.envConfig[key];

    // Handle required variables
    if (config.required && rawValue === undefined) {
      throw new Error(`Required environment variable ${key} is not set`);
    }

    // Use default if no value is set
    const value = rawValue ?? config.default;

    // Validate the value
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is not set and has no default`);
    }

    // Transform and validate the value
    const processedValue = config.transform(String(value));

    // Validate processed value
    if (!config.validate(processedValue)) {
      throw new Error(`Environment variable ${key} has an invalid value: ${value}`);
    }

    return processedValue;
  }
}

// Create a singleton instance and export
export const env = EnvManager.getInstance();
