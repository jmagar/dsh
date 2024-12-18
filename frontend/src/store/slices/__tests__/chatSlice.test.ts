import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';

import type { RootState } from '../../types';
import {
  chatReducer,
  sendMessage,
  startSession,
  setActiveSession,
  clearError,
} from '../chatSlice';

describe('chatSlice', () => {
  let store: ReturnType<typeof configureStore> & {
    dispatch: ThunkDispatch<RootState, unknown, Action>;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        chat: chatReducer,
      },
    }) as typeof store;
  });

  describe('reducers', () => {
    it('should handle setActiveSession', () => {
      const sessionId = 'test-session-1';
      
      // Initial state should be null
      const initialState = store.getState() as RootState;
      expect(initialState.chat.activeSessionId).toBeNull();

      // Set active session
      store.dispatch(setActiveSession(sessionId));
      const activeState = store.getState() as RootState;
      expect(activeState.chat.activeSessionId).toBe(sessionId);

      // Clear active session
      store.dispatch(setActiveSession(null));
      const clearedState = store.getState() as RootState;
      expect(clearedState.chat.activeSessionId).toBeNull();
    });

    it('should handle clearError', () => {
      // First set an error using a rejected action
      store.dispatch(sendMessage.rejected(new Error('Test error'), 'sendMessage', { sessionId: 'test', content: 'test' }));
      const errorState = store.getState() as RootState;
      expect(errorState.chat.error).toBeTruthy();

      // Clear the error
      store.dispatch(clearError());
      const clearedState = store.getState() as RootState;
      expect(clearedState.chat.error).toBeNull();
    });
  });

  describe('async actions', () => {
    describe('startSession', () => {
      const agentId = 'test-agent-1';

      it('should handle pending state', () => {
        store.dispatch(startSession.pending('startSession', agentId));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(true);
        expect(state.chat.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        const mockSession = {
          id: 'session-1',
          agentId,
          messages: [],
          isActive: true,
        };

        store.dispatch(startSession.fulfilled(mockSession, 'startSession', agentId));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(false);
        expect(state.chat.error).toBeNull();
        expect(state.chat.sessions[mockSession.id]).toEqual(mockSession);
        expect(state.chat.activeSessionId).toBe(mockSession.id);
      });

      it('should handle rejected state', () => {
        const error = 'Failed to start session';
        store.dispatch(startSession.rejected(new Error(error), 'startSession', agentId));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(false);
        expect(state.chat.error).toBe(error);
      });
    });

    describe('sendMessage', () => {
      const sessionId = 'test-session-1';
      const content = 'Hello, agent!';

      beforeEach(() => {
        // Set up initial state with an active session
        const mockSession = {
          id: sessionId,
          agentId: 'test-agent-1',
          messages: [],
          isActive: true,
        };
        store.dispatch(startSession.fulfilled(mockSession, 'startSession', mockSession.agentId));
      });

      it('should handle pending state', () => {
        store.dispatch(sendMessage.pending('sendMessage', { sessionId, content }));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(true);
        expect(state.chat.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        const mockMessage = {
          id: 'msg-1',
          content,
          sender: 'user',
          timestamp: new Date().toISOString(),
          status: 'sent',
        } as const;

        store.dispatch(sendMessage.fulfilled({ sessionId, message: mockMessage }, 'sendMessage', { sessionId, content }));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(false);
        expect(state.chat.error).toBeNull();
        expect(state.chat.sessions[sessionId].messages).toHaveLength(1);
        expect(state.chat.sessions[sessionId].messages[0]).toEqual(mockMessage);
      });

      it('should handle rejected state', () => {
        const error = 'Failed to send message';
        store.dispatch(sendMessage.rejected(new Error(error), 'sendMessage', { sessionId, content }));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(false);
        expect(state.chat.error).toBe(error);
      });

      it('should not add message if session does not exist', () => {
        const mockMessage = {
          id: 'msg-1',
          content,
          sender: 'user',
          timestamp: new Date().toISOString(),
          status: 'sent',
        } as const;

        store.dispatch(sendMessage.fulfilled(
          { sessionId: 'non-existent', message: mockMessage },
          'sendMessage',
          { sessionId: 'non-existent', content }
        ));
        const state = store.getState() as RootState;
        expect(state.chat.loading).toBe(false);
        expect(state.chat.error).toBeNull();
        expect(state.chat.sessions[sessionId].messages).toHaveLength(0);
      });
    });
  });
}); 