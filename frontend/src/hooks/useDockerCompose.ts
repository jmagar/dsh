import { useState, useCallback } from 'react';
import { logger } from '@/client/utils/frontendLogger';
import { DockerComposeConfig } from '@/client/types/docker.types';
import {
  createComposeConfig,
  deleteComposeConfig,
  getComposeConfig,
  updateComposeConfig,
} from '@/client/api/docker.client';

interface UseDockerComposeProps {
  hostId: string;
}

interface UseDockerComposeReturn {
  loading: boolean;
  error: string | null;
  composeContent: string;
  currentConfig: DockerComposeConfig | null;
  editMode: boolean;
  showConfirmDialog: boolean;
  dialogAction: 'up' | 'down' | 'remove';
  handleEditModeChange: (mode: boolean) => void;
  handleContentChange: (content: string) => void;
  handleAction: (action: 'up' | 'down' | 'remove') => Promise<void>;
  handleSave: () => Promise<void>;
  setShowConfirmDialog: (show: boolean) => void;
  setDialogAction: (action: 'up' | 'down' | 'remove') => void;
  loadConfig: (configName: string) => Promise<void>;
}

export function useDockerCompose({ hostId }: UseDockerComposeProps): UseDockerComposeReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [composeContent, setComposeContent] = useState('');
  const [currentConfig, setCurrentConfig] = useState<DockerComposeConfig | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'up' | 'down' | 'remove'>('up');

  const handleEditModeChange = (mode: boolean) => {
    setEditMode(mode);
    if (!mode) {
      // Reset content if canceling edit
      setComposeContent(currentConfig?.content || '');
    }
  };

  const handleContentChange = (content: string) => {
    setComposeContent(content);
  };

  const handleAction = async (action: 'up' | 'down' | 'remove') => {
    setLoading(true);
    setError(null);
    try {
      switch (action) {
        case 'up':
          await createComposeConfig(hostId, composeContent);
          if (currentConfig) {
            setCurrentConfig({ ...currentConfig, status: 'running' });
          }
          break;
        case 'down':
          await deleteComposeConfig(hostId);
          if (currentConfig) {
            setCurrentConfig({ ...currentConfig, status: 'stopped' });
          }
          break;
        case 'remove':
          await deleteComposeConfig(hostId);
          setCurrentConfig(null);
          setComposeContent('');
          break;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to ${action} docker-compose: ${errorMessage}`);
      logger.error(`Failed to ${action} docker-compose:`, {
        error: errorMessage,
      });
      if (currentConfig) {
        setCurrentConfig({ ...currentConfig, status: 'error' });
      }
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateComposeConfig(hostId, composeContent);
      if (currentConfig) {
        setCurrentConfig({ ...currentConfig, content: composeContent });
      }
      setEditMode(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to save docker-compose: ${errorMessage}`);
      logger.error('Failed to save docker-compose:', {
        error: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadConfig = useCallback(async (configName: string) => {
    setLoading(true);
    setError(null);
    try {
      const config = await getComposeConfig(hostId, configName);
      if (config) {
        setComposeContent(config.content);
        setCurrentConfig({ ...config, status: 'stopped' });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to load docker-compose config: ${errorMessage}`);
      logger.error('Failed to load docker-compose config:', {
        error: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [hostId]);

  return {
    loading,
    error,
    composeContent,
    currentConfig,
    editMode,
    showConfirmDialog,
    dialogAction,
    handleEditModeChange,
    handleContentChange,
    handleAction,
    handleSave,
    setShowConfirmDialog,
    setDialogAction,
    loadConfig,
  };
}
