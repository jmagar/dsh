import { render, screen } from '@testing-library/react';
import React from 'react';

import { AgentStatusCard } from './AgentStatusCard';

const mockAgent = {
  id: 'test-agent-1',
  connected: true,
  lastSeen: '2024-12-15T21:00:00Z',
  osInfo: {
    os: 'Windows',
    platform: 'win32',
    arch: 'x64',
  },
};

const mockMetrics = {
  metrics: {
    cpuUsage: 45.67,
    memoryUsage: 78.90,
    diskUsage: 23.45,
  },
};

describe('AgentStatusCard', () => {
  it('renders agent information correctly', () => {
    render(<AgentStatusCard agent={mockAgent} metrics={mockMetrics} />);
    
    expect(screen.getByText(mockAgent.id)).toBeInTheDocument();
    expect(screen.getByText('CPU Usage: 45.67%')).toBeInTheDocument();
    expect(screen.getByText('Memory Usage: 78.90%')).toBeInTheDocument();
    expect(screen.getByText('Disk Usage: 23.45%')).toBeInTheDocument();
    expect(screen.getByText(`OS: ${mockAgent.osInfo.os} (${mockAgent.osInfo.platform} ${mockAgent.osInfo.arch})`)).toBeInTheDocument();
  });

  it('shows success icon when agent is connected', () => {
    render(<AgentStatusCard agent={mockAgent} metrics={mockMetrics} />);
    const icon = document.querySelector('svg[data-testid="ComputerIcon"]');
    expect(icon).toHaveClass('MuiSvgIcon-colorSuccess');
  });

  it('shows error icon when agent is disconnected', () => {
    const disconnectedAgent = { ...mockAgent, connected: false };
    render(<AgentStatusCard agent={disconnectedAgent} metrics={mockMetrics} />);
    const icon = document.querySelector('svg[data-testid="ComputerIcon"]');
    expect(icon).toHaveClass('MuiSvgIcon-colorError');
  });

  it('handles null metrics gracefully', () => {
    render(<AgentStatusCard agent={mockAgent} metrics={null} />);
    
    expect(screen.getByText('CPU Usage: 0.00%')).toBeInTheDocument();
    expect(screen.getByText('Memory Usage: 0.00%')).toBeInTheDocument();
    expect(screen.getByText('Disk Usage: 0.00%')).toBeInTheDocument();
  });

  it('formats last seen date correctly', () => {
    render(<AgentStatusCard agent={mockAgent} metrics={mockMetrics} />);
    
    const date = new Date(mockAgent.lastSeen);
    expect(screen.getByText(`Last seen: ${date.toLocaleString()}`)).toBeInTheDocument();
  });
});
