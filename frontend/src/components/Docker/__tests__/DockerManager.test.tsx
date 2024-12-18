import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import React from 'react';
import { DockerManager } from '../DockerManager';
import { useDockerManager } from '../../../hooks/useDockerManager';
import type { DockerContainer } from '@dsh/shared/types';

// Mock the hooks
vi.mock('../../../hooks/useDockerManager', () => ({
  useDockerManager: vi.fn(),
}));

describe('DockerManager', () => {
  const mockDockerManager = {
    containers: [] as DockerContainer[],
    loading: false,
    error: null,
    handleContainerAction: vi.fn(),
    getContainerStatus: vi.fn(),
    refreshContainers: vi.fn(),
  };

  beforeEach(() => {
    vi.mocked(useDockerManager).mockReturnValue(mockDockerManager);
  });

  it('renders without crashing', () => {
    render(<DockerManager hostId="test-host" userId="test-user" />);
    expect(screen.getByText('Docker Management')).toBeDefined();
  });

  it('shows loading state', () => {
    vi.mocked(useDockerManager).mockReturnValue({
      ...mockDockerManager,
      loading: true,
    });
    render(<DockerManager hostId="test-host" userId="test-user" />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('shows error state', () => {
    vi.mocked(useDockerManager).mockReturnValue({
      ...mockDockerManager,
      error: 'Test error',
    });
    render(<DockerManager hostId="test-host" userId="test-user" />);
    expect(screen.getByText('Error: Test error')).toBeDefined();
  });
});
