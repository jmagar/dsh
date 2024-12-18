import { useCallback } from 'react';

import { useDocker } from './useDocker';
import type { DockerContainer } from '@dsh/shared/types';
import type { Logger } from '../utils/logger';
import { createLogMetadata } from '../utils/logger';

const logger: Logger = console; // TODO: Replace with actual logger implementation

export const useDockerManager = () => {
  const docker = useDocker();

  const handleContainerAction = useCallback(async (containerId: string, action: 'start' | 'stop') => {
    try {
      if (action === 'start') {
        await docker.startContainer(containerId);
      } else {
        await docker.stopContainer(containerId);
      }
      await docker.fetchContainers();
      logger.info('Container action completed', createLogMetadata('docker-manager-hook', undefined, {
        message: `${action} action completed for container ${containerId}`
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error(`Failed to ${action} container`);
      logger.error(`Container action failed`, createLogMetadata('docker-manager-hook', error, {
        message: `Failed to ${action} container ${containerId}`
      }));
      throw error;
    }
  }, [docker]);

  const getContainerStatus = useCallback((container: DockerContainer): string => {
    return container.state?.status || 'unknown';
  }, []);

  const refreshContainers = useCallback(async () => {
    try {
      await docker.fetchContainers();
      logger.info('Containers refreshed', createLogMetadata('docker-manager-hook', undefined, {
        message: 'Successfully refreshed container list'
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to refresh containers');
      logger.error('Container refresh failed', createLogMetadata('docker-manager-hook', error, {
        message: 'Failed to refresh container list'
      }));
      throw error;
    }
  }, [docker]);

  return {
    ...docker,
    handleContainerAction,
    getContainerStatus,
    refreshContainers,
  } as const;
}; 