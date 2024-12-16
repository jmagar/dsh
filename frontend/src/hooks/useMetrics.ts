import { useEffect, useState } from 'react';

import { getSystemMetrics } from '@dsh/shared/types/metrics';
import { createLogMetadata } from '../utils/logger';
import { logger } from '../utils/logger';
import { MetricsState } from '../components/AgentConnectionManager/types';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function useMetrics() {
  const [metricsState, setMetricsState] = useState<MetricsState>({
    data: null,
    status: 'loading',
  });

  useEffect(() => {
    const logMetadata = createLogMetadata('useMetrics');

    const fetchMetrics = async () => {
      try {
        const metrics = await getSystemMetrics();
        setMetricsState({ data: metrics, status: 'success' });
      } catch (error) {
        logger.error(
          logMetadata,
          isError(error) ? error.message : 'Unknown error fetching metrics',
        );
        setMetricsState({ data: null, status: 'error' });
      }
    };

    void fetchMetrics();
  }, []);

  return metricsState;
}
