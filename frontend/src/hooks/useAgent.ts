import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  connectAgent,
  disconnectAgent,
  selectAgent,
  selectAgentConnections,
  selectAgentError,
  selectAgentLoading,
  selectSelectedAgentId,
} from '../store/slices/agentSlice';
import type { RootState } from '../store/store';

import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

export const useAgent = () => {
  const dispatch = useAppDispatch();
  const connections = useAppSelector((state: RootState) => selectAgentConnections(state));
  const selectedAgentId = useAppSelector((state: RootState) => selectSelectedAgentId(state));
  const loading = useAppSelector((state: RootState) => selectAgentLoading(state));
  const error = useAppSelector((state: RootState) => selectAgentError(state));

  const handleConnect = useCallback(async (hostname: string) => {
    try {
      logger.info('Connecting to agent', createLogMetadata('agent-hook', undefined, {
        message: `Attempting to connect to agent at ${hostname}`
      }));
      await dispatch(connectAgent(hostname)).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during agent connection');
      logger.error('Agent connection failed', createLogMetadata('agent-hook', error, {
        message: `Failed to connect to agent at ${hostname}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleDisconnect = useCallback(async (agentId: string) => {
    try {
      logger.info('Disconnecting agent', createLogMetadata('agent-hook', undefined, {
        message: `Disconnecting agent ${agentId}`
      }));
      await dispatch(disconnectAgent(agentId)).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during agent disconnection');
      logger.error('Agent disconnection failed', createLogMetadata('agent-hook', error, {
        message: `Failed to disconnect agent ${agentId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleSelect = useCallback((agentId: string | null) => {
    dispatch(selectAgent(agentId));
    logger.info('Agent selected', createLogMetadata('agent-hook', undefined, {
      message: `Selected agent ${agentId}`
    }));
  }, [dispatch]);

  return {
    connections,
    selectedAgentId,
    loading,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    select: handleSelect,
  } as const;
}; 