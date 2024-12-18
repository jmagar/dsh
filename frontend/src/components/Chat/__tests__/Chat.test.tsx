import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { Chat } from '../Chat';

import { useChat } from '@/client/hooks/useChat';

jest.mock('@/client/hooks/useChat');

const mockMessages = [
  {
    id: '1',
    role: 'user',
    content: 'Hello',
    timestamp: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Hi there!',
    timestamp: '2023-01-01T00:00:01Z',
  },
];

const mockSessions = [
  {
    id: '1',
    name: 'Test Session 1',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Test Session 2',
    createdAt: '2023-01-01T00:00:01Z',
  },
];

const mockUseChat = useChat as jest.MockedFunction<typeof useChat>;

describe('Chat', () => {
  const theme = createTheme();

  beforeEach(() => {
    mockUseChat.mockReturnValue({
      messages: mockMessages,
      sessions: mockSessions,
      loading: false,
      error: null,
      sendMessage: jest.fn(),
      createSession: jest.fn(),
      deleteSession: jest.fn(),
      refreshSessions: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    );
    expect(screen.getByText('Chat Sessions')).toBeInTheDocument();
  });

  it('displays sessions and messages', () => {
    render(
      <ThemeProvider theme={theme}>
        <Chat initialSessionId="1" />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Session 1')).toBeInTheDocument();
    expect(screen.getByText('Test Session 2')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('handles session creation', async () => {
    const mockCreateSession = jest.fn().mockResolvedValue({
      id: '3',
      name: 'New Session',
      createdAt: '2023-01-01T00:00:02Z',
    });

    mockUseChat.mockReturnValue({
      messages: [],
      sessions: mockSessions,
      loading: false,
      error: null,
      sendMessage: jest.fn(),
      createSession: mockCreateSession,
      deleteSession: jest.fn(),
      refreshSessions: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    );

    // Open create dialog
    fireEvent.click(screen.getByTitle('New Chat'));

    // Fill form
    fireEvent.change(screen.getByLabelText('Session Name'), {
      target: { value: 'New Session' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockCreateSession).toHaveBeenCalledWith('New Session');
    });
  });

  it('handles session deletion', async () => {
    const mockDeleteSession = jest.fn().mockResolvedValue(undefined);

    mockUseChat.mockReturnValue({
      messages: [],
      sessions: mockSessions,
      loading: false,
      error: null,
      sendMessage: jest.fn(),
      createSession: jest.fn(),
      deleteSession: mockDeleteSession,
      refreshSessions: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <Chat initialSessionId="1" />
      </ThemeProvider>
    );

    // Click delete button
    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockDeleteSession).toHaveBeenCalledWith('1');
    });
  });

  it('handles message sending', async () => {
    const mockSendMessage = jest.fn();

    mockUseChat.mockReturnValue({
      messages: mockMessages,
      sessions: mockSessions,
      loading: false,
      error: null,
      sendMessage: mockSendMessage,
      createSession: jest.fn(),
      deleteSession: jest.fn(),
      refreshSessions: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <Chat initialSessionId="1" />
      </ThemeProvider>
    );

    // Type message
    fireEvent.change(screen.getByPlaceholderText('Type your message...'), {
      target: { value: 'New message' },
    });

    // Send message
    fireEvent.click(screen.getByTitle('Send message'));

    expect(mockSendMessage).toHaveBeenCalledWith('New message');
  });

  it('handles error state', () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sessions: [],
      loading: false,
      error: 'Test error',
      sendMessage: jest.fn(),
      createSession: jest.fn(),
      deleteSession: jest.fn(),
      refreshSessions: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sessions: [],
      loading: true,
      error: null,
      sendMessage: jest.fn(),
      createSession: jest.fn(),
      deleteSession: jest.fn(),
      refreshSessions: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <Chat />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
