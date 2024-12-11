export interface BaseMetadata {
  component: string;
  error?: Error;
  metrics?: Record<string, number>;
  config?: Record<string, unknown>;
  message?: string;
  target?: string;
  method?: string;
  url?: string;
  status?: string | number;
  duration?: number;
  contentLength?: number;
  ip?: string;
  userAgent?: string;
  query?: string;
  params?: unknown[];
  command?: string;
  args?: unknown[];
  times?: number;
  delay?: number;
}

export interface AgentMetadata extends BaseMetadata {
  agentId: string;
  taskId?: string;
  state?: string;
}

export interface LogMetadata extends BaseMetadata {
  socketId?: string;
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface Logger {
  error(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void;
  warn(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void;
  info(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void;
  debug(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void;
}

export function createLogMetadata(
  component: string,
  error?: Error | string,
  additionalMetadata: Partial<LogMetadata | AgentMetadata> = {}
): LogMetadata | AgentMetadata {
  const metadata = {
    component,
    ...additionalMetadata,
  };

  if (error) {
    metadata.error = typeof error === 'string' ? new Error(error) : error;
  }

  return metadata;
}
