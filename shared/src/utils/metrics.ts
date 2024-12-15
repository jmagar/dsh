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

import { isString } from './type-guards';

// Utility functions
export const createMetricName = (name: string, prefix?: string): string =>
  prefix !== undefined && prefix !== null && prefix.length > 0 ? `${prefix}_${name}` : name;

export const sanitizeMetricValue = (value: number): number =>
  Number.isFinite(value) ? value : 0;

export const createLabels = (
  service: string,
  environment: string,
  labels: Record<string, string | number>
): MetricLabels => ({
  [LabelNames.SERVICE]: service,
  [LabelNames.ENVIRONMENT]: environment,
  component: isString(labels.component) && labels.component.length > 0 ? labels.component : '',
  instance: isString(labels.instance) && labels.instance.length > 0 ? labels.instance : '',
  version: isString(labels.version) && labels.version.length > 0 ? labels.version : '',
  method: isString(labels.method) && labels.method.length > 0 ? labels.method : '',
  path: isString(labels.path) && labels.path.length > 0 ? labels.path : '',
  status: isString(labels.status) && labels.status.length > 0 ? labels.status : '',
  operation: isString(labels.operation) && labels.operation.length > 0 ? labels.operation : '',
  table: isString(labels.table) && labels.table.length > 0 ? labels.table : '',
  error_type: isString(labels.error_type) && labels.error_type.length > 0 ? labels.error_type : '',
  command: isString(labels.command) && labels.command.length > 0 ? labels.command : '',
  key_pattern: isString(labels.key_pattern) && labels.key_pattern.length > 0 ? labels.key_pattern : '',
  feature: isString(labels.feature) && labels.feature.length > 0 ? labels.feature : '',
  user_type: isString(labels.user_type) && labels.user_type.length > 0 ? labels.user_type : ''
});
