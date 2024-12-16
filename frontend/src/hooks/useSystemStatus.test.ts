import { renderHook, act } from '@testing-library/react';

import { apiClient } from '../services/api';
import { useSystemStatus } from './useSystemStatus';

// Mock the API client
jest.mock('../services/api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockSystemStatusData = {
  details: {
    database: true,
    redis: true,
  },
  agents: [
    {
      id: 'agent-1',
      connected: true,
      lastSeen: '2024-12-15T21:00:00Z',
      osInfo: {
        os: 'Windows',
        platform: 'win32',
        arch: 'x64',
      },
    },
  ],
  agentMetrics: {
    'agent-1': {
      metrics: {
        cpuUsage: 45.67,
        memoryUsage: 78.90,
        diskUsage: 23.45,
      },
    },
  },
};

describe('useSystemStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useSystemStatus());
    expect(result.current).toEqual({
      data: null,
      error: null,
    });
  });

  it('fetches and updates data successfully', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockSystemStatusData });

    const { result } = renderHook(() => useSystemStatus());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current).toEqual({
      data: mockSystemStatusData,
      error: null,
    });
  });

  it('handles error state', async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useSystemStatus());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current).toEqual({
      data: null,
      error: 'Failed to fetch system status',
    });
  });

  it('updates data periodically', async () => {
    const mockData1 = mockSystemStatusData;
    const mockData2 = {
      ...mockSystemStatusData,
      agents: [{ ...mockSystemStatusData.agents[0], id: 'agent-2' }],
    };

    (apiClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockData1 })
      .mockResolvedValueOnce({ data: mockData2 });

    const { result } = renderHook(() => useSystemStatus());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.data).toEqual(mockData1);

    await act(async () => {
      jest.advanceTimersByTime(5000);
      await Promise.resolve();
    });

    expect(result.current.data).toEqual(mockData2);
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    const { unmount } = renderHook(() => useSystemStatus());

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
