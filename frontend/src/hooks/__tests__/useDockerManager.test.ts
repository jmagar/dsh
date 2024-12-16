import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useDockerManager } from '../useDockerManager';
import { useDockerStats } from '../useDockerStats';
import { fetchContainers } from '@/client/store/slices/dockerSlice';

// Mock dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../useDockerStats', () => ({
  useDockerStats: jest.fn(),
}));

jest.mock('@/client/store/slices/dockerSlice', () => ({
  fetchContainers: jest.fn(),
  selectAllContainers: (state: any) => state.containers,
  selectIsLoading: (state: any) => state.loading,
  selectError: (state: any) => state.error,
}));

describe('useDockerManager', () => {
  const mockDispatch = jest.fn();
  const mockRefresh = jest.fn();
  const mockStats = {
    cpuUsage: 50,
    memoryUsage: 60,
    diskUsage: 70,
    containers: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useDockerStats as jest.Mock).mockReturnValue({
      stats: mockStats,
      refresh: mockRefresh,
    });
    (useSelector as jest.Mock).mockImplementation((selector) => {
      const state = {
        containers: [],
        loading: false,
        error: null,
      };
      return selector(state);
    });
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(result.current).toEqual({
      containers: [],
      loading: false,
      error: null,
      stats: mockStats,
      refreshing: false,
      handleRefresh: expect.any(Function),
      formatPercentage: expect.any(Function),
      clampValue: expect.any(Function),
      getStatsValue: expect.any(Function),
    });
  });

  it('handles refresh correctly', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    await act(async () => {
      await result.current.handleRefresh();
      jest.advanceTimersByTime(1000);
    });

    expect(mockRefresh).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(fetchContainers('test-host'));
    expect(result.current.refreshing).toBe(false);

    jest.useRealTimers();
  });

  it('formats percentage correctly', () => {
    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(result.current.formatPercentage(50.5)).toBe('51%');
    expect(result.current.formatPercentage(0)).toBe('0%');
    expect(result.current.formatPercentage(100)).toBe('100%');
  });

  it('clamps values correctly', () => {
    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(result.current.clampValue(-10)).toBe(0);
    expect(result.current.clampValue(50)).toBe(50);
    expect(result.current.clampValue(150)).toBe(100);
  });

  it('gets stats values correctly', () => {
    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(result.current.getStatsValue('cpuUsage')).toBe(50);
    expect(result.current.getStatsValue('memoryUsage')).toBe(60);
    expect(result.current.getStatsValue('diskUsage')).toBe(70);
    expect(result.current.getStatsValue('containers')).toBe(5);
  });

  it('sets up and cleans up refresh interval', () => {
    jest.useFakeTimers();

    const { unmount } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);

    unmount();

    expect(clearInterval).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('handles loading state', () => {
    (useSelector as jest.Mock).mockImplementation((selector) => {
      const state = {
        containers: [],
        loading: true,
        error: null,
      };
      return selector(state);
    });

    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(result.current.loading).toBe(true);
  });

  it('handles error state', () => {
    const errorMessage = 'Test error';
    (useSelector as jest.Mock).mockImplementation((selector) => {
      const state = {
        containers: [],
        loading: false,
        error: errorMessage,
      };
      return selector(state);
    });

    const { result } = renderHook(() => useDockerManager({ hostId: 'test-host' }));

    expect(result.current.error).toBe(errorMessage);
  });
});
