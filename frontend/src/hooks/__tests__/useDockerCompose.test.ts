import { renderHook, act } from '@testing-library/react';
import { useDockerCompose } from '../useDockerCompose';
import {
  createComposeConfig,
  deleteComposeConfig,
  getComposeConfig,
  updateComposeConfig,
} from '@/client/api/docker.client';

jest.mock('@/client/api/docker.client', () => ({
  createComposeConfig: jest.fn(),
  deleteComposeConfig: jest.fn(),
  getComposeConfig: jest.fn(),
  updateComposeConfig: jest.fn(),
}));

const mockConfig = {
  content: 'version: "3"\nservices:\n  web:\n    image: nginx',
  status: 'stopped',
};

describe('useDockerCompose', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.composeContent).toBe('');
    expect(result.current.currentConfig).toBeNull();
    expect(result.current.editMode).toBe(false);
    expect(result.current.showConfirmDialog).toBe(false);
    expect(result.current.dialogAction).toBe('up');
  });

  it('should load config successfully', async () => {
    (getComposeConfig as jest.Mock).mockResolvedValueOnce(mockConfig);

    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    await act(async () => {
      await result.current.loadConfig('docker-compose.yml');
    });

    expect(result.current.composeContent).toBe(mockConfig.content);
    expect(result.current.currentConfig).toEqual({ ...mockConfig, status: 'stopped' });
    expect(result.current.error).toBeNull();
  });

  it('should handle load config error', async () => {
    const error = new Error('Failed to load');
    (getComposeConfig as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    await act(async () => {
      await result.current.loadConfig('docker-compose.yml');
    });

    expect(result.current.error).toBe('Failed to load docker-compose config: Failed to load');
  });

  it('should handle edit mode changes', () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    act(() => {
      result.current.handleEditModeChange(true);
    });

    expect(result.current.editMode).toBe(true);

    act(() => {
      result.current.handleEditModeChange(false);
    });

    expect(result.current.editMode).toBe(false);
  });

  it('should handle content changes', () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    act(() => {
      result.current.handleContentChange('new content');
    });

    expect(result.current.composeContent).toBe('new content');
  });

  it('should handle save action', async () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    act(() => {
      result.current.handleContentChange('new content');
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(updateComposeConfig).toHaveBeenCalledWith('test-host', 'new content');
  });

  it('should handle up action', async () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    act(() => {
      result.current.handleContentChange('content');
    });

    await act(async () => {
      await result.current.handleAction('up');
    });

    expect(createComposeConfig).toHaveBeenCalledWith('test-host', 'content');
  });

  it('should handle down action', async () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    await act(async () => {
      await result.current.handleAction('down');
    });

    expect(deleteComposeConfig).toHaveBeenCalledWith('test-host');
  });

  it('should handle remove action', async () => {
    const { result } = renderHook(() => useDockerCompose({ hostId: 'test-host' }));

    await act(async () => {
      await result.current.handleAction('remove');
    });

    expect(deleteComposeConfig).toHaveBeenCalledWith('test-host');
    expect(result.current.composeContent).toBe('');
    expect(result.current.currentConfig).toBeNull();
  });
});
