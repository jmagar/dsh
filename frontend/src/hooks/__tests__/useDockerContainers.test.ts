import { renderHook, act } from '@testing-library/react';
import { useDockerContainers } from '../useDockerContainers';
import {
  startContainer,
  stopContainer,
  restartContainer,
  removeContainer,
} from '@/client/api/docker.client';

jest.mock('@/client/api/docker.client', () => ({
  startContainer: jest.fn(),
  stopContainer: jest.fn(),
  restartContainer: jest.fn(),
  removeContainer: jest.fn(),
}));

const mockContainer = {
  id: 'container-1',
  name: 'test-container',
  image: 'nginx:latest',
  status: 'running',
  state: 'running',
  created: 1234567890,
  ports: [{ privatePort: 80, publicPort: 8080 }],
};

const mockProps = {
  hostId: 'host-1',
  containers: [mockContainer],
  onRefresh: jest.fn(),
};

describe('useDockerContainers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    expect(result.current.filteredContainers).toEqual([mockContainer]);
    expect(result.current.loading).toBe(false);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedContainer).toBe(null);
    expect(result.current.showDeleteDialog).toBe(false);
  });

  it('should filter containers based on search term', () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    act(() => {
      result.current.handleSearchChange({ target: { value: 'nginx' } } as any);
    });

    expect(result.current.filteredContainers).toEqual([mockContainer]);

    act(() => {
      result.current.handleSearchChange({ target: { value: 'nonexistent' } } as any);
    });

    expect(result.current.filteredContainers).toEqual([]);
  });

  it('should clear search term', () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    act(() => {
      result.current.handleSearchChange({ target: { value: 'nginx' } } as any);
    });

    expect(result.current.searchTerm).toBe('nginx');

    act(() => {
      result.current.handleClearSearch();
    });

    expect(result.current.searchTerm).toBe('');
  });

  it('should handle container start action', async () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    await act(async () => {
      await result.current.handleContainerAction(mockContainer, 'start');
    });

    expect(startContainer).toHaveBeenCalledWith('host-1', 'container-1');
    expect(mockProps.onRefresh).toHaveBeenCalled();
  });

  it('should handle container stop action', async () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    await act(async () => {
      await result.current.handleContainerAction(mockContainer, 'stop');
    });

    expect(stopContainer).toHaveBeenCalledWith('host-1', 'container-1');
    expect(mockProps.onRefresh).toHaveBeenCalled();
  });

  it('should handle container restart action', async () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    await act(async () => {
      await result.current.handleContainerAction(mockContainer, 'restart');
    });

    expect(restartContainer).toHaveBeenCalledWith('host-1', 'container-1');
    expect(mockProps.onRefresh).toHaveBeenCalled();
  });

  it('should handle container remove action', async () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    await act(async () => {
      await result.current.handleContainerAction(mockContainer, 'remove');
    });

    expect(result.current.selectedContainer).toBe(mockContainer);
    expect(result.current.showDeleteDialog).toBe(true);
  });

  it('should handle container delete confirmation', async () => {
    const { result } = renderHook(() => useDockerContainers(mockProps));

    await act(async () => {
      await result.current.handleContainerAction(mockContainer, 'remove');
    });

    await act(async () => {
      await result.current.handleConfirmDelete();
    });

    expect(removeContainer).toHaveBeenCalledWith('host-1', 'container-1');
    expect(mockProps.onRefresh).toHaveBeenCalled();
    expect(result.current.showDeleteDialog).toBe(false);
    expect(result.current.selectedContainer).toBe(null);
  });
});
