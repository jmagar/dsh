import { Counter, Gauge, Registry } from 'prom-client';

export class BackendMetrics {
  private registry: Registry;
  public readonly contentType: string;

  private httpRequestDuration: Gauge<string>;
  private httpRequestTotal: Counter<string>;
  private httpErrorTotal: Counter<string>;
  private dbQueryDuration: Gauge<string>;
  private dbErrorTotal: Counter<string>;
  private dbConnectionsGauge: Gauge<string>;
  private redisOperationDuration: Gauge<string>;
  private redisErrorTotal: Counter<string>;
  private agentTaskTotal: Counter<string>;
  private agentErrorTotal: Counter<string>;

  constructor() {
    this.registry = new Registry();
    this.contentType = this.registry.contentType;

    // HTTP metrics
    this.httpRequestDuration = new Gauge({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.httpErrorTotal = new Counter({
      name: 'http_errors_total',
      help: 'Total number of HTTP errors',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    // Database metrics
    this.dbQueryDuration = new Gauge({
      name: 'db_query_duration_seconds',
      help: 'Duration of database queries in seconds',
      labelNames: ['operation', 'table'],
      registers: [this.registry],
    });

    this.dbErrorTotal = new Counter({
      name: 'db_errors_total',
      help: 'Total number of database errors',
      labelNames: ['operation', 'table'],
      registers: [this.registry],
    });

    this.dbConnectionsGauge = new Gauge({
      name: 'db_connections_total',
      help: 'Current number of database connections',
      registers: [this.registry],
    });

    // Redis metrics
    this.redisOperationDuration = new Gauge({
      name: 'redis_operation_duration_seconds',
      help: 'Duration of Redis operations in seconds',
      labelNames: ['operation'],
      registers: [this.registry],
    });

    this.redisErrorTotal = new Counter({
      name: 'redis_errors_total',
      help: 'Total number of Redis errors',
      labelNames: ['operation'],
      registers: [this.registry],
    });

    // Agent metrics
    this.agentTaskTotal = new Counter({
      name: 'agent_tasks_total',
      help: 'Total number of agent tasks',
      labelNames: ['status'],
      registers: [this.registry],
    });

    this.agentErrorTotal = new Counter({
      name: 'agent_errors_total',
      help: 'Total number of agent errors',
      labelNames: ['type'],
      registers: [this.registry],
    });
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  recordHttpRequest(method: string, route: string, statusCode: number, duration: number): void {
    const labels = { method, route, status_code: statusCode.toString() };
    this.httpRequestDuration.set(labels, duration);
    this.httpRequestTotal.inc(labels);

    if (statusCode >= 400) {
      this.httpErrorTotal.inc(labels);
    }
  }

  recordDbQuery(operation: string, table: string, duration: number): void {
    const labels = { operation, table };
    this.dbQueryDuration.set(labels, duration);
  }

  recordDbError(operation: string, table: string): void {
    const labels = { operation, table };
    this.dbErrorTotal.inc(labels);
  }

  setDbConnections(count: number): void {
    this.dbConnectionsGauge.set(count);
  }

  recordRedisOperation(operation: string, duration: number): void {
    const labels = { operation };
    this.redisOperationDuration.set(labels, duration);
  }

  recordRedisError(operation: string): void {
    const labels = { operation };
    this.redisErrorTotal.inc(labels);
  }

  recordAgentTask(status: string): void {
    const labels = { status };
    this.agentTaskTotal.inc(labels);
  }

  recordAgentError(type: string): void {
    const labels = { type };
    this.agentErrorTotal.inc(labels);
  }
}

export const metrics = new BackendMetrics();
