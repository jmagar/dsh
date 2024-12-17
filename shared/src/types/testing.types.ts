export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: 'unit' | 'integration' | 'e2e';
  priority: 'low' | 'medium' | 'high';
  automated: boolean;
  steps: Array<{
    description: string;
    expected: string;
    actual?: string;
    status?: 'passed' | 'failed' | 'skipped';
  }>;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  cases: TestCase[];
  setup?: string[];
  teardown?: string[];
  dependencies?: string[];
}

export interface TestResult {
  suiteId: string;
  caseId: string;
  status: 'passed' | 'failed' | 'skipped' | 'error';
  duration: number;
  timestamp: string;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
  coverage?: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
}

export interface Transaction {
  id: string;
  type: 'database' | 'message' | 'http';
  status: 'pending' | 'committed' | 'rolled-back';
  startTime: string;
  endTime?: string;
  operations: Array<{
    type: string;
    target: string;
    params?: unknown;
    result?: unknown;
    error?: string;
  }>;
  isolation: 'read-committed' | 'repeatable-read' | 'serializable';
  savepoints: Array<{
    name: string;
    timestamp: string;
  }>;
}

export interface TransactionManager {
  maxRetries: number;
  timeout: number;
  deadlockDetection: boolean;
  logging: boolean;
  hooks: {
    beforeCommit?: () => Promise<void>;
    afterCommit?: () => Promise<void>;
    onRollback?: (error: Error) => Promise<void>;
  };
}

export interface ValidationSchema {
  id: string;
  name: string;
  version: string;
  fields: Array<{
    name: string;
    type: string;
    required: boolean;
    rules: ValidationRule[];
  }>;
}

export interface ValidationRule {
  type: 'regex' | 'range' | 'length' | 'enum' | 'custom';
  params: Record<string, unknown>;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    field: string;
    rule: string;
    message: string;
    severity: 'error' | 'warning';
  }>;
  warnings: Array<{
    field: string;
    rule: string;
    message: string;
  }>;
}

export interface ScheduledTask {
  id: string;
  name: string;
  cron: string;
  timezone?: string;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  timeout?: number;
  retry: {
    attempts: number;
    backoff: number;
  };
  metadata?: Record<string, unknown>;
}

export interface TaskResult {
  taskId: string;
  startTime: string;
  endTime: string;
  success: boolean;
  error?: string;
  data?: unknown;
  metrics?: {
    duration: number;
    memory: number;
    cpu: number;
  };
}

export interface SchedulerStats {
  tasks: {
    total: number;
    enabled: number;
    running: number;
    failed: number;
  };
  lastError?: {
    taskId: string;
    error: string;
    timestamp: string;
  };
  performance: {
    averageDuration: number;
    maxDuration: number;
    successRate: number;
  };
} 