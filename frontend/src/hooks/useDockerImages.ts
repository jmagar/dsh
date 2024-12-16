import { useState, useCallback } from 'react';
import { DockerImage } from '@/client/types/docker.types';

interface UseDockerImagesProps {
  hostIds: string[];
}

export function useDockerImages({ hostIds }: UseDockerImagesProps) {
  const [images, setImages] = useState<DockerImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const responses = await Promise.all(
        hostIds.map(async (hostId) => {
          const response = await fetch(`/api/docker/${hostId}/images`);
          if (!response.ok) {
            throw new Error(`Failed to fetch images for host ${hostId}`);
          }
          return response.json();
        })
      );

      setImages(responses.flat());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Docker images');
    } finally {
      setLoading(false);
    }
  }, [hostIds]);

  const pullImage = useCallback(async (hostId: string, imageName: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/docker/${hostId}/images/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageName }),
      });

      if (!response.ok) {
        throw new Error('Failed to pull image');
      }

      await fetchImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to pull image');
    } finally {
      setLoading(false);
    }
  }, [fetchImages]);

  const removeImage = useCallback(async (hostId: string, imageId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/docker/${hostId}/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove image');
      }

      await fetchImages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove image');
    } finally {
      setLoading(false);
    }
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    fetchImages,
    pullImage,
    removeImage,
  };
}
