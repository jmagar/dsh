import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

import { logger } from './logger';
import { metrics } from './metrics';

interface PrismaEvent {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
}

class DatabaseClient {
  private readonly prisma: PrismaClient;
  private isConnected = false;

  constructor() {
    this.prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    this.setupLogging();
  }

  private setupLogging(): void {
    // Log queries
    (this.prisma.$on as any)('query', (e: PrismaEvent) => {
      const duration = e.duration / 1000; // Convert to seconds
      logger.debug('Database query executed', {
        component: 'database',
        query: e.query,
        metrics: {
          duration,
          params: e.params ? e.params.length : 0,
        },
      });
      metrics.recordDbQuery('query', this.extractTableName(e.query), duration);
    });

    // Log info events
    (this.prisma.$on as any)('info', (e: Prisma.LogEvent) => {
      logger.info('Database info', {
        component: 'database',
        message: e.message,
        target: e.target,
      });
    });

    // Log warnings
    (this.prisma.$on as any)('warn', (e: Prisma.LogEvent) => {
      logger.warn('Database warning', {
        component: 'database',
        message: e.message,
        target: e.target,
      });
    });

    // Update connection metrics periodically
    setInterval(async () => {
      try {
        await this.prisma.$queryRaw`SELECT 1`;
        this.isConnected = true;
        metrics.setDbConnections(1);
      } catch (error) {
        this.isConnected = false;
        metrics.setDbConnections(0);
        logger.error('Database connection error', {
          component: 'database',
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }, 30000);
  }

  private extractTableName(query: string): string {
    const match = query.match(/FROM\s+"?(\w+)"?/i);
    return match ? match[1].toLowerCase() : 'unknown';
  }

  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      this.isConnected = true;
      metrics.setDbConnections(1);
      logger.info('Database connected', {
        component: 'database',
      });
    } catch (error) {
      this.isConnected = false;
      metrics.setDbConnections(0);
      logger.error('Database connection error', {
        component: 'database',
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      this.isConnected = false;
      metrics.setDbConnections(0);
      logger.info('Database disconnected', {
        component: 'database',
      });
    } catch (error) {
      logger.error('Database disconnection error', {
        component: 'database',
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
      throw error;
    }
  }

  get client(): PrismaClient {
    if (!this.isConnected) {
      throw new Error('Database is not connected');
    }
    return this.prisma;
  }
}

export const db = new DatabaseClient();
