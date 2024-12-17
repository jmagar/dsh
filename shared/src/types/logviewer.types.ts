export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  source: {
    type: string;
    name: string;
    file?: string;
    line?: number;
    function?: string;
  };
  context?: Record<string, unknown>;
  stack?: string;
  metadata?: Record<string, unknown>;
}

export interface LogFilter {
  levels?: string[];
  sources?: string[];
  search?: string;
  startTime?: string;
  endTime?: string;
  limit?: number;
  offset?: number;
  sortOrder?: 'asc' | 'desc';
  includeMetadata?: boolean;
  excludeFields?: string[];
}

export interface LogStream {
  id: string;
  name: string;
  type: 'file' | 'syslog' | 'journald' | 'docker' | 'custom';
  path?: string;
  format: LogFormat;
  parser: LogParser;
  filters?: LogFilter;
  retention?: {
    maxSize?: number;
    maxAge?: number;
    maxFiles?: number;
    compress?: boolean;
  };
}

export interface LogFormat {
  type: 'json' | 'text' | 'custom';
  pattern?: string;
  timezone?: string;
  dateFormat?: string;
  fields?: {
    timestamp?: string;
    level?: string;
    message?: string;
    source?: string;
  };
  customPatterns?: Record<string, string>;
}

export interface LogParser {
  type: 'regex' | 'grok' | 'json' | 'csv' | 'custom';
  pattern?: string;
  separator?: string;
  headers?: string[];
  timezone?: string;
  transforms?: Array<{
    field: string;
    type: 'date' | 'number' | 'boolean' | 'string';
    format?: string;
  }>;
}

export interface LogStats {
  totalEntries: number;
  levelCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  timeRange: {
    start: string;
    end: string;
  };
  errorRate: number;
  bytesProcessed: number;
}

export interface LogAlert {
  id: string;
  name: string;
  condition: {
    field: string;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'matches';
    value: unknown;
  };
  threshold?: {
    count: number;
    timeWindow: number;
  };
  actions: Array<{
    type: string;
    config: Record<string, unknown>;
  }>;
  enabled: boolean;
}

export interface LogQuery {
  filter: LogFilter;
  aggregations?: Array<{
    type: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'cardinality';
    field: string;
    name?: string;
  }>;
  groupBy?: Array<{
    field: string;
    interval?: string;
  }>;
  having?: Array<{
    field: string;
    operator: string;
    value: unknown;
  }>;
}

export interface LogQueryResult {
  entries: LogEntry[];
  total: number;
  aggregations?: Record<string, unknown>;
  stats: LogStats;
}

export interface LogExport {
  format: 'json' | 'csv' | 'text';
  filter?: LogFilter;
  fields?: string[];
  filename?: string;
  compress?: boolean;
}

export interface LogViewerState {
  activeStream?: string;
  filter: LogFilter;
  highlightedEntry?: string;
  selectedEntries: string[];
  followTail: boolean;
  refreshInterval?: number;
  displayOptions: {
    wrap: boolean;
    showTimestamp: boolean;
    showSource: boolean;
    showMetadata: boolean;
    theme: 'light' | 'dark';
    fontSize: number;
  };
} 