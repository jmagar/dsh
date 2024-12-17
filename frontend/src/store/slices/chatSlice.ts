import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
  status: 'sending' | 'sent' | 'error';
}

interface ChatSession {
  id: string;
  agentId: string;
  messages: ChatMessage[];
  isActive: boolean;
}

export interface ChatState {
  sessions: Record<string, ChatSession>;
  activeSessionId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  sessions: {},
  activeSessionId: null,
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ sessionId, content }: { sessionId: string; content: string }, { rejectWithValue }) => {
    try {
      // TODO: Implement API call
      const message: ChatMessage = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date().toISOString(),
        status: 'sent',
      };
      return { sessionId, message };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send message');
    }
  }
);

export const startSession = createAsyncThunk(
  'chat/startSession',
  async (agentId: string, { rejectWithValue }) => {
    try {
      // TODO: Implement API call
      const session: ChatSession = {
        id: Date.now().toString(),
        agentId,
        messages: [],
        isActive: true,
      };
      return session;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to start session');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveSession: (state, action: PayloadAction<string | null>) => {
      state.activeSessionId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { sessionId, message } = action.payload;
        if (state.sessions[sessionId]) {
          state.sessions[sessionId].messages.push(message);
        }
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Start session
      .addCase(startSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        const session = action.payload;
        state.sessions[session.id] = session;
        state.activeSessionId = session.id;
        state.loading = false;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Selectors
export const selectChatState = (state: RootState) => state.chat;

export const selectSessions = (state: RootState) => selectChatState(state).sessions;

export const selectActiveSessionId = (state: RootState) => selectChatState(state).activeSessionId;

export const selectActiveSession = (state: RootState) => {
  const activeId = selectActiveSessionId(state);
  return activeId ? selectSessions(state)[activeId] : null;
};

export const selectChatLoading = (state: RootState) => selectChatState(state).loading;

export const selectChatError = (state: RootState) => selectChatState(state).error;

export const { setActiveSession, clearError } = chatSlice.actions;
export const chatReducer = chatSlice.reducer; 