import type { Redis as RedisType, RedisOptions } from 'ioredis';
import Redis from 'ioredis';

import { config } from '../config';

import { logger } from './logger';

class RedisClient {
  private readonly redis: RedisType;

  constructor() {
    const options: RedisOptions = {
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        logger.info('Redis retry strategy', {
          component: 'redis',
          metrics: {
            retryCount: times,
            delayMs: delay,
          },
        });
        return delay;
      },
    };

    this.redis = new Redis(config.redis.url, options);

    this.redis.on('connect', () => {
      logger.info('Redis connected', {
        component: 'redis',
      });
    });

    this.redis.on('error', (error: Error) => {
      logger.error('Redis error', {
        component: 'redis',
        error,
      });
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Redis get error', {
        component: 'redis',
        error: new Error(errorMessage),
        metrics: {
          operationCount: 1,
          failureCount: 1,
        },
      });
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    try {
      if (typeof ttlSeconds === 'number') {
        await this.redis.setex(key, ttlSeconds, value);
      } else {
        await this.redis.set(key, value);
      }
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Redis set error', {
        component: 'redis',
        error: new Error(errorMessage),
        metrics: {
          operationCount: 1,
          failureCount: 1,
        },
      });
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Redis delete error', {
        component: 'redis',
        error: new Error(errorMessage),
        metrics: {
          operationCount: 1,
          failureCount: 1,
        },
      });
      return false;
    }
  }

  async disconnect(): Promise<void> {
    await this.redis.quit();
    logger.info('Redis disconnected', {
      component: 'redis',
    });
  }
}

export const redis = new RedisClient();
