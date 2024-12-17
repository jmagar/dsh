export type LogLevel = 
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal';

export type LogSource = 
  | 'application'
  | 'system'
  | 'security'
  | 'access'
  | 'audit'
  | 'docker'
  | 'kubernetes'
  | 'custom';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: LogSource;
  message: string;
  metadata?: {
    component?: string;
    requestId?: string;
    userId?: string;
    sessionId?: string;
    traceId?: string;
    [key: string]: unknown;
  };
  context?: Record<string, unknown>;
  stackTrace?: string;
  host?: string;
  tags?: string[];
}

export interface LogFilter {
  levels?: LogLevel[];
  sources?: LogSource[];
  startTime?: string;
  endTime?: string;
  search?: string;
  hosts?: string[];
  tags?: string[];
  metadata?: Record<string, unknown>;
  excludePatterns?: string[];
  includePatterns?: string[];
  limit?: number;
  offset?: number;
}

export interface LogViewerOptions {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  timestampFormat: string;
  wrapLines: boolean;
  showLineNumbers: boolean;
  showMetadata: boolean;
  expandableRows: boolean;
  highlightSearch: boolean;
  followTail: boolean;
  bufferSize: number;
  colorizeLogLevels: boolean;
  metadataPosition: 'inline' | 'expandable' | 'tooltip';
}

export interface LogViewerState {
  entries: LogEntry[];
  filter: LogFilter;
  options: LogViewerOptions;
  selectedEntry: string | null;
  expandedEntries: Set<string>;
  searchResults: LogSearchResult[];
  streaming: boolean;
  loading: boolean;
  error: string | null;
}

export interface LogSearchResult {
  entryId: string;
  matches: Array<{
    text: string;
    start: number;
    end: number;
    lineNumber: number;
  }>;
}

export interface LogStats {
  totalEntries: number;
  entriesByLevel: Record<LogLevel, number>;
  entriesBySource: Record<LogSource, number>;
  entriesPerSecond: number;
  topHosts: Array<{ host: string; count: number }>;
  topTags: Array<{ tag: string; count: number }>;
  timeRange: {
    start: string;
    end: string;
    duration: number;
  };
}

export interface LogStream {
  id: string;
  source: LogSource;
  filter?: LogFilter;
  active: boolean;
  bufferSize: number;
  reconnectAttempts: number;
  lastMessage?: string;
  connected: boolean;
}

export interface LogExportOptions {
  format: 'json' | 'csv' | 'txt';
  filter?: LogFilter;
  includeMetadata: boolean;
  includeStackTraces: boolean;
  maxSize?: number;
  compression?: boolean;
  filename?: string;
}

export interface LogHighlight {
  pattern: string | RegExp;
  color: string;
  backgroundColor?: string;
  isRegex?: boolean;
  caseSensitive?: boolean;
  wholeWord?: boolean;
  description?: string;
}

export interface LogAggregation {
  field: string;
  operation: 'count' | 'distinct' | 'sum' | 'avg' | 'min' | 'max';
  timeWindow?: {
    duration: number;
    unit: 'seconds' | 'minutes' | 'hours' | 'days';
  };
  groupBy?: string[];
}

// Type guards
export const isLogEntry = (data: unknown): data is LogEntry => {
  if (typeof data !== 'object' || data === null) return false;
  
  const entry = data as Partial<LogEntry>;
  return (
    typeof entry.id === 'string' &&
    typeof entry.timestamp === 'string' &&
    typeof entry.level === 'string' &&
    typeof entry.source === 'string' &&
    typeof entry.message === 'string' &&
    isLogLevel(entry.level) &&
    isLogSource(entry.source)
  );
};

export const isLogLevel = (value: string): value is LogLevel => {
  return ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(value);
};

export const isLogSource = (value: string): value is LogSource => {
  return [
    'application', 'system', 'security', 'access',
    'audit', 'docker', 'kubernetes', 'custom'
  ].includes(value);
}; 