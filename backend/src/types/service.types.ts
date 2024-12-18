import type { AuthConfig } from './auth.types.js';
import type { User } from './core.types.js';
import type { DatabaseConfig } from './database.types.js';

export interface ServiceConfig {
  name: string;
  version: string;
  port: number;
  environment: ServiceEnvironment;
  logLevel: LogLevel;
  host?: string;
  basePath?: string;
  cors?: CORSConfig;
  rateLimit?: RateLimitConfig;
  metrics?: MetricsConfig;
  auth?: AuthConfig;
  database?: DatabaseConfig;
  cache?: CacheConfig;
  queue?: QueueConfig;
  scheduler?: SchedulerConfig;
}

export type ServiceEnvironment = 'development' | 'production' | 'test' | 'staging';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export interface ServiceHealth {
  status: HealthStatus;
  timestamp: string;
  version: string;
  uptime: number;
  environment: ServiceEnvironment;
  details: {
    memory: MemoryUsage;
    cpu: CPUUsage;
    connections: ConnectionStats;
    dependencies: DependencyHealth[];
  };
}

export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface MemoryUsage {
  heapTotal: number;
  heapUsed: number;
  rss: number;
  external: number;
  arrayBuffers: number;
}

export interface CPUUsage {
  user: number;
  system: number;
  percentage: number;
  loadAverage: number[];
}

export interface ConnectionStats {
  active: number;
  idle: number;
  total: number;
}

export interface DependencyHealth {
  name: string;
  type: 'database' | 'cache' | 'queue' | 'external';
  status: HealthStatus;
  responseTime: number;
  error?: string;
}

export interface CORSConfig {
  origin: string | string[] | boolean;
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
  statusCode?: number;
  headers?: boolean;
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
}

export interface MetricsConfig {
  enabled: boolean;
  path?: string;
  defaultLabels?: Record<string, string>;
  collectDefaultMetrics?: boolean;
  prefix?: string;
}

export interface CacheConfig {
  type: 'memory' | 'redis';
  ttl: number;
  maxItems?: number;
  checkPeriod?: number;
  redis?: {
    host: string;
    port: number;
    password?: string;
    db?: number;
  };
}

export interface QueueConfig {
  type: 'memory' | 'redis';
  prefix?: string;
  defaultJobOptions?: {
    attempts?: number;
    backoff?: number | { type: string; delay: number };
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
  };
  redis?: {
    host: string;
    port: number;
    password?: string;
    db?: number;
  };
}

export interface SchedulerConfig {
  enabled: boolean;
  timezone?: string;
  maxConcurrency?: number;
  defaultLockDuration?: number;
}

export interface ServiceEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: Date;
  data: T;
  userId?: string;
  correlationId?: string;
  metadata?: Record<string, unknown>;
}

export interface ServiceError extends Error {
  code: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  stack?: string;
  cause?: Error;
}

export interface ServiceMetrics {
  requestCount: number;
  requestDuration: number;
  errorCount: number;
  activeConnections: number;
  memoryUsage: MemoryUsage;
  cpuUsage: CPUUsage;
  customMetrics?: Record<string, number>;
}

export interface ServiceWorker {
  id: string;
  type: string;
  status: WorkerStatus;
  startTime: Date;
  pid: number;
  memory: MemoryUsage;
  cpu: CPUUsage;
  error?: string;
}

export type WorkerStatus = 
  | 'starting'
  | 'running'
  | 'stopping'
  | 'stopped'
  | 'crashed';

export interface ServicePlugin {
  name: string;
  version: string;
  enabled: boolean;
  config?: Record<string, unknown>;
  hooks?: Record<string, (...args: unknown[]) => Promise<unknown>>;
}

export interface ServiceMiddleware {
  name: string;
  enabled: boolean;
  priority: number;
  path?: string | RegExp;
  methods?: string[];
  handler: MiddlewareHandler;
}

export type MiddlewareHandler = (
  req: unknown,
  res: unknown,
  next: (error?: Error) => void
) => Promise<void> | void; 