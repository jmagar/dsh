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

export class AgentMonitor {
  private static instance: AgentMonitor | null = null;

  private constructor(
    private readonly db: DatabaseClient,
    private readonly redis: RedisClient
  ) {}

  public static getInstance(db: DatabaseClient, redis: RedisClient): AgentMonitor {
    if (AgentMonitor.instance === null) {
      AgentMonitor.instance = new AgentMonitor(db, redis);
    }
    return AgentMonitor.instance;
  }

  async handleMetrics(hostname: string, metrics: AgentMetrics): Promise<void> {
    try {
      // Validate input
      if (!hostname) {
        throw new Error('Hostname is required');
      }

      // Convert timestamp to number if it's a string
      const timestamp = Number(metrics.timestamp);

      if (isNaN(timestamp)) {
        throw new Error('Invalid timestamp');
      }

      // Prepare metric data with safe defaults
      const metricData = {
        serverId: hostname,
        type: 'agent_metrics',
        value: metrics.cpu?.usage ?? 0,
        timestamp: new Date(timestamp),
      };

      // Store metrics in database
      await this.db.metric.create({
        data: metricData,
      });

      // Prepare cache data with normalized timestamp
      const cacheData = JSON.stringify({
        ...metrics,
        hostname,
        timestamp,
      });

      // Cache latest metrics in Redis with TTL
      const cacheKey = `metrics:${hostname}:latest`;
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

  async getLatestMetrics(hostname: string): Promise<AgentMetrics | null> {
    if (!hostname) {
      const logMetadata = createLogMetadata('agent-monitor', new Error('Empty hostname'));
      logger.warn('Attempted to get metrics with empty hostname', logMetadata);
      return null;
    }

    try {
      const cacheKey = `metrics:${hostname}:latest`;
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
      const latest = await this.db.metric.findFirst({
        where: {
          serverId: hostname,
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
        metrics: { hostname_length: hostname.length },
      });
      logger.error('Failed to get latest metrics', logMetadata);
      throw error;
    }
  }
}

// Create singleton instance
export const agentMonitor = AgentMonitor.getInstance(
  DatabaseClient.getInstance(),
  RedisClient.getInstance()
);
