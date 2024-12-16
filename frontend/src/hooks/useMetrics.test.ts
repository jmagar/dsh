import { renderHook } from '@testing-library/react';
import { getSystemMetrics } from '@dsh/shared/types/metrics';

import { useMetrics } from './useMetrics';

// Mock the getSystemMetrics function
jest.mock('@dsh/shared/types/metrics', () => ({
  getSystemMetrics: jest.fn(),
}));

const mockMetricsData = {
  cpu: {
    usage: 0.4567,
    loadAverage: 1.5,
  },
  memory: {
    usage: 0.7890,
    available: 8589934592, // 8GB in bytes
    total: 17179869184, // 16GB in bytes
  },
  disk: {
    usage: 0.2345,
    available: 107374182400, // 100GB in bytes
    total: 268435456000, // 250GB in bytes
  },
};

describe('useMetrics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns initial loading state', () => {
    const { result } = renderHook(() => useMetrics());
    expect(result.current).toEqual({
      data: null,
      status: 'loading',
    });
  });

  it('fetches and updates metrics successfully', async () => {
    (getSystemMetrics as jest.Mock).mockResolvedValueOnce(mockMetricsData);

    const { result } = renderHook(() => useMetrics());

    // Wait for the next update
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current).toEqual({
      data: mockMetricsData,
      status: 'success',
    });
  });

  it('handles error state', async () => {
    (getSystemMetrics as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useMetrics());

    // Wait for the next update
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current).toEqual({
      data: null,
      status: 'error',
    });
  });

  it('calls getSystemMetrics on mount', () => {
    renderHook(() => useMetrics());
    expect(getSystemMetrics).toHaveBeenCalledTimes(1);
  });
});
