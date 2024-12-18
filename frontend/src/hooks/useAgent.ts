import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  connectAgent,
  disconnectAgent,
  setSelectedAgent,
  selectAgents,
  selectSelectedAgent,
  selectAgentsLoading,
  selectAgentsError,
} from '../store/slices/agentSlice';
import type { RootState } from '../store/store';

import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

export const useAgent = () => {
  const dispatch = useAppDispatch();
  const connections = useAppSelector(selectAgents);
  const selectedAgent = useAppSelector(selectSelectedAgent);
  const loading = useAppSelector(selectAgentsLoading);
  const error = useAppSelector(selectAgentsError);

  const handleConnect = useCallback(async (agentId: string) => {
    try {
      await dispatch(connectAgent(agentId)).unwrap();
      logger.info('Agent connected', createLogMetadata('agent-hook', undefined, {
        message: `Connected to agent ${agentId}`
      }));
    } catch (error) {
      logger.error('Failed to connect agent', createLogMetadata('agent-hook', error));
      throw error;
    }
  }, [dispatch]);

  const handleDisconnect = useCallback(async (agentId: string) => {
    try {
      await dispatch(disconnectAgent(agentId)).unwrap();
      logger.info('Agent disconnected', createLogMetadata('agent-hook', undefined, {
        message: `Disconnected from agent ${agentId}`
      }));
    } catch (error) {
      logger.error('Failed to disconnect agent', createLogMetadata('agent-hook', error));
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