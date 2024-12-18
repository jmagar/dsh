import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, ChatSession, ChatMessage } from '../types';
import { chatClient } from '../../services/chat.client';

const initialState: ChatState = {
  sessions: {},
  activeSessionId: null,
  loading: false,
  error: null,
};

export const fetchSessions = createAsyncThunk(
  'chat/fetchSessions',
  async () => {
    const response = await chatClient.getSessions();
    return response.data;
  }
);

export const createSession = createAsyncThunk(
  'chat/createSession',
  async () => {
    const response = await chatClient.createSession();
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ sessionId, content }: { sessionId: string; content: string }) => {
    const response = await chatClient.sendMessage(sessionId, content);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveSession: (state, action: PayloadAction<string | null>) => {
      state.activeSessionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action: PayloadAction<ChatSession[]>) => {
        state.loading = false;
        state.sessions = action.payload.reduce((acc, session) => {
          acc[session.id] = session;
          return acc;
        }, {} as Record<string, ChatSession>);
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sessions';
      })
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action: PayloadAction<ChatSession>) => {
        state.loading = false;
        state.sessions[action.payload.id] = action.payload;
        state.activeSessionId = action.payload.id;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create session';
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<{ sessionId: string; message: ChatMessage }>) => {
        state.loading = false;
        const { sessionId, message } = action.payload;
        if (state.sessions[sessionId]) {
          state.sessions[sessionId].messages.push(message);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send message';
      });
  },
});

export const { setActiveSession } = chatSlice.actions;
export default chatSlice.reducer;

// Selectors
export const selectSessions = (state: { chat: ChatState }) => Object.values(state.chat.sessions);
export const selectActiveSession = (state: { chat: ChatState }) => 
  state.chat.activeSessionId ? state.chat.sessions[state.chat.activeSessionId] : null;
export const selectChatLoading = (state: { chat: ChatState }) => state.chat.loading;
export const selectChatError = (state: { chat: ChatState }) => state.chat.error; 