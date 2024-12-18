import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { apiClient } from '../../services/api';

import { SystemStatus } from './SystemStatus';

// Mock the API client
jest.mock('../../services/api', () => ({
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

describe('SystemStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (apiClient.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<SystemStatus />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays system status data when loaded', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockSystemStatusData });
    
    render(<SystemStatus />);
    
    await waitFor(() => {
      expect(screen.getByText('System Status')).toBeInTheDocument();
      expect(screen.getByText('Database')).toBeInTheDocument();
      expect(screen.getByText('Redis')).toBeInTheDocument();
      expect(screen.getByText('Connected Agents')).toBeInTheDocument();
      expect(screen.getByText('agent-1')).toBeInTheDocument();
    });
  });

  it('shows error alert when API call fails', async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    render(<SystemStatus />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch system status')).toBeInTheDocument();
    });
  });

  it('displays "No agents connected" when there are no agents', async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      data: {
        ...mockSystemStatusData,
        agents: [],
      },
    });
    
    render(<SystemStatus />);
    
    await waitFor(() => {
      expect(screen.getByText('No agents connected')).toBeInTheDocument();
    });
  });

  it('updates data periodically', async () => {
    const mockData1 = { ...mockSystemStatusData };
    const mockData2 = {
      ...mockSystemStatusData,
      agents: [{ ...mockSystemStatusData.agents[0], id: 'agent-2' }],
    };

    (apiClient.get as jest.Mock)
      .mockResolvedValueOnce({ data: mockData1 })
      .mockResolvedValueOnce({ data: mockData2 });

    jest.useFakeTimers();
    
    render(<SystemStatus />);
    
    await waitFor(() => {
      expect(screen.getByText('agent-1')).toBeInTheDocument();
    });

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByText('agent-2')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
