import Redis from 'ioredis';

import { config } from '../config';

import { logger } from './logger';

export class RedisClient extends Redis {
  private static instance: RedisClient | null = null;

  constructor() {
    super(config.redis.url);

    this.on('connect', () => {
      logger.info('Redis connected', {
        component: 'redis',
      });
    });

    this.on('error', (error: Error) => {
      const errorObj = error instanceof Error ? error : new Error('Unknown Redis error');

      logger.error('Redis error occurred', {
        component: 'redis',
        error: errorObj,
      });
    });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}

export const redis = RedisClient.getInstance();
