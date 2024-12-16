import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';
import { ChatSession, Message } from '@/client/types/chat.types';

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

const mockSessions: ChatSession[] = [
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

// Mock WebSocket
class MockWebSocket {
  onmessage: ((event: MessageEvent) => void) | null = null;
  send = jest.fn();
  close = jest.fn();

  constructor(url: string) {}

  simulateMessage(data: any) {
    if (this.onmessage) {
      this.onmessage(new MessageEvent('message', { data: JSON.stringify(data) }));
    }
  }
}

global.WebSocket = MockWebSocket as any;

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    fetch.resetMocks();
  });

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(result.current.sessions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('loads sessions on mount', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockSessions));

    const { result, waitForNextUpdate } = renderHook(() => useChat());
    await waitForNextUpdate();

    expect(result.current.sessions).toEqual(mockSessions);
  });

  it('handles session creation', async () => {
    const newSession = {
      id: '3',
      name: 'New Session',
      createdAt: '2023-01-01T00:00:02Z',
    };

    fetch.mockResponseOnce(JSON.stringify(newSession));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.createSession('New Session');
    });

    expect(fetch).toHaveBeenCalledWith('/api/chat/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'New Session' }),
    });
  });

  it('handles session deletion', async () => {
    fetch.mockResponseOnce('');

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.deleteSession('1');
    });

    expect(fetch).toHaveBeenCalledWith('/api/chat/sessions/1', {
      method: 'DELETE',
    });
  });

  it('handles message sending', async () => {
    const { result } = renderHook(() => useChat());
    const ws = new MockWebSocket('');

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ type: 'message', content: 'Hello' })
    );
  });

  it('handles WebSocket messages', async () => {
    const { result } = renderHook(() => useChat());
    const ws = new MockWebSocket('');

    act(() => {
      (ws as any).simulateMessage({
        type: 'message',
        data: mockMessages[0],
      });
    });

    expect(result.current.messages).toContainEqual(mockMessages[0]);
  });

  it('handles errors', async () => {
    fetch.mockRejectOnce(new Error('Network error'));

    const { result, waitForNextUpdate } = renderHook(() => useChat());
    await waitForNextUpdate();

    expect(result.current.error).toBe('Network error');
  });

  it('cleans up WebSocket on unmount', () => {
    const { unmount } = renderHook(() => useChat());
    const ws = new MockWebSocket('');

    unmount();

    expect(ws.close).toHaveBeenCalled();
  });
});
