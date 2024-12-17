export interface Queue<T = unknown> {
  name: string;
  type: QueueType;
  options: QueueOptions;
  processor?: QueueProcessor<T>;
  status: QueueStatus;
  metrics?: QueueMetrics;
}

export type QueueType = 'fifo' | 'priority' | 'delay' | 'dead-letter' | 'pub-sub';

export interface QueueOptions {
  maxSize?: number;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  priority?: number;
  deadLetterQueue?: string;
  persistence?: boolean;
  durability?: boolean;
}

export interface QueueProcessor<T = unknown> {
  process: (job: QueueJob<T>) => Promise<void>;
  concurrency?: number;
  middleware?: QueueMiddleware[];
}

export interface QueueJob<T = unknown> {
  id: string;
  data: T;
  type: string;
  priority?: number;
  delay?: number;
  attempts: number;
  maxRetries?: number;
  status: JobStatus;
  progress?: number;
  result?: unknown;
  error?: QueueError;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
}

export type JobStatus = 'pending' | 'active' | 'completed' | 'failed' | 'delayed' | 'retrying';

export interface QueueError {
  message: string;
  code?: string;
  stack?: string;
  cause?: unknown;
  retryable?: boolean;
}

export interface QueueMiddleware {
  name: string;
  before?: (job: QueueJob) => Promise<void>;
  after?: (job: QueueJob, result: unknown) => Promise<void>;
  error?: (job: QueueJob, error: Error) => Promise<void>;
}

export interface QueueMetrics {
  size: number;
  processed: number;
  failed: number;
  retries: number;
  delayed: number;
  averageProcessingTime: number;
  throughput: number;
}

export type QueueStatus = 'active' | 'paused' | 'drained' | 'closed' | 'error';

export interface QueueManager {
  createQueue: <T>(name: string, options?: QueueOptions) => Queue<T>;
  getQueue: <T>(name: string) => Queue<T> | undefined;
  removeQueue: (name: string) => Promise<void>;
  listQueues: () => Queue[];
  pauseQueue: (name: string) => Promise<void>;
  resumeQueue: (name: string) => Promise<void>;
  clearQueue: (name: string) => Promise<void>;
}

export interface QueueEvents {
  onJobAdded: (handler: (job: QueueJob) => void) => void;
  onJobCompleted: (handler: (job: QueueJob, result: unknown) => void) => void;
  onJobFailed: (handler: (job: QueueJob, error: Error) => void) => void;
  onJobProgress: (handler: (job: QueueJob, progress: number) => void) => void;
  onQueueDrained: (handler: () => void) => void;
  onQueueError: (handler: (error: Error) => void) => void;
}

export interface QueueWorker {
  id: string;
  queue: string;
  status: WorkerStatus;
  job?: QueueJob;
  metrics?: WorkerMetrics;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
}

export type WorkerStatus = 'idle' | 'busy' | 'paused' | 'error' | 'shutdown';

export interface WorkerMetrics {
  processedJobs: number;
  failedJobs: number;
  averageProcessingTime: number;
  uptime: number;
  lastActive?: string;
}

export interface QueueMonitor {
  getMetrics: (queueName: string) => QueueMetrics;
  getWorkers: (queueName: string) => QueueWorker[];
  getJobs: (queueName: string, status?: JobStatus) => QueueJob[];
  clearJobs: (queueName: string, status?: JobStatus) => Promise<void>;
  retryJobs: (queueName: string, jobIds: string[]) => Promise<void>;
}

export interface QueueStorage {
  saveJob: (job: QueueJob) => Promise<void>;
  getJob: (jobId: string) => Promise<QueueJob | undefined>;
  updateJob: (jobId: string, updates: Partial<QueueJob>) => Promise<void>;
  removeJob: (jobId: string) => Promise<void>;
  listJobs: (filter?: JobFilter) => Promise<QueueJob[]>;
}

export interface JobFilter {
  status?: JobStatus[];
  type?: string[];
  startDate?: string;
  endDate?: string;
  priority?: number;
} 