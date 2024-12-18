import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';

import type { AgentMetrics } from '../../../components/AgentManager/types';
import { fetchAgentMetrics } from '../../../services/api';
import type { RootState } from '../../types';
import { metricsReducer, fetchMetrics, clearMetrics } from '../metricsSlice';

// Mock the API
jest.mock('../../../services/api');

const mockFetchAgentMetrics = fetchAgentMetrics as jest.MockedFunction<typeof fetchAgentMetrics>;

describe('metricsSlice', () => {
  const mockMetrics: AgentMetrics = {
    cpu: {
      usage: 50,
      loadAverage: 1.5,
    },
    memory: {
      usage: 75,
      available: 4096,
      total: 8192,
    },
    disk: {
      usage: 60,
      available: 100000,
      total: 250000,
    },
  };

  let store: ReturnType<typeof configureStore> & {
    dispatch: ThunkDispatch<RootState, unknown, Action>;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        metrics: metricsReducer,
      },
    }) as typeof store;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('reducers', () => {
    it('should handle clearMetrics', async () => {
      // First, add some metrics data
      await store.dispatch(
        fetchMetrics.fulfilled({ agentId: 'test-1', metrics: mockMetrics }, 'pending', 'test-1')
      );

      // Then clear it
      store.dispatch(clearMetrics('test-1'));
      const state = store.getState() as RootState;

      expect(state.metrics.data['test-1']).toBeUndefined();
      expect(state.metrics.loading).toBe(false);
      expect(state.metrics.error).toBeNull();
    });
  });

  describe('fetchMetrics', () => {
    it('should handle successful metrics fetch', async () => {
      mockFetchAgentMetrics.mockResolvedValueOnce(mockMetrics);

      const result = await store.dispatch(fetchMetrics('test-1'));
      expect(fetchMetrics.fulfilled.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.metrics.data['test-1']).toEqual(mockMetrics);
      expect(state.metrics.loading).toBe(false);
      expect(state.metrics.error).toBeNull();
    });

    it('should handle metrics fetch failure', async () => {
      const error = 'Failed to fetch metrics';
      mockFetchAgentMetrics.mockRejectedValueOnce(new Error(error));

      const result = await store.dispatch(fetchMetrics('test-1'));
      expect(fetchMetrics.rejected.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.metrics.data['test-1']).toBeUndefined();
      expect(state.metrics.loading).toBe(false);
      expect(state.metrics.error).toBe(error);
    });

    it('should update existing metrics', async () => {
      // First fetch
      mockFetchAgentMetrics.mockResolvedValueOnce(mockMetrics);
      const firstResult = await store.dispatch(fetchMetrics('test-1'));
      expect(fetchMetrics.fulfilled.match(firstResult)).toBeTruthy();

      // Second fetch with updated metrics
      const updatedMetrics = {
        ...mockMetrics,
        cpu: { ...mockMetrics.cpu, usage: 75 },
      };
      mockFetchAgentMetrics.mockResolvedValueOnce(updatedMetrics);
      const secondResult = await store.dispatch(fetchMetrics('test-1'));
      expect(fetchMetrics.fulfilled.match(secondResult)).toBeTruthy();

      const state = store.getState() as RootState;
      expect(state.metrics.data['test-1']).toEqual(updatedMetrics);
    });
  });
}); 