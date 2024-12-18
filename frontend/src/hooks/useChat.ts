import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeSession,
  createSession,
  selectActiveSessionId,
  selectChatError,
  selectChatLoading,
  selectChatSessions,
  sendMessage,
  setActiveSession,
} from '../store/slices/chatSlice';
import type { RootState } from '../store/store';

import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

export const useChat = () => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state: RootState) => selectChatSessions(state));
  const activeSessionId = useAppSelector((state: RootState) => selectActiveSessionId(state));
  const loading = useAppSelector((state: RootState) => selectChatLoading(state));
  const error = useAppSelector((state: RootState) => selectChatError(state));

  const handleCreateSession = useCallback(async () => {
    try {
      logger.info('Creating chat session', createLogMetadata('chat-hook', undefined, {
        message: 'Creating new chat session'
      }));
      const result = await dispatch(createSession()).unwrap();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during session creation');
      logger.error('Chat session creation failed', createLogMetadata('chat-hook', error, {
        message: 'Failed to create new chat session'
      }));
      throw error;
    }
  }, [dispatch]);

  const handleCloseSession = useCallback(async (sessionId: string) => {
    try {
      logger.info('Closing chat session', createLogMetadata('chat-hook', undefined, {
        message: `Closing chat session ${sessionId}`
      }));
      await dispatch(closeSession(sessionId)).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during session closure');
      logger.error('Chat session closure failed', createLogMetadata('chat-hook', error, {
        message: `Failed to close chat session ${sessionId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleSendMessage = useCallback(async (sessionId: string, content: string) => {
    try {
      logger.info('Sending chat message', createLogMetadata('chat-hook', undefined, {
        message: `Sending message to session ${sessionId}`
      }));
      await dispatch(sendMessage({ sessionId, content })).unwrap();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error during message send');
      logger.error('Chat message send failed', createLogMetadata('chat-hook', error, {
        message: `Failed to send message to session ${sessionId}`
      }));
      throw error;
    }
  }, [dispatch]);

  const handleSetActiveSession = useCallback((sessionId: string | null) => {
    dispatch(setActiveSession(sessionId));
    logger.info('Active chat session changed', createLogMetadata('chat-hook', undefined, {
      message: `Set active session to ${sessionId}`
    }));
  }, [dispatch]);

  return {
    sessions,
    activeSessionId,
    loading,
    error,
    createSession: handleCreateSession,
    closeSession: handleCloseSession,
    sendMessage: handleSendMessage,
    setActiveSession: handleSetActiveSession,
  } as const;
}; 