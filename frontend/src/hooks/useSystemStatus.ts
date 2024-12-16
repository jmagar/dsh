import { useCallback, useEffect, useState } from 'react';

import { apiClient } from '../services/api';
import { SystemStatusData, SystemStatusState } from '../components/SystemStatus/types';

export function useSystemStatus() {
  const [state, setState] = useState<SystemStatusState>({
    data: null,
    error: null,
  });

  const fetchSystemStatus = useCallback(async () => {
    try {
      const response = await apiClient.get<SystemStatusData>('/health');
      setState(prev => ({ ...prev, data: response.data, error: null }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch system status',
      }));
      console.error('Error fetching system status:', err);
    }
  }, []);

  useEffect(() => {
    void fetchSystemStatus();
    const interval = setInterval(() => void fetchSystemStatus(), 5000);
    return () => clearInterval(interval);
  }, [fetchSystemStatus]);

  return state;
}
