import { useCallback } from 'react';
import type { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchContainers,
  selectContainer,
  selectDockerContainers,
  selectDockerError,
  selectDockerLoading,
  selectSelectedContainerId,
  startContainer,
  stopContainer,
} from '../store/slices/dockerSlice';
import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

export const useDocker = () => {
  const dispatch = useAppDispatch();
  const containers = useAppSelector((state: RootState) => selectDockerContainers(state));
  const selectedContainerId = useAppSelector((state: RootState) => selectSelectedContainerId(state));
  const loading = useAppSelector((state: RootState) => selectDockerLoading(state));
  const error = useAppSelector((state: RootState) => selectDockerError(state));

  const handleFetchContainers = useCallback(async () => {
    try {
      logger.info('Fetching Docker containers', createLogMetadata('docker-hook', undefined, {
        message: 'Fetching list of Docker containers'
      }));
      await dispatch(fetchContainers()).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during container fetch');
      logger.error('Docker containers fetch failed', createLogMetadata('docker-hook', error, {
        message: 'Failed to fetch Docker containers'
      }));
      throw error;
    }
  }, [dispatch]);

  const handleStartContainer = useCallback(async (containerId: string) => {
    try {
      logger.info('Starting Docker container', createLogMetadata('docker-hook', undefined, {
        message: `Starting container ${containerId}`
      }));
      await dispatch(startContainer(containerId)).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during container start');
      logger.error('Docker container start failed', createLogMetadata('docker-hook', error, {
        message: `Failed to start container ${containerId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleStopContainer = useCallback(async (containerId: string) => {
    try {
      logger.info('Stopping Docker container', createLogMetadata('docker-hook', undefined, {
        message: `Stopping container ${containerId}`
      }));
      await dispatch(stopContainer(containerId)).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during container stop');
      logger.error('Docker container stop failed', createLogMetadata('docker-hook', error, {
        message: `Failed to stop container ${containerId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleSelectContainer = useCallback((containerId: string | null) => {
    dispatch(selectContainer(containerId));
    logger.info('Docker container selected', createLogMetadata('docker-hook', undefined, {
      message: `Selected container ${containerId}`
    }));
  }, [dispatch]);

  return {
    containers,
    selectedContainerId,
    loading,
    error,
    fetchContainers: handleFetchContainers,
    startContainer: handleStartContainer,
    stopContainer: handleStopContainer,
    selectContainer: handleSelectContainer,
  } as const;
}; 