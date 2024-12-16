import { useEffect, useState } from 'react';

import { AgentMetrics } from '../components/AgentManager/types';
import { createLogMetadata, logger } from '../utils/logger';

interface UseMetricsResult {
  status: 'idle' | 'loading' | 'error' | 'success';
  data: AgentMetrics | null;
  error?: string;
}

export function useMetrics(agentId: string | null): UseMetricsResult {
  const [state, setState] = useState<UseMetricsResult>({
    status: 'idle',
    data: null,
  });

  useEffect(() => {
    if (agentId === null || agentId === '') {
      setState({ status: 'idle', data: null });
      return;
    }

    const logMetadata = createLogMetadata('useMetrics');

    const fetchMetrics = async (): Promise<void> => {
      try {
        setState(prev => ({ ...prev, status: 'loading' }));

        const response = await fetch(`/api/agents/${agentId}/metrics`);
        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }

        const data = (await response.json()) as AgentMetrics;
        setState({ status: 'success', data });
      } catch (error) {
        logger.error('Failed to fetch metrics', {
          ...logMetadata,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
        setState({ status: 'error', data: null, error: 'Failed to fetch metrics' });
      }
    };

    void fetchMetrics();

    const interval = setInterval(() => void fetchMetrics(), 5000);
    return () => clearInterval(interval);
  }, [agentId]);

  return state;
}
