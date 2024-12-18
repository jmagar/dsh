import type { AgentStatus } from '@dsh/shared/types/agent.types.js';
import type { SystemMetrics } from '@dsh/shared/types/metrics.types.js';
import { useState, useEffect } from 'react';

import { fetchSystemMetrics, fetchAgentStatus } from '../api/monitoring.js';
import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

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
      logger.info('Fetching monitoring data', createLogMetadata('monitoring-hook', undefined, {
        message: 'Starting monitoring data fetch'
      }));
      setIsLoading(true);
      const [metricsData, statusData] = await Promise.all([
        fetchSystemMetrics(),
        fetchAgentStatus()
      ]);
      setMetrics(metricsData);
      setAgentStatus(statusData);
      setError(null);
      logger.info('Monitoring data fetched', createLogMetadata('monitoring-hook', undefined, {
        message: 'Successfully fetched monitoring data'
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch monitoring data');
      logger.error('Monitoring data fetch failed', createLogMetadata('monitoring-hook', error, {
        message: 'Failed to fetch monitoring data'
      }));
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    const interval = setInterval(() => void fetchData(), pollInterval);
    
    return () => {
      clearInterval(interval);
      logger.info('Monitoring cleanup', createLogMetadata('monitoring-hook', undefined, {
        message: 'Cleaning up monitoring interval'
      }));
    };
  }, [pollInterval]);

  return {
    metrics,
    agentStatus,
    error,
    isLoading,
    refetch: fetchData
  };
} 