import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { DockerStats } from '../DockerStats';
import { useDockerStats } from '@/client/hooks/useDockerStats';

// Mock the hooks
jest.mock('@/client/hooks/useDockerStats');
jest.mock('recharts', () => ({
  LineChart: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
}));

const mockStats = {
  'container1': {
    cpuUsage: [0, 1, 2, 3],
    memoryUsage: [1024, 2048, 3072, 4096],
    networkRx: [100, 200, 300, 400],
    networkTx: [50, 100, 150, 200],
    timestamp: [1000, 2000, 3000, 4000],
  },
  'container2': {
    cpuUsage: [1, 2, 3, 4],
    memoryUsage: [2048, 3072, 4096, 5120],
    networkRx: [200, 300, 400, 500],
    networkTx: [100, 150, 200, 250],
    timestamp: [1000, 2000, 3000, 4000],
  },
};

const mockUseDockerStats = useDockerStats as jest.MockedFunction<typeof useDockerStats>;

describe('DockerStats', () => {
  const theme = createTheme();

  beforeEach(() => {
    mockUseDockerStats.mockReturnValue({
      stats: mockStats,
      loading: false,
      error: null,
      clearStats: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );
    expect(screen.getByText('Container Stats')).toBeInTheDocument();
  });

  it('displays container stats correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    // Check for container IDs
    expect(screen.getByText('container1'.substring(0, 12))).toBeInTheDocument();
    expect(screen.getByText('container2'.substring(0, 12))).toBeInTheDocument();

    // Check for stat labels
    expect(screen.getAllByText('CPU Usage')).toHaveLength(2);
    expect(screen.getAllByText('Memory Usage')).toHaveLength(2);
    expect(screen.getAllByText('Network RX')).toHaveLength(2);
    expect(screen.getAllByText('Network TX')).toHaveLength(2);
  });

  it('handles error state', () => {
    const errorMessage = 'Test error message';
    mockUseDockerStats.mockReturnValue({
      stats: {},
      loading: false,
      error: errorMessage,
      clearStats: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseDockerStats.mockReturnValue({
      stats: {},
      loading: true,
      error: null,
      clearStats: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls clearStats when clear button is clicked', () => {
    const mockClearStats = jest.fn();
    mockUseDockerStats.mockReturnValue({
      stats: mockStats,
      loading: false,
      error: null,
      clearStats: mockClearStats,
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    const clearButton = screen.getByTitle('Clear stats');
    fireEvent.click(clearButton);

    expect(mockClearStats).toHaveBeenCalled();
  });

  it('formats memory values correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    // Check for formatted memory values
    expect(screen.getByText('4 KB')).toBeInTheDocument(); // 4096 bytes
    expect(screen.getByText('5 KB')).toBeInTheDocument(); // 5120 bytes
  });

  it('updates with new data', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    const updatedStats = {
      'container1': {
        ...mockStats.container1,
        cpuUsage: [5, 6, 7, 8],
      },
    };

    mockUseDockerStats.mockReturnValue({
      stats: updatedStats,
      loading: false,
      error: null,
      clearStats: jest.fn(),
    });

    rerender(
      <ThemeProvider theme={theme}>
        <DockerStats hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('8.00%')).toBeInTheDocument();
  });
});
