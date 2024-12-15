import { createLogMetadata } from '@dsh/shared';

import { DatabaseClient } from './db';
import { logger } from './logger';
import { RedisClient } from './redis';

interface AgentMetrics {
  cpu?: {
    usage: number;
  };
  memory?: {
    used: number;
    total: number;
  };
  os?: {
    platform: string;
    release: string;
  };
  timestamp: number;
}

// Define a type for the database Metric model to avoid any
interface MetricModel {
  create: (data: {
    data: {
      serverId: string;
      type: string;
      value: number;
      timestamp: Date;
    };
  }) => Promise<void>;
  findFirst: (options: {
    where: {
      serverId: string;
      type: string;
    };
    orderBy: {
      timestamp: 'desc';
    };
  }) => Promise<{
    timestamp: Date;
    value: number;
  } | null>;
}

// Extend DatabaseClient to include Metric model
interface ExtendedDatabaseClient extends DatabaseClient {
  Metric: MetricModel;
}

export class AgentMonitor {
  private static instance: AgentMonitor | null = null;

  private constructor(
    private readonly db: ExtendedDatabaseClient,
    private readonly redis: RedisClient
  ) {}

  public static getInstance(
    db: ExtendedDatabaseClient, 
    redis: RedisClient
  ): AgentMonitor {
    if (AgentMonitor.instance === null) {
      AgentMonitor.instance = new AgentMonitor(db, redis);
    }
    return AgentMonitor.instance;
  }

  async handleMetrics(serverId: string, metrics: AgentMetrics): Promise<void> {
    try {
      // Validate input
      if (!serverId) {
        throw new Error('Server ID is required');
      }

      // Convert timestamp to number if it's a string
      const timestamp = Number(metrics.timestamp);

      if (isNaN(timestamp)) {
        throw new Error('Invalid timestamp');
      }

      // Prepare metric data with safe defaults
      const metricData = {
        serverId,
        type: 'agent_metrics',
        value: metrics.cpu?.usage ?? 0,
        timestamp: new Date(timestamp),
      };

      // Store metrics in database
      await this.db.Metric.create({
        data: metricData,
      });

      // Prepare cache data with normalized timestamp
      const cacheData = JSON.stringify({
        ...metrics,
        serverId,
        timestamp,
      });

      // Cache latest metrics in Redis with TTL
      const cacheKey = `metrics:${serverId}:latest`;
      await this.redis.set(
        cacheKey,
        cacheData,
        'EX',
        300 // 5 minutes TTL
      );

      const logMetadata = createLogMetadata('agent-monitor', undefined, {
        metrics: {
          timestamp,
          cpu_usage: metrics.cpu?.usage ?? 0,
          memory_used: metrics.memory?.used ?? 0,
          memory_total: metrics.memory?.total ?? 0,
        },
      });

      logger.info('Processed agent metrics', logMetadata);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      const logMetadata = createLogMetadata('agent-monitor', error, {
        metrics: {
          timestamp: Number(metrics.timestamp),
        },
      });

      logger.error('Failed to process agent metrics', logMetadata);
      throw error;
    }
  }

  async getLatestMetrics(serverId: string): Promise<AgentMetrics | null> {
    if (!serverId) {
      const logMetadata = createLogMetadata('agent-monitor', new Error('Empty server ID'));
      logger.warn('Attempted to get metrics with empty server ID', logMetadata);
      return null;
    }

    try {
      const cacheKey = `metrics:${serverId}:latest`;
      const cached = await this.redis.get(cacheKey);

      if (typeof cached === 'string' && cached.trim() !== '') {
        try {
          const parsedMetrics = JSON.parse(cached) as AgentMetrics;

          // Validate parsed metrics
          const isValidMetrics =
            parsedMetrics !== null &&
            parsedMetrics !== undefined &&
            typeof parsedMetrics.timestamp === 'number' &&
            parsedMetrics.timestamp > 0;

          if (isValidMetrics) {
            return parsedMetrics;
          }
        } catch (parseErr) {
          const error = parseErr instanceof Error ? parseErr : new Error(String(parseErr));
          const logMetadata = createLogMetadata('agent-monitor', error);
          logger.warn('Failed to parse cached metrics', logMetadata);
        }
      }

      // Fetch from database if no valid cache
      const latest = await this.db.Metric.findFirst({
        where: {
          serverId,
          type: 'agent_metrics',
        },
        orderBy: {
          timestamp: 'desc',
        },
      });

      if (!latest) {
        return null;
      }

      const metrics: AgentMetrics = {
        timestamp: latest.timestamp.getTime(),
        cpu: {
          usage: Number.isFinite(Number(latest.value)) ? Number(latest.value) : 0,
        },
      };

      // Attempt to cache retrieved metrics
      try {
        await this.redis.set(
          cacheKey,
          JSON.stringify(metrics),
          'EX',
          300 // 5 minutes TTL
        );
      } catch (cacheErr) {
        const error = cacheErr instanceof Error ? cacheErr : new Error(String(cacheErr));
        const logMetadata = createLogMetadata('agent-monitor', error);
        logger.warn('Failed to cache retrieved metrics', logMetadata);
      }

      return metrics;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      const logMetadata = createLogMetadata('agent-monitor', error, {
        metrics: { serverId_length: serverId.length },
      });
      logger.error('Failed to get latest metrics', logMetadata);
      throw error;
    }
  }
}

// Create singleton instance
async function initializeAgentMonitor(): Promise<AgentMonitor> {
  const db = await DatabaseClient.getInstance() as ExtendedDatabaseClient;
  const redis = RedisClient.getInstance();
  
  return AgentMonitor.getInstance(db, redis);
}

export const agentMonitorPromise = initializeAgentMonitor();
