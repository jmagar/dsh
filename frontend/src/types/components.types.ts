import type { AgentStatus } from '@dsh/shared/types/agent.types.js';
import type { SystemMetrics } from '@dsh/shared/types/metrics.types.js';

export interface SystemStatusData {
  agents: AgentStatus[];
  metrics: SystemMetrics[];
  timestamp: string;
  errors?: string[];
}

export interface ServiceStatusCardProps {
  title: string;
  value: string | number;
  status: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}

// Common props interface used across all agent status card components
export interface AgentStatusCardProps {
  agentStatus: AgentStatus;
  metrics: SystemMetrics;
  onRefresh?: () => void;
  className?: string;
}
