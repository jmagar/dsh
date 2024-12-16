import { AgentStatus } from '@dsh/shared/types/agent';
import { SystemMetrics } from '@dsh/shared/types/metrics';

export interface SystemStatusData {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
  agents: AgentStatus[];
  agentMetrics: Record<string, SystemMetrics>;
}

export interface ServiceStatusCardProps {
  name: string;
  isHealthy: boolean;
  error?: string | undefined;
}

export interface AgentStatusCardProps {
  agent: AgentStatus & { 
    osInfo: { 
      platform: string; 
      os: string; 
      arch: string; 
      release?: string 
    } 
  };
  metrics?: SystemMetrics | null;
}
