import { z } from 'zod';

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

type Env = z.infer<typeof envSchema>;

interface Config {
  readonly env: Env['NODE_ENV'];
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;
  readonly server: {
    readonly port: number;
    readonly frontendUrl: string;
  };
  readonly jwt: {
    readonly secret: string;
  };
  readonly redis: {
    readonly url: string;
  };
  readonly database: {
    readonly url: string;
  };
  readonly rateLimit: {
    readonly windowMs: number;
    readonly max: number;
  };
}

function validateEnv(): Env {
  const env = envSchema.parse(process.env);
  return env;
}

function createConfig(env: Env): Config {
  return {
    env: env.NODE_ENV,
    isProduction: env.NODE_ENV === 'production',
    isDevelopment: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
    server: {
      port: env.PORT,
      frontendUrl: env.FRONTEND_URL,
    },
    jwt: {
      secret: env.JWT_SECRET,
    },
    redis: {
      url: env.REDIS_URL,
    },
    database: {
      url: env.DATABASE_URL,
    },
    rateLimit: {
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      max: env.RATE_LIMIT_MAX_REQUESTS,
    },
  };
}

export const config = createConfig(validateEnv());
