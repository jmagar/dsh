import { useState, useMemo } from 'react';
import { logger } from '@/client/utils/frontendLogger';
import { DockerContainer } from '@/client/types/docker.types';
import {
  startContainer,
  stopContainer,
  restartContainer,
  removeContainer,
} from '@/client/api/docker.client';

interface UseDockerContainersProps {
  hostId: string;
  containers: DockerContainer[];
  onRefresh: () => Promise<void>;
}

interface UseDockerContainersReturn {
  filteredContainers: DockerContainer[];
  loading: boolean;
  searchTerm: string;
  selectedContainer: DockerContainer | null;
  showDeleteDialog: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  handleContainerAction: (container: DockerContainer, action: 'start' | 'stop' | 'restart' | 'remove') => Promise<void>;
  handleConfirmDelete: () => Promise<void>;
  setShowDeleteDialog: (show: boolean) => void;
}

export function useDockerContainers({
  hostId,
  containers,
  onRefresh,
}: UseDockerContainersProps): UseDockerContainersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContainer, setSelectedContainer] = useState<DockerContainer | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredContainers = useMemo(() => {
    if (!containers) return [];
    return containers.filter(container => {
      const searchString = searchTerm.toLowerCase();
      return (
        container.name.toLowerCase().includes(searchString) ||
        container.image.toLowerCase().includes(searchString) ||
        container.status.toLowerCase().includes(searchString)
      );
    });
  }, [containers, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleContainerAction = async (
    container: DockerContainer,
    action: 'start' | 'stop' | 'restart' | 'remove'
  ) => {
    setLoading(true);
    try {
      switch (action) {
        case 'start':
          await startContainer(hostId, container.id);
          break;
        case 'stop':
          await stopContainer(hostId, container.id);
          break;
        case 'restart':
          await restartContainer(hostId, container.id);
          break;
        case 'remove':
          setSelectedContainer(container);
          setShowDeleteDialog(true);
          break;
      }
      if (onRefresh) {
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

  const handleConfirmDelete = async () => {
    if (!selectedContainer) return;

    setLoading(true);
    try {
      await removeContainer(hostId, selectedContainer.id);
      if (onRefresh) {
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
