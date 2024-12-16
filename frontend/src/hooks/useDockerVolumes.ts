import { useState, useCallback } from 'react';
import { DockerVolume } from '@/client/types/docker.types';

interface UseDockerVolumesProps {
  hostIds: string[];
}

interface VolumeCreateOptions {
  name: string;
  driver: string;
  labels: Record<string, string>;
}

export function useDockerVolumes({ hostIds }: UseDockerVolumesProps) {
  const [volumes, setVolumes] = useState<DockerVolume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVolumes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const responses = await Promise.all(
        hostIds.map(async (hostId) => {
          const response = await fetch(`/api/docker/${hostId}/volumes`);
          if (!response.ok) {
            throw new Error(`Failed to fetch volumes for host ${hostId}`);
          }
          return response.json();
        })
      );

      setVolumes(responses.flat());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Docker volumes');
    } finally {
      setLoading(false);
    }
  }, [hostIds]);

  const createVolume = useCallback(async (hostId: string, options: VolumeCreateOptions) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/docker/${hostId}/volumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error('Failed to create volume');
      }

      await fetchVolumes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create volume');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVolumes]);

  const removeVolume = useCallback(async (hostId: string, volumeName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/docker/${hostId}/volumes/${volumeName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove volume');
      }

      await fetchVolumes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove volume');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVolumes]);

  const pruneVolumes = useCallback(async (hostId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/docker/${hostId}/volumes/prune`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to prune volumes');
      }

      await fetchVolumes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to prune volumes');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchVolumes]);

  return {
    volumes,
    loading,
    error,
    fetchVolumes,
    createVolume,
    removeVolume,
    pruneVolumes,
  };
}
