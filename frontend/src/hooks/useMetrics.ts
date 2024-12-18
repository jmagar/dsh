import { useCallback, useEffect } from 'react';
import type { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearError,
  clearMetrics,
  fetchMetrics,
  selectMetricsError,
  selectMetricsForAgent,
  selectMetricsLoading,
} from '../store/slices/metricsSlice';
import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

export const useMetrics = (agentId: string, pollInterval = 5000) => {
  const dispatch = useAppDispatch();
  const metrics = useAppSelector((state: RootState) => selectMetricsForAgent(agentId)(state));
  const loading = useAppSelector((state: RootState) => selectMetricsLoading(state));
  const error = useAppSelector((state: RootState) => selectMetricsError(state));

  const fetchAgentMetrics = useCallback(async () => {
    try {
      logger.info('Fetching agent metrics', createLogMetadata('metrics-hook', undefined, {
        message: `Fetching metrics for agent ${agentId}`
      }));
      await dispatch(fetchMetrics(agentId)).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during metrics fetch');
      logger.error('Metrics fetch failed', createLogMetadata('metrics-hook', error, {
        message: `Failed to fetch metrics for agent ${agentId}`
      }));
      throw error;
    }
  }, [dispatch, agentId]);

  const handleClearMetrics = useCallback(() => {
    dispatch(clearMetrics(agentId));
    logger.info('Metrics cleared', createLogMetadata('metrics-hook', undefined, {
      message: `Cleared metrics for agent ${agentId}`
    }));
  }, [dispatch, agentId]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
    logger.info('Metrics error cleared', createLogMetadata('metrics-hook', undefined, {
      message: 'Cleared metrics error state'
    }));
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAgentMetrics();
      } catch (error) {
        logger.error('Failed to fetch metrics in interval', createLogMetadata('metrics-hook', error instanceof Error ? error : undefined, {
          message: `Failed to fetch metrics for agent ${agentId} in interval`
        }));
      }
    };

    void fetchData();
    const interval = setInterval(() => void fetchData(), pollInterval);
    
    return () => {
      clearInterval(interval);
      handleClearMetrics();
    };
  }, [fetchAgentMetrics, pollInterval, handleClearMetrics, agentId]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchAgentMetrics,
    clearMetrics: handleClearMetrics,
    clearError: handleClearError,
  } as const;
}; 