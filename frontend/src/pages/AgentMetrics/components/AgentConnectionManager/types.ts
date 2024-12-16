import { SystemMetrics } from '@dsh/shared/types/metrics';

export interface MetricsState {
  data: SystemMetrics | null;
  status: string;
}

export class MetricsError extends Error {
  readonly component: string;

  constructor(message: string, component = 'agent-metrics') {
    super(message);
    this.name = 'MetricsError';
    this.component = component;
    Object.setPrototypeOf(this, MetricsError.prototype);
  }
}

export interface AgentFormData {
  name: string;
  host: string;
  port: string;
  apiKey?: string;
  sshKey?: string;
}
