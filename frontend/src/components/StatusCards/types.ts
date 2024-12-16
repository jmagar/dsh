import { AgentStatus } from '@dsh/shared/types/agent';
import { SystemMetrics } from '@dsh/shared/types/metrics';

export interface ServiceStatusCardProps {
  name: string;
  isHealthy: boolean;
  error?: string | null;
}

export interface AgentStatusCardProps {
  agent: AgentStatus;
  metrics: SystemMetrics | null;
}
