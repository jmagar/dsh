import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

import { LogViewer } from '../LogViewer';

import { useLogViewer } from '@/client/hooks/useLogViewer';

// Mock the hooks
jest.mock('@/client/hooks/useLogViewer');
jest.mock('react-virtualized-auto-sizer', () => ({
  __esModule: true,
  default: ({ children }: any) => children({ width: 1000, height: 500 }),
}));

const mockLogs = [
  {
    timestamp: '2023-01-01T00:00:00Z',
    level: 'info',
    message: 'Test info message',
    source: 'container1',
  },
  {
    timestamp: '2023-01-01T00:00:01Z',
    level: 'warn',
    message: 'Test warning message',
    source: 'container2',
  },
  {
    timestamp: '2023-01-01T00:00:02Z',
    level: 'error',
    message: 'Test error message',
    source: 'container3',
  },
];

const mockUseLogViewer = useLogViewer as jest.MockedFunction<typeof useLogViewer>;

describe('LogViewer', () => {
  const theme = createTheme();

  beforeEach(() => {
    mockUseLogViewer.mockReturnValue({
      logs: mockLogs,
      loading: false,
      error: null,
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      clearLogs: jest.fn(),
      filterLogs: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );
    expect(screen.getByText('Logs')).toBeInTheDocument();
  });

  it('displays logs correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test info message')).toBeInTheDocument();
    expect(screen.getByText('Test warning message')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('handles error state', () => {
    mockUseLogViewer.mockReturnValue({
      logs: [],
      loading: false,
      error: 'Test error',
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      clearLogs: jest.fn(),
      filterLogs: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseLogViewer.mockReturnValue({
      logs: [],
      loading: true,
      error: null,
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      clearLogs: jest.fn(),
      filterLogs: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('toggles filters', () => {
    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    const filterButton = screen.getByTitle('Toggle filters');
    fireEvent.click(filterButton);

    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('calls subscribe on mount and unsubscribe on unmount', () => {
    const mockSubscribe = jest.fn();
    const mockUnsubscribe = jest.fn();

    mockUseLogViewer.mockReturnValue({
      logs: [],
      loading: false,
      error: null,
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      clearLogs: jest.fn(),
      filterLogs: jest.fn(),
    });

    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(mockSubscribe).toHaveBeenCalledWith(['host1'], { level: 'info' });

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledWith(['host1']);
  });

  it('handles auto-scroll toggle', () => {
    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    const autoScrollCheckbox = screen.getByRole('checkbox', { name: /auto-scroll/i });
    expect(autoScrollCheckbox).toBeChecked();

    fireEvent.click(autoScrollCheckbox);
    expect(autoScrollCheckbox).not.toBeChecked();
  });

  it('calls clearLogs when clear button is clicked', () => {
    const mockClearLogs = jest.fn();
    mockUseLogViewer.mockReturnValue({
      logs: mockLogs,
      loading: false,
      error: null,
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      clearLogs: mockClearLogs,
      filterLogs: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    const clearButton = screen.getByTitle('Clear logs');
    fireEvent.click(clearButton);

    expect(mockClearLogs).toHaveBeenCalled();
  });

  it('calls filterLogs when level filters are changed', () => {
    const mockFilterLogs = jest.fn();
    mockUseLogViewer.mockReturnValue({
      logs: mockLogs,
      loading: false,
      error: null,
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      clearLogs: jest.fn(),
      filterLogs: mockFilterLogs,
    });

    render(
      <ThemeProvider theme={theme}>
        <LogViewer hostIds={['host1']} />
      </ThemeProvider>
    );

    // Toggle filters
    const filterButton = screen.getByTitle('Toggle filters');
    fireEvent.click(filterButton);

    // Click info filter
    const infoCheckbox = screen.getByRole('checkbox', { name: /info/i });
    fireEvent.click(infoCheckbox);

    expect(mockFilterLogs).toHaveBeenCalledWith({ level: 'info' });
  });
});
