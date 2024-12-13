import { LogMetadata } from '@dsh/shared/utils/logger';
import { PrismaClient, Prisma } from '@prisma/client';

import { config } from '../config';

import { logger } from './logger';

interface LogEvent {
  message: string;
  timestamp: Date;
  target?: string | null;
}

type PrismaEvents = {
  query: (event: Prisma.QueryEvent) => void;
  error: (event: LogEvent) => void;
};

export class DatabaseClient extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'> {
  private static instance: DatabaseClient | null = null;

  constructor() {
    super({
      datasources: {
        db: {
          url: config.database.url,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });

    // Type-safe event handlers
    const client = this as PrismaClient & {
      $on: <E extends keyof PrismaEvents>(event: E, listener: PrismaEvents[E]) => void;
    };

    client.$on('query', (event: Prisma.QueryEvent) => {
      const metadata: Partial<LogMetadata> = {
        component: 'database',
        metrics: {
          duration: event.duration,
          query_length: event.query.length,
        },
        message: event.query,
      };

      logger.debug('Database query', metadata);
    });

    client.$on('error', (event: LogEvent) => {
      // Explicitly handle null and undefined cases first
      if (event.target === null || event.target === undefined) {
        const metadata: Partial<LogMetadata> = {
          component: 'database',
          error: new Error(event.message),
          metrics: {
            timestamp: event.timestamp.getTime(),
          },
        };
        logger.error('Database error', metadata);
        return;
      }

      // Now we know target is a string, handle empty string case
      const trimmedTarget = event.target.trim();
      if (trimmedTarget === '') {
        const metadata: Partial<LogMetadata> = {
          component: 'database',
          error: new Error(event.message),
          metrics: {
            timestamp: event.timestamp.getTime(),
          },
        };
        logger.error('Database error', metadata);
        return;
      }

      // Now we have a non-empty string target
      const metadata: Partial<LogMetadata> = {
        component: 'database',
        error: new Error(event.message),
        metrics: {
          timestamp: event.timestamp.getTime(),
        },
        target: trimmedTarget,
      };

      logger.error('Database error', metadata);
    });
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }
}

export const db = DatabaseClient.getInstance();
