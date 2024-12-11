export enum MetricType {
  COUNTER = 'counter',
  GAUGE = 'gauge',
  HISTOGRAM = 'histogram'
}

export interface MetricLabels {
  [key: string]: string | number;
}

export interface MetricValue {
  value: number;
  timestamp?: number;
  labels?: MetricLabels;
}

export interface MetricDefinition {
  name: string;
  help: string;
  type: MetricType;
  labelNames?: string[];
}

export interface Metric extends MetricDefinition {
  inc(labels?: MetricLabels): void;
  dec(labels?: MetricLabels): void;
  set(value: number, labels?: MetricLabels): void;
  observe(value: number, labels?: MetricLabels): void;
}

// Common metric names
export const MetricNames = {
  // HTTP metrics
  HTTP_REQUEST_DURATION: 'http_request_duration_seconds',
  HTTP_REQUESTS_TOTAL: 'http_requests_total',
  HTTP_REQUEST_SIZE: 'http_request_size_bytes',
  HTTP_RESPONSE_SIZE: 'http_response_size_bytes',

  // System metrics
  CPU_USAGE: 'cpu_usage_percent',
  MEMORY_USAGE: 'memory_usage_bytes',
  DISK_USAGE: 'disk_usage_bytes',
  NETWORK_IO: 'network_io_bytes',

  // Database metrics
  DB_CONNECTIONS: 'db_connections_total',
  DB_QUERY_DURATION: 'db_query_duration_seconds',
  DB_ERRORS: 'db_errors_total',
  DB_POOL_SIZE: 'db_pool_size',

  // Redis metrics
  REDIS_CONNECTIONS: 'redis_connections_total',
  REDIS_OPERATIONS: 'redis_operations_total',
  REDIS_ERROR_RATE: 'redis_error_rate',
  REDIS_MEMORY_USAGE: 'redis_memory_usage_bytes',

  // Application metrics
  APP_VERSION: 'app_version_info',
  APP_UPTIME: 'app_uptime_seconds',
  APP_ERRORS: 'app_errors_total',
  APP_WARNINGS: 'app_warnings_total'
} as const;

// Label names
export const LabelNames = {
  // Common labels
  SERVICE: 'service',
  ENVIRONMENT: 'environment',
  VERSION: 'version',
  INSTANCE: 'instance',

  // HTTP labels
  METHOD: 'method',
  PATH: 'path',
  STATUS: 'status',

  // Database labels
  OPERATION: 'operation',
  TABLE: 'table',
  ERROR_TYPE: 'error_type',

  // Redis labels
  COMMAND: 'command',
  KEY_PATTERN: 'key_pattern',

  // Custom labels
  COMPONENT: 'component',
  FEATURE: 'feature',
  USER_TYPE: 'user_type'
} as const;

// Utility functions
export const createMetricName = (name: string, prefix?: string): string =>
  prefix ? `${prefix}_${name}` : name;

export const sanitizeMetricValue = (value: number): number =>
  Number.isFinite(value) ? value : 0;

export const createLabels = (
  service: string,
  environment: string,
  labels: Record<string, string | number>
): MetricLabels => ({
  [LabelNames.SERVICE]: service,
  [LabelNames.ENVIRONMENT]: environment,
  component: labels.component || '',
  instance: labels.instance || '',
  version: labels.version || '',
  method: labels.method || '',
  path: labels.path || '',
  status: labels.status || '',
  operation: labels.operation || '',
  table: labels.table || '',
  error_type: labels.error_type || '',
  command: labels.command || '',
  key_pattern: labels.key_pattern || '',
  feature: labels.feature || '',
  user_type: labels.user_type || ''
});
