// External imports
import { useCallback } from 'react';

// Type imports
import type { Logger } from '../utils/logger';

// Internal imports
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  connectAgent,
  disconnectAgent,
  setSelectedAgent,
  selectAgentList,
  selectSelectedAgentId,
  selectAgentLoading,
  selectAgentError,
} from '../store/slices/agentSlice';
import { createLogMetadata } from '../utils/logger';

const logger: Logger = console; // TODO: Replace with actual logger implementation

export const useAgent = () => {
  const dispatch = useAppDispatch();
  const connections = useAppSelector(selectAgentList);
  const selectedAgent = useAppSelector(selectSelectedAgentId);
  const loading = useAppSelector(selectAgentLoading);
  const error = useAppSelector(selectAgentError);

  const handleConnect = useCallback(async (agentId: string) => {
    try {
      await dispatch(connectAgent(agentId)).unwrap();
      logger.info('Agent connected', createLogMetadata('agent-hook', undefined, {
        message: `Connected to agent ${agentId}`
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to connect agent');
      logger.error('Failed to connect agent', createLogMetadata('agent-hook', error, {
        message: `Failed to connect to agent ${agentId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleDisconnect = useCallback(async (agentId: string) => {
    try {
      await dispatch(disconnectAgent(agentId)).unwrap();
      logger.info('Agent disconnected', createLogMetadata('agent-hook', undefined, {
        message: `Disconnected from agent ${agentId}`
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to disconnect agent');
      logger.error('Failed to disconnect agent', createLogMetadata('agent-hook', error, {
        message: `Failed to disconnect from agent ${agentId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleSelect = useCallback((agentId: string | null) => {
    dispatch(setSelectedAgent(agentId));
    logger.info('Agent selected', createLogMetadata('agent-hook', undefined, {
      message: `Selected agent ${agentId}`
    }));
  }, [dispatch]);

  return {
    connections,
    selectedAgent,
    loading,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    select: handleSelect,
  } as const;
}; 