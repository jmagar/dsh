import { useState, useEffect } from 'react';
import type { SystemMetrics } from '@dsh/shared/types/metrics.types.js';
import type { AgentStatus } from '@dsh/shared/types/agent.types.js';
import { fetchSystemMetrics, fetchAgentStatus } from '../api/monitoring.js';

interface UseMonitoringResult {
  metrics: SystemMetrics | null;
  agentStatus: AgentStatus | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useMonitoring(pollInterval = 5000): UseMonitoringResult {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [metricsData, statusData] = await Promise.all([
        fetchSystemMetrics(),
        fetchAgentStatus()
      ]);
      setMetrics(metricsData);
      setAgentStatus(statusData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch monitoring data'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval]);

  return {
    metrics,
    agentStatus,
    error,
    isLoading,
    refetch: fetchData
  };
} 