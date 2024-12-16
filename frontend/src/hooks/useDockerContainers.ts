import { useState, useMemo, useEffect, useRef } from 'react';

import {
  startContainer,
  stopContainer,
  restartContainer,
  removeContainer,
  AgentWebSocket,
} from '../services/agent.client';
import { DockerContainer } from '../types/docker.types';
import { logger } from '../utils/logger';

/** Props for the useDockerContainers hook */
interface UseDockerContainersProps {
  /** ID of the agent managing the containers */
  agentId: string;
  /** List of Docker containers to display and manage */
  containers: DockerContainer[];
  /** Callback to refresh the container list */
  onRefresh: () => Promise<void>;
}

/** Return type for the useDockerContainers hook */
interface UseDockerContainersReturn {
  /** List of containers filtered by search term */
  filteredContainers: DockerContainer[];
  /** Loading state for async operations */
  loading: boolean;
  /** Current search term */
  searchTerm: string;
  /** Currently selected container for deletion */
  selectedContainer: DockerContainer | null;
  /** Whether the delete confirmation dialog is shown */
  showDeleteDialog: boolean;
  /** Handler for search input changes */
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler to clear the search term */
  handleClearSearch: () => void;
  /** Handler for container actions (start, stop, restart, remove) */
  handleContainerAction: (
    container: DockerContainer,
    action: 'start' | 'stop' | 'restart' | 'remove'
  ) => Promise<void>;
  /** Handler to confirm container deletion */
  handleConfirmDelete: () => Promise<void>;
  /** Handler to show/hide the delete confirmation dialog */
  setShowDeleteDialog: (show: boolean) => void;
}

/**
 * Hook for managing Docker containers through an agent.
 * Provides functionality for:
 * - Filtering containers by search term
 * - Starting, stopping, restarting containers
 * - Removing containers with confirmation
 * - Real-time updates via WebSocket
 *
 * @param props - Hook configuration
 * @returns Object containing container state and handlers
 */
export function useDockerContainers({
  agentId,
  containers,
  onRefresh,
}: UseDockerContainersProps): UseDockerContainersReturn {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedContainer, setSelectedContainer] = useState<DockerContainer | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const wsRef = useRef<AgentWebSocket | null>(null);

  // Initialize WebSocket connection for real-time updates
  useEffect(() => {
    wsRef.current = new AgentWebSocket(agentId, event => {
      if (event.type === 'container') {
        // Refresh container list when we receive container events
        void onRefresh();
      } else if (event.type === 'error') {
        logger.error('WebSocket error from agent', {
          component: 'docker-containers',
          message: event.message,
          agentId,
        });
      }
    });

    return () => {
      wsRef.current?.disconnect();
      wsRef.current = null;
    };
  }, [agentId, onRefresh]);

  /**
   * Filters containers based on the current search term.
   * Matches against container name, image, and status.
   */
  const filteredContainers = useMemo((): DockerContainer[] => {
    if (!Array.isArray(containers)) return [];
    return containers.filter((container: DockerContainer) => {
      if (!container || typeof container !== 'object') return false;

      const searchString = searchTerm.toLowerCase();
      const name = (container.name || '').toLowerCase();
      const image = (container.image || '').toLowerCase();
      const status = (container.status || '').toLowerCase();

      return (
        name.includes(searchString) || image.includes(searchString) || status.includes(searchString)
      );
    });
  }, [containers, searchTerm]);

  /**
   * Updates the search term when the search input changes.
   * @param event - Change event from the search input
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  /** Clears the current search term */
  const handleClearSearch = (): void => {
    setSearchTerm('');
  };

  /**
   * Performs actions on a container (start, stop, restart, remove).
   * For remove action, shows a confirmation dialog instead of removing immediately.
   *
   * @param container - The container to act on
   * @param action - The action to perform
   */
  const handleContainerAction = async (
    container: DockerContainer,
    action: 'start' | 'stop' | 'restart' | 'remove'
  ): Promise<void> => {
    if (!container || !container.id) {
      logger.error('Invalid container object provided to handleContainerAction');
      return;
    }

    setLoading(true);
    try {
      switch (action) {
        case 'start':
          await startContainer(agentId, container.id);
          break;
        case 'stop':
          await stopContainer(agentId, container.id);
          break;
        case 'restart':
          await restartContainer(agentId, container.id);
          break;
        case 'remove':
          setSelectedContainer(container);
          setShowDeleteDialog(true);
          break;
      }
      if (typeof onRefresh === 'function') {
        await onRefresh();
      }
    } catch (err) {
      logger.error('Failed to perform container action:', {
        action,
        containerId: container.id,
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Confirms and executes container deletion.
   * Only proceeds if a container is selected for deletion.
   */
  const handleConfirmDelete = async (): Promise<void> => {
    if (!selectedContainer || !selectedContainer.id) {
      logger.error('No container selected for deletion');
      return;
    }

    setLoading(true);
    try {
      await removeContainer(agentId, selectedContainer.id);
      if (typeof onRefresh === 'function') {
        await onRefresh();
      }
    } catch (err) {
      logger.error('Failed to remove container:', {
        containerId: selectedContainer.id,
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
      setSelectedContainer(null);
    }
  };

  return {
    filteredContainers,
    loading,
    searchTerm,
    selectedContainer,
    showDeleteDialog,
    handleSearchChange,
    handleClearSearch,
    handleContainerAction,
    handleConfirmDelete,
    setShowDeleteDialog,
  };
}
