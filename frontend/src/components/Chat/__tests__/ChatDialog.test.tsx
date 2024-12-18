import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { ChatDialog } from '../ChatDialog';

import { Message } from '@/client/types/chat.types';

describe('ChatDialog', () => {
  const theme = createTheme();
  const mockMessages: Message[] = [
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

  const mockSendMessage = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <ChatDialog
          messages={mockMessages}
          onSendMessage={mockSendMessage}
          {...props}
        />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders messages correctly', () => {
    renderComponent();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('handles message sending', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByTitle('Send message');

    fireEvent.change(input, { target: { value: 'New message' } });
    fireEvent.click(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('New message');
    expect(input).toHaveValue('');
  });

  it('handles enter key press', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Type your message...');

    fireEvent.change(input, { target: { value: 'New message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockSendMessage).toHaveBeenCalledWith('New message');
    expect(input).toHaveValue('');
  });

  it('prevents sending empty messages', () => {
    renderComponent();
    const sendButton = screen.getByTitle('Send message');

    fireEvent.click(sendButton);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('displays loading state', () => {
    renderComponent({ loading: true });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error state', () => {
    renderComponent({ error: 'Test error' });
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('disables input and send button while loading', () => {
    renderComponent({ loading: true });
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByTitle('Send message');

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });
});
