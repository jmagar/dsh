import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchAgentMetrics } from '../../services/api';
import type { AgentMetrics } from '../../components/AgentManager/types';
import type { RootState } from '../types';

export interface MetricsState {
  data: Record<string, AgentMetrics | null>;
  loading: boolean;
  error: string | null;
}

const initialState: MetricsState = {
  data: {},
  loading: false,
  error: null,
};

export const fetchMetrics = createAsyncThunk(
  'metrics/fetch',
  async (agentId: string, { rejectWithValue }) => {
    try {
      const metrics = await fetchAgentMetrics(agentId);
      return { agentId, metrics };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch metrics');
    }
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    clearMetrics: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        const { agentId, metrics } = action.payload;
        state.data[agentId] = metrics;
        state.loading = false;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Selectors
export const selectMetricsState = (state: RootState) => state.metrics;

export const selectMetricsData = (state: RootState) => selectMetricsState(state).data;

export const selectMetricsForAgent = (agentId: string) => (state: RootState) => 
  selectMetricsData(state)[agentId];

export const selectMetricsLoading = (state: RootState) => selectMetricsState(state).loading;

export const selectMetricsError = (state: RootState) => selectMetricsState(state).error;

export const { clearMetrics, clearError } = metricsSlice.actions;
export const metricsReducer = metricsSlice.reducer;
export default metricsSlice.reducer; 