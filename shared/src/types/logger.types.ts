export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface BaseMetadata {
  component: string;
  error?: Error;
  message?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export interface LogMetadata extends BaseMetadata {
  requestId?: string;
  userId?: string;
  sessionId?: string;
  traceId?: string;
  spanId?: string;
  source?: string;
  tags?: string[];
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  metadata: LogMetadata;
  timestamp: string;
}

export interface LoggerConfig {
  level: LogLevel;
  format: 'json' | 'text';
  colors: boolean;
  timestamp: boolean;
  filepath?: string;
  maxFiles?: number;
  maxSize?: string;
  compress?: boolean;
}

export interface LoggerTransport {
  type: 'console' | 'file' | 'http' | 'syslog';
  level: LogLevel;
  format?: 'json' | 'text';
  options?: Record<string, unknown>;
}

export interface LoggerOptions {
  name?: string;
  level?: LogLevel;
  transports?: LoggerTransport[];
  defaultMetadata?: Record<string, unknown>;
  exitOnError?: boolean;
} 