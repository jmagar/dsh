import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/client/store/storeTypes';
import {
  fetchContainers,
  selectAllContainers,
  selectIsLoading,
  selectError,
} from '@/client/store/slices/dockerSlice';
import { useDockerStats } from './useDockerStats';
import { DockerStats } from '@/types/docker';

interface UseDockerManagerProps {
  hostId: string;
}

interface UseDockerManagerReturn {
  containers: any[];
  loading: boolean;
  error: string | null;
  stats: DockerStats | null;
  refreshing: boolean;
  handleRefresh: () => Promise<void>;
  formatPercentage: (value: number) => string;
  clampValue: (value: number) => number;
  getStatsValue: (key: keyof DockerStats) => number;
}

export function useDockerManager({ hostId }: UseDockerManagerProps): UseDockerManagerReturn {
  const dispatch: AppDispatch = useDispatch();
  const containers = useSelector(selectAllContainers);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [refreshing, setRefreshing] = useState(false);
  const { stats, refresh } = useDockerStats({ hostId });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 1000); // Minimum animation time
    void dispatch(fetchContainers(hostId));
  };

  useEffect(() => {
    const interval = setInterval(refresh, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, [refresh]);

  // Format percentages for display
  const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
  };

  // Ensure values are within 0-100 range for LinearProgress
  const clampValue = (value: number): number => {
    return Math.min(Math.max(value, 0), 100);
  };

  // Get stats values safely
  const getStatsValue = (key: keyof DockerStats): number => {
    if (!stats) return 0;
    const value = stats[key];
    return typeof value === 'number' ? value : 0;
  };

  return {
    containers,
    loading,
    error,
    stats,
    refreshing,
    handleRefresh,
    formatPercentage,
    clampValue,
    getStatsValue,
  };
}
