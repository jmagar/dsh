import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Socket } from 'socket.io-client';

import { AgentMetrics } from './AgentMetrics';

// Mock the shared types and utils
jest.mock('@dsh/shared/types/metrics', () => ({
  getSystemMetrics: jest.fn(),
}));

jest.mock('../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
  createLogMetadata: jest.fn(),
}));

describe('AgentMetrics', () => {
  const mockSocket = {} as Socket;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<AgentMetrics socket={mockSocket} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when metrics fetch fails', async () => {
    const { getSystemMetrics } = require('@dsh/shared/types/metrics');
    getSystemMetrics.mockRejectedValueOnce(new Error('Failed to fetch metrics'));

    render(<AgentMetrics socket={mockSocket} />);

    await waitFor(() => {
      expect(screen.getByText('Error loading metrics')).toBeInTheDocument();
    });
  });

  it('renders metrics data when fetch succeeds', async () => {
    const { getSystemMetrics } = require('@dsh/shared/types/metrics');
    getSystemMetrics.mockResolvedValueOnce({
      cpu: {
        usage: 0.5,
        loadAverage: 1.5,
      },
      memory: {
        usage: 0.75,
        available: 8589934592, // 8GB in bytes
        total: 17179869184, // 16GB in bytes
      },
      disk: {
        usage: 0.6,
        available: 107374182400, // 100GB in bytes
        total: 268435456000, // 250GB in bytes
      },
    });

    render(<AgentMetrics socket={mockSocket} />);

    await waitFor(() => {
      expect(screen.getByText('System Metrics')).toBeInTheDocument();
      expect(screen.getByText('Usage: 50.0%')).toBeInTheDocument(); // CPU usage
      expect(screen.getByText('Load Average: 1.5')).toBeInTheDocument();
      expect(screen.getByText('Usage: 75.0%')).toBeInTheDocument(); // Memory usage
      expect(screen.getByText('Available: 8192 MB')).toBeInTheDocument();
      expect(screen.getByText('Total: 16384 MB')).toBeInTheDocument();
      expect(screen.getByText('Usage: 60.0%')).toBeInTheDocument(); // Disk usage
      expect(screen.getByText('Available: 102400 MB')).toBeInTheDocument();
      expect(screen.getByText('Total: 256000 MB')).toBeInTheDocument();
    });
  });
});
