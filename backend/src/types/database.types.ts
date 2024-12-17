export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
  poolSize?: number;
  connectionTimeout?: number;
  idleTimeout?: number;
  maxRetries?: number;
  retryInterval?: number;
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
  fields?: FieldInfo[];
  command?: string;
  duration?: number;
}

export interface FieldInfo {
  name: string;
  tableID: number;
  columnID: number;
  dataTypeID: number;
  dataType: string;
  format: string;
  modifier: number;
  size: number;
}

export interface DatabaseTransaction {
  id: string;
  name?: string;
  startTime: Date;
  endTime?: Date;
  status: TransactionStatus;
  queries: QueryInfo[];
}

export type TransactionStatus = 
  | 'ACTIVE'
  | 'COMMITTED'
  | 'ROLLED_BACK'
  | 'ERROR';

export interface QueryInfo {
  sql: string;
  params?: unknown[];
  startTime: Date;
  endTime?: Date;
  duration?: number;
  error?: Error;
}

export interface DatabaseStats {
  connectionCount: number;
  activeQueries: number;
  idleConnections: number;
  waitingCount: number;
  transactionCount: number;
  uptime: number;
}

export interface DatabaseError extends Error {
  code: string;
  detail?: string;
  table?: string;
  constraint?: string;
  dataType?: string;
  schema?: string;
}

export interface MigrationConfig {
  directory: string;
  tableName: string;
  schemaName?: string;
  lockTimeout?: number;
  migrationTimeout?: number;
}

export interface Migration {
  id: number;
  name: string;
  timestamp: Date;
  batch: number;
  status: MigrationStatus;
  duration?: number;
  error?: string;
}

export type MigrationStatus = 
  | 'PENDING'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'
  | 'ROLLED_BACK';

export interface DatabaseBackup {
  id: string;
  timestamp: Date;
  size: number;
  compressed: boolean;
  location: string;
  status: BackupStatus;
  duration?: number;
  error?: string;
}

export type BackupStatus = 
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'FAILED'
  | 'RESTORING'
  | 'RESTORED';

export interface ConnectionPoolConfig {
  min: number;
  max: number;
  acquireTimeout?: number;
  createTimeout?: number;
  destroyTimeout?: number;
  idleTimeout?: number;
  reapInterval?: number;
  createRetryInterval?: number;
}

export interface QueryOptions {
  timeout?: number;
  maxRows?: number;
  fetchSize?: number;
  useWritePool?: boolean;
  skipCache?: boolean;
  transaction?: DatabaseTransaction;
}

export interface DatabaseHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  connections: {
    total: number;
    active: number;
    idle: number;
    waiting: number;
  };
  replication?: {
    role: 'primary' | 'replica';
    lag?: number;
    syncState?: string;
  };
} 