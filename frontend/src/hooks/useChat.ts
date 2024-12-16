import { useState, useCallback, useEffect, useRef } from 'react';

import { Message, ChatSession } from '../types/chat.types';

/** Props for the useChat hook */
interface UseChatProps {
  /** ID of the chat session to connect to */
  sessionId?: string;
  /** Callback for handling chat errors */
  onError?: (error: string) => void;
}

/** Return type for the useChat hook */
interface UseChatReturn {
  /** List of messages in the current chat session */
  messages: Message[];
  /** List of available chat sessions */
  sessions: ChatSession[];
  /** Loading state for async operations */
  loading: boolean;
  /** Current error message, if any */
  error: string | null;
  /** Function to send a message in the current session */
  sendMessage: (content: string) => void;
  /** Function to create a new chat session */
  createSession: (name: string) => Promise<ChatSession>;
  /** Function to delete a chat session */
  deleteSession: (chatSessionId: string) => Promise<void>;
  /** Function to refresh the list of sessions */
  refreshSessions: () => Promise<void>;
}

/**
 * Hook for managing chat sessions and messages.
 * Provides real-time messaging via WebSocket and session management via REST API.
 *
 * @param props - Hook configuration
 * @returns Object containing chat state and handlers
 */
export function useChat({ sessionId, onError }: UseChatProps = {}): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  /**
   * Handles errors by updating error state and calling the error callback.
   * @param err - Error message
   */
  const handleError = useCallback(
    (err: string): void => {
      setError(err);
      if (onError) {
        onError(err);
      }
    },
    [onError]
  );

  /**
   * Establishes and manages WebSocket connection for real-time messaging.
   * Automatically reconnects on connection loss.
   */
  const connectWebSocket = useCallback((): void => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`ws://${window.location.host}/ws/chat`);
    wsRef.current = ws;

    ws.onmessage = (event: MessageEvent): void => {
      try {
        const data = JSON.parse(event.data) as { type: string; message?: Message; error?: string };
        if (data.type === 'message' && data.message) {
          setMessages(prev => [...prev, data.message]);
        } else if (data.type === 'error' && data.error) {
          handleError(data.error);
        }
      } catch (err) {
        handleError('Failed to parse WebSocket message');
      }
    };

    ws.onerror = (): void => {
      handleError('WebSocket connection error');
    };

    ws.onclose = (): void => {
      setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
    };
  }, [handleError]);

  /**
   * Fetches messages for a specific chat session.
   * @param chatSessionId - ID of the session to fetch messages for
   */
  const fetchMessages = useCallback(
    async (chatSessionId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/chat/${chatSessionId}/messages`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = (await response.json()) as Message[];
        setMessages(data);
      } catch (err) {
        handleError(err instanceof Error ? err.message : 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  /**
   * Fetches the list of available chat sessions.
   */
  const fetchSessions = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/chat/sessions');
      if (!response.ok) {
        throw new Error('Failed to fetch chat sessions');
      }

      const data = (await response.json()) as ChatSession[];
      setSessions(data);
    } catch (err) {
      handleError(err instanceof Error ? err.message : 'Failed to fetch chat sessions');
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  /**
   * Sends a message in the current chat session.
   * @param content - Content of the message to send
   */
  const sendMessage = useCallback(
    (content: string): void => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        handleError('WebSocket connection not open');
        return;
      }

      wsRef.current.send(
        JSON.stringify({
          type: 'message',
          sessionId,
          content,
        })
      );
    },
    [sessionId, handleError]
  );

  /**
   * Creates a new chat session.
   * @param name - Name of the session to create
   * @returns The created session
   * @throws Error if creation fails
   */
  const createSession = useCallback(
    async (name: string): Promise<ChatSession> => {
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

        const session = (await response.json()) as ChatSession;
        setSessions(prev => [...prev, session]);
        return session;
      } catch (err) {
        handleError(err instanceof Error ? err.message : 'Failed to create chat session');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  /**
   * Deletes a chat session.
   * @param chatSessionId - ID of the session to delete
   * @throws Error if deletion fails
   */
  const deleteSession = useCallback(
    async (chatSessionId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/chat/sessions/${chatSessionId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete chat session');
        }

        setSessions(prev => prev.filter(s => s.id !== chatSessionId));
      } catch (err) {
        handleError(err instanceof Error ? err.message : 'Failed to delete chat session');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  // Initialize WebSocket and fetch sessions on mount
  useEffect(() => {
    void fetchSessions();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [fetchSessions, connectWebSocket]);

  // Fetch messages when session ID changes
  useEffect(() => {
    if (typeof sessionId === 'string' && sessionId.length > 0) {
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
