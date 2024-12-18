import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { agentClient } from '../../services/agent.client';
import type { AgentState, AgentConnection } from '../types';
import type { RootState } from '../store';

const initialState: AgentState = {
  connections: {},
  selectedAgentId: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async () => {
    const response = await agentClient.getAgents();
    return response.data;
  }
);

export const connectAgent = createAsyncThunk(
  'agents/connectAgent',
  async (agentId: string) => {
    const response = await agentClient.connectAgent(agentId);
    return response.data;
  }
);

export const disconnectAgent = createAsyncThunk(
  'agents/disconnectAgent',
  async (agentId: string) => {
    const response = await agentClient.disconnectAgent(agentId);
    return response.data;
  }
);

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedAgent: (state, action: PayloadAction<string | null>) => {
      state.selectedAgentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action: PayloadAction<AgentConnection[]>) => {
        state.loading = false;
        state.connections = action.payload.reduce((acc, agent) => {
          acc[agent.id] = agent;
          return acc;
        }, {} as Record<string, AgentConnection>);
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agents';
      })
      .addCase(connectAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectAgent.fulfilled, (state, action: PayloadAction<AgentConnection>) => {
        state.loading = false;
        state.connections[action.payload.id] = action.payload;
      })
      .addCase(connectAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to connect agent';
      })
      .addCase(disconnectAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disconnectAgent.fulfilled, (state, action: PayloadAction<AgentConnection>) => {
        state.loading = false;
        state.connections[action.payload.id] = action.payload;
      })
      .addCase(disconnectAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to disconnect agent';
      });
  },
});

// Actions
export const { setSelectedAgent } = agentSlice.actions;

// Selectors
export const selectAgentConnections = (state: { agents: AgentState }) => Object.values(state.agents.connections);
export const selectSelectedAgentId = (state: { agents: AgentState }) => state.agents.selectedAgentId;
export const selectAgentLoading = (state: { agents: AgentState }) => state.agents.loading;
export const selectAgentError = (state: { agents: AgentState }) => state.agents.error;

export default agentSlice.reducer; 