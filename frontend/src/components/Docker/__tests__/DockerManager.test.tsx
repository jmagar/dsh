import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { DockerManager } from '../DockerManager';

import { useDockerManager } from '@/client/hooks/useDockerManager';

// Mock the hooks and components
jest.mock('@/client/hooks/useDockerManager');
jest.mock('../../DockerContainers', () => ({
  DockerContainers: () => <div data-testid="docker-containers">Docker Containers</div>,
}));
jest.mock('../../DockerCompose', () => ({
  __esModule: true,
  default: () => <div data-testid="docker-compose">Docker Compose</div>,
}));
jest.mock('../../LogViewer', () => ({
  LogViewer: () => <div data-testid="log-viewer">Log Viewer</div>,
}));

const mockTheme = createTheme();

const mockDockerManagerData = {
  containers: [],
  loading: false,
  error: null,
  stats: {
    cpuUsage: 50,
    memoryUsage: 60,
    diskUsage: 70,
    containers: 5,
  },
  refreshing: false,
  handleRefresh: jest.fn(),
  formatPercentage: (value: number) => `${value}%`,
  clampValue: (value: number) => value,
  getStatsValue: (key: string) => mockDockerManagerData.stats[key as keyof typeof mockDockerManagerData.stats],
};

describe('DockerManager', () => {
  beforeEach(() => {
    (useDockerManager as jest.Mock).mockReturnValue(mockDockerManagerData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <Provider store={{}}>
        <ThemeProvider theme={mockTheme}>
          <DockerManager hostId="test-host" userId="test-user" />
        </ThemeProvider>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText('Docker Management')).toBeInTheDocument();
  });

  it('displays correct stats', () => {
    renderComponent();
    expect(screen.getByText('50%')).toBeInTheDocument(); // CPU Usage
    expect(screen.getByText('60%')).toBeInTheDocument(); // Memory Usage
    expect(screen.getByText('70%')).toBeInTheDocument(); // Disk Usage
  });

  it('handles tab switching', () => {
    renderComponent();
    
    // Initially shows Containers tab
    expect(screen.getByTestId('docker-containers')).toBeInTheDocument();
    
    // Switch to Compose tab
    fireEvent.click(screen.getByText('Compose'));
    expect(screen.getByTestId('docker-compose')).toBeInTheDocument();
    
    // Switch to Logs tab
    fireEvent.click(screen.getByText('Logs'));
    expect(screen.getByTestId('log-viewer')).toBeInTheDocument();
  });

  it('handles refresh button click', async () => {
    renderComponent();
    
    const refreshButton = screen.getByTitle('Refresh');
    fireEvent.click(refreshButton);
    
    expect(mockDockerManagerData.handleRefresh).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    (useDockerManager as jest.Mock).mockReturnValue({
      ...mockDockerManagerData,
      loading: true,
    });
    
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Test error';
    (useDockerManager as jest.Mock).mockReturnValue({
      ...mockDockerManagerData,
      error: errorMessage,
    });
    
    renderComponent();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('opens and closes settings menu', () => {
    renderComponent();
    
    // Open menu
    const settingsButton = screen.getByTitle('Settings');
    fireEvent.click(settingsButton);
    
    expect(screen.getByText('Restart Docker')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.queryByText('Restart Docker')).not.toBeInTheDocument();
  });
});
