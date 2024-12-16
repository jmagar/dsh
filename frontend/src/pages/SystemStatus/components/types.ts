import { AgentStatus } from '@dsh/shared/types/agent';
import { SystemMetrics } from '@dsh/shared/types/metrics';

export interface SystemStatusData {
  details: {
    database: boolean;
    redis: boolean;
    error?: string;
  };
  agents: AgentStatus[];
  agentMetrics: Record<string, SystemMetrics>;
}

export interface ServiceStatusCardProps {
  name: string;
  isHealthy: boolean;
  error?: string | null;
}

export interface AgentStatusCardProps {
  agent: AgentStatus;
  metrics: SystemMetrics | null;
}

export interface SystemStatusState {
  data: SystemStatusData | null;
  error: string | null;
}
