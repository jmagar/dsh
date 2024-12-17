import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { connectToAgent, disconnectFromAgent, refreshAgentConnections } from '../../services/api';
import type { AgentConnection } from '../../components/AgentManager/types';
import type { RootState } from '../types';

export interface AgentState {
  connections: AgentConnection[];
  selectedAgentId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  connections: [],
  selectedAgentId: null,
  loading: false,
  error: null,
};

export const connectAgent = createAsyncThunk(
  'agents/connect',
  async (agent: AgentConnection, { rejectWithValue }) => {
    try {
      return await connectToAgent(agent);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to connect agent');
    }
  }
);

export const disconnectAgent = createAsyncThunk(
  'agents/disconnect',
  async (agentId: string, { rejectWithValue }) => {
    try {
      await disconnectFromAgent(agentId);
      return agentId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to disconnect agent');
    }
  }
);

export const refreshAgents = createAsyncThunk(
  'agents/refresh',
  async (_, { rejectWithValue }) => {
    try {
      return await refreshAgentConnections();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh agents');
    }
  }
);

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedAgent: (state, action: PayloadAction<string | null>) => {
      state.selectedAgentId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Connect agent cases
      .addCase(connectAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectAgent.fulfilled, (state, action) => {
        state.connections.push(action.payload);
        state.loading = false;
      })
      .addCase(connectAgent.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Disconnect agent cases
      .addCase(disconnectAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disconnectAgent.fulfilled, (state, action) => {
        state.connections = state.connections.filter(agent => agent.id !== action.payload);
        if (state.selectedAgentId === action.payload) {
          state.selectedAgentId = null;
        }
        state.loading = false;
      })
      .addCase(disconnectAgent.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Refresh agents cases
      .addCase(refreshAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAgents.fulfilled, (state, action) => {
        state.connections = action.payload;
        state.loading = false;
      })
      .addCase(refreshAgents.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Selectors
export const selectAgentState = (state: RootState) => state.agents;

export const selectAgentConnections = (state: RootState) => selectAgentState(state).connections;

export const selectSelectedAgentId = (state: RootState) => selectAgentState(state).selectedAgentId;

export const selectAgentLoading = (state: RootState) => selectAgentState(state).loading;

export const selectAgentError = (state: RootState) => selectAgentState(state).error;

export const { setSelectedAgent, clearError } = agentSlice.actions;
export const agentReducer = agentSlice.reducer;
export default agentSlice.reducer; 