import { useState, useCallback, useEffect } from 'react';
import { DockerStats } from '@/client/types/docker.types';

interface UseDockerStatsProps {
  hostIds: string[];
  pollInterval?: number;
  maxDataPoints?: number;
}

interface StatsState {
  [containerId: string]: {
    cpuUsage: number[];
    memoryUsage: number[];
    networkRx: number[];
    networkTx: number[];
    timestamp: number[];
  };
}

export function useDockerStats({
  hostIds,
  pollInterval = 1000,
  maxDataPoints = 60,
}: UseDockerStatsProps) {
  const [stats, setStats] = useState<StatsState>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const responses = await Promise.all(
        hostIds.map(async (hostId) => {
          const response = await fetch(`/api/docker/${hostId}/stats`);
          if (!response.ok) {
            throw new Error(`Failed to fetch stats for host ${hostId}`);
          }
          return response.json();
        })
      );

      const newStats: DockerStats[] = responses.flat();

      setStats((prevStats) => {
        const updatedStats = { ...prevStats };

        newStats.forEach((stat) => {
          const containerId = stat.containerId;
          if (!updatedStats[containerId]) {
            updatedStats[containerId] = {
              cpuUsage: [],
              memoryUsage: [],
              networkRx: [],
              networkTx: [],
              timestamp: [],
            };
          }

          // Add new data points
          updatedStats[containerId].cpuUsage.push(stat.cpuPercentage);
          updatedStats[containerId].memoryUsage.push(stat.memoryUsage);
          updatedStats[containerId].networkRx.push(stat.networkRx);
          updatedStats[containerId].networkTx.push(stat.networkTx);
          updatedStats[containerId].timestamp.push(Date.now());

          // Trim arrays to maintain maxDataPoints
          if (updatedStats[containerId].cpuUsage.length > maxDataPoints) {
            updatedStats[containerId].cpuUsage = updatedStats[containerId].cpuUsage.slice(-maxDataPoints);
            updatedStats[containerId].memoryUsage = updatedStats[containerId].memoryUsage.slice(-maxDataPoints);
            updatedStats[containerId].networkRx = updatedStats[containerId].networkRx.slice(-maxDataPoints);
            updatedStats[containerId].networkTx = updatedStats[containerId].networkTx.slice(-maxDataPoints);
            updatedStats[containerId].timestamp = updatedStats[containerId].timestamp.slice(-maxDataPoints);
          }
        });

        return updatedStats;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Docker stats');
    } finally {
      setLoading(false);
    }
  }, [hostIds, maxDataPoints]);

  useEffect(() => {
    if (hostIds.length === 0) return;

    void fetchStats();
    const interval = setInterval(() => void fetchStats(), pollInterval);

    return () => {
      clearInterval(interval);
    };
  }, [hostIds, pollInterval, fetchStats]);

  const clearStats = useCallback(() => {
    setStats({});
  }, []);

  return {
    stats,
    loading,
    error,
    clearStats,
  };
}
