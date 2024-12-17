export interface ScheduledJob {
  id: string;
  name: string;
  description?: string;
  schedule: string; // cron expression
  type: JobType;
  enabled: boolean;
  task: JobTask;
  options?: JobOptions;
  metadata?: Record<string, unknown>;
  lastRun?: JobExecution;
  nextRun?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobType = 'cron' | 'interval' | 'once' | 'custom';

export interface JobTask {
  type: TaskType;
  handler: string;
  params?: Record<string, unknown>;
  timeout?: number;
  retries?: number;
}

export type TaskType = 'function' | 'command' | 'http' | 'script' | 'plugin';

export interface JobOptions {
  timezone?: string;
  startDate?: string;
  endDate?: string;
  maxRuns?: number;
  concurrent?: boolean;
  priority?: number;
  backoff?: BackoffStrategy;
  dependencies?: string[];
}

export interface BackoffStrategy {
  type: 'fixed' | 'exponential' | 'custom';
  delay: number;
  maxDelay?: number;
  maxAttempts?: number;
}

export interface JobExecution {
  id: string;
  jobId: string;
  status: ExecutionStatus;
  startTime: string;
  endTime?: string;
  duration?: number;
  result?: unknown;
  error?: ExecutionError;
  attempt: number;
  metadata?: Record<string, unknown>;
}

export type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'skipped';

export interface ExecutionError {
  message: string;
  code?: string;
  stack?: string;
  details?: Record<string, unknown>;
}

export interface Scheduler {
  schedule: (job: ScheduledJob) => Promise<void>;
  unschedule: (jobId: string) => Promise<void>;
  pause: (jobId: string) => Promise<void>;
  resume: (jobId: string) => Promise<void>;
  runNow: (jobId: string) => Promise<void>;
  getJob: (jobId: string) => Promise<ScheduledJob | undefined>;
  listJobs: () => Promise<ScheduledJob[]>;
}

export interface SchedulerConfig {
  maxConcurrent?: number;
  defaultTimeout?: number;
  defaultRetries?: number;
  timezone?: string;
  storage?: StorageConfig;
  logging?: LoggingConfig;
}

export interface StorageConfig {
  type: 'memory' | 'database' | 'redis';
  options?: Record<string, unknown>;
}

export interface LoggingConfig {
  level: string;
  file?: string;
  maxSize?: number;
  maxFiles?: number;
}

export interface JobFilter {
  type?: JobType[];
  status?: ExecutionStatus[];
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface JobStats {
  total: number;
  enabled: number;
  disabled: number;
  running: number;
  failed: number;
  completed: number;
  averageDuration?: number;
  successRate?: number;
}

export interface JobDependency {
  jobId: string;
  type: 'success' | 'completion' | 'custom';
  condition?: (execution: JobExecution) => boolean;
}

export interface JobNotification {
  type: 'email' | 'webhook' | 'slack';
  target: string;
  events: ('success' | 'failure' | 'start' | 'end')[];
  template?: string;
}

export interface JobLock {
  id: string;
  jobId: string;
  acquiredAt: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
} 