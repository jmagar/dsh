import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { AgentConnectionManager } from '../AgentConnectionManager';
import { useAgentConnections } from '@/client/hooks/useAgentConnections';

jest.mock('@/client/hooks/useAgentConnections');

const mockConnections = [
  {
    id: '1',
    name: 'Test Agent 1',
    host: 'test1.example.com',
    port: 22,
    status: 'connected',
    lastConnected: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Test Agent 2',
    host: 'test2.example.com',
    port: 22,
    status: 'disconnected',
    lastConnected: null,
  },
];

const mockUseAgentConnections = useAgentConnections as jest.MockedFunction<typeof useAgentConnections>;

describe('AgentConnectionManager', () => {
  const theme = createTheme();

  beforeEach(() => {
    mockUseAgentConnections.mockReturnValue({
      connections: mockConnections,
      loading: false,
      error: null,
      connectAgent: jest.fn(),
      disconnectAgent: jest.fn(),
      testConnection: jest.fn(),
      refreshConnections: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );
    expect(screen.getByText('Agent Connections')).toBeInTheDocument();
  });

  it('displays connection list correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Agent 1')).toBeInTheDocument();
    expect(screen.getByText('test1.example.com')).toBeInTheDocument();
    expect(screen.getByText('connected')).toBeInTheDocument();
  });

  it('handles add agent dialog', async () => {
    const mockConnectAgent = jest.fn();
    mockUseAgentConnections.mockReturnValue({
      connections: mockConnections,
      loading: false,
      error: null,
      connectAgent: mockConnectAgent,
      disconnectAgent: jest.fn(),
      testConnection: jest.fn(),
      refreshConnections: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    // Open add dialog
    fireEvent.click(screen.getByText('Add Agent'));
    expect(screen.getByText('Add Agent Connection')).toBeInTheDocument();

    // Fill form
    fireEvent.change(screen.getByLabelText('Agent Name'), {
      target: { value: 'New Agent' },
    });
    fireEvent.change(screen.getByLabelText('Host'), {
      target: { value: 'new.example.com' },
    });
    fireEvent.change(screen.getByLabelText('Port'), {
      target: { value: '22' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Add Agent'));

    await waitFor(() => {
      expect(mockConnectAgent).toHaveBeenCalledWith({
        name: 'New Agent',
        host: 'new.example.com',
        port: 22,
        apiKey: '',
        sshKey: '',
      });
    });
  });

  it('handles disconnect agent', async () => {
    const mockDisconnectAgent = jest.fn();
    mockUseAgentConnections.mockReturnValue({
      connections: mockConnections,
      loading: false,
      error: null,
      connectAgent: jest.fn(),
      disconnectAgent: mockDisconnectAgent,
      testConnection: jest.fn(),
      refreshConnections: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    // Click disconnect button for the first agent
    const disconnectButton = screen.getByTitle('Disconnect');
    fireEvent.click(disconnectButton);

    await waitFor(() => {
      expect(mockDisconnectAgent).toHaveBeenCalledWith('1');
    });
  });

  it('handles test connection', async () => {
    const mockTestConnection = jest.fn().mockResolvedValue({ success: true });
    mockUseAgentConnections.mockReturnValue({
      connections: mockConnections,
      loading: false,
      error: null,
      connectAgent: jest.fn(),
      disconnectAgent: jest.fn(),
      testConnection: mockTestConnection,
      refreshConnections: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    // Open add dialog
    fireEvent.click(screen.getByText('Add Agent'));

    // Fill form
    fireEvent.change(screen.getByLabelText('Agent Name'), {
      target: { value: 'Test Agent' },
    });
    fireEvent.change(screen.getByLabelText('Host'), {
      target: { value: 'test.example.com' },
    });
    fireEvent.change(screen.getByLabelText('Port'), {
      target: { value: '22' },
    });

    // Test connection
    fireEvent.click(screen.getByText('Test Connection'));

    await waitFor(() => {
      expect(mockTestConnection).toHaveBeenCalledWith({
        name: 'Test Agent',
        host: 'test.example.com',
        port: 22,
        apiKey: '',
        sshKey: '',
      });
    });

    expect(screen.getByText('Connection test successful')).toBeInTheDocument();
  });

  it('handles error state', () => {
    mockUseAgentConnections.mockReturnValue({
      connections: [],
      loading: false,
      error: 'Failed to fetch connections',
      connectAgent: jest.fn(),
      disconnectAgent: jest.fn(),
      testConnection: jest.fn(),
      refreshConnections: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    expect(screen.getByText('Failed to fetch connections')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseAgentConnections.mockReturnValue({
      connections: [],
      loading: true,
      error: null,
      connectAgent: jest.fn(),
      disconnectAgent: jest.fn(),
      testConnection: jest.fn(),
      refreshConnections: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('validates form fields', () => {
    render(
      <ThemeProvider theme={theme}>
        <AgentConnectionManager />
      </ThemeProvider>
    );

    // Open add dialog
    fireEvent.click(screen.getByText('Add Agent'));

    // Add Agent button should be disabled initially
    expect(screen.getByText('Add Agent')).toBeDisabled();

    // Fill form with valid data
    fireEvent.change(screen.getByLabelText('Agent Name'), {
      target: { value: 'Test Agent' },
    });
    fireEvent.change(screen.getByLabelText('Host'), {
      target: { value: 'test.example.com' },
    });
    fireEvent.change(screen.getByLabelText('Port'), {
      target: { value: '22' },
    });

    // Add Agent button should be enabled
    expect(screen.getByText('Add Agent')).toBeEnabled();
  });
});
