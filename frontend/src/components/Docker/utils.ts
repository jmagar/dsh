export const formatPercentage = (value: number | undefined): string => {
  if (typeof value !== 'number') return '0%';
  return `${Math.round(value)}%`;
};

export const clampValue = (value: number | undefined): number => {
  if (typeof value !== 'number') return 0;
  return Math.min(Math.max(value, 0), 100);
};

export const getStatsValue = (key: string): number => {
  // TODO: Replace with actual stats implementation
  const mockStats: Record<string, number> = {
    memoryUsage: 45,
    cpuUsage: 30,
    diskUsage: 60,
    containers: 5
  };
  return mockStats[key] || 0;
}; 