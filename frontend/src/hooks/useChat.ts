import { useState, useCallback, useEffect, useRef } from 'react';
import { Message, ChatSession } from '@/client/types/chat.types';

interface UseChatProps {
  sessionId?: string;
  onError?: (error: string) => void;
}

export function useChat({ sessionId, onError }: UseChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const handleError = useCallback((err: string) => {
    setError(err);
    onError?.(err);
  }, [onError]);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`ws://${window.location.host}/ws/chat`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          setMessages((prev) => [...prev, data.message]);
        } else if (data.type === 'error') {
          handleError(data.error);
        }
      } catch (err) {
        handleError('Failed to parse WebSocket message');
      }
    };

    ws.onerror = () => {
      handleError('WebSocket connection error');
    };

    ws.onclose = () => {
      setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
    };
  }, [handleError]);

  const fetchMessages = useCallback(async (chatSessionId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/chat/${chatSessionId}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/chat/sessions');
      if (!response.ok) {
        throw new Error('Failed to fetch chat sessions');
      }

      const data = await response.json();
      setSessions(data);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to fetch chat sessions');
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      handleError('WebSocket connection not open');
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'message',
      sessionId,
      content,
    }));
  }, [sessionId, handleError]);

  const createSession = useCallback(async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat session');
      }

      const session = await response.json();
      setSessions((prev) => [...prev, session]);
      return session;
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to create chat session');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const deleteSession = useCallback(async (chatSessionId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/chat/sessions/${chatSessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat session');
      }

      setSessions((prev) => prev.filter((s) => s.id !== chatSessionId));
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to delete chat session');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    void fetchSessions();
    connectWebSocket();

    return () => {
      wsRef.current?.close();
    };
  }, [fetchSessions, connectWebSocket]);

  useEffect(() => {
    if (sessionId) {
      void fetchMessages(sessionId);
    }
  }, [sessionId, fetchMessages]);

  return {
    messages,
    sessions,
    loading,
    error,
    sendMessage,
    createSession,
    deleteSession,
    refreshSessions: fetchSessions,
  };
}
