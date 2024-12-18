import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';

import type { AgentConnection } from '../../../components/AgentManager/types';
import { connectToAgent, disconnectFromAgent, refreshAgentConnections } from '../../../services/api';
import type { RootState } from '../../../store';
import {
  agentReducer,
  connectAgent,
  disconnectAgent,
  refreshAgents,
  setSelectedAgent,
} from '../agentSlice';

// Mock the API
jest.mock('../../../services/api');

const mockConnectToAgent = connectToAgent as jest.MockedFunction<typeof connectToAgent>;
const mockDisconnectFromAgent = disconnectFromAgent as jest.MockedFunction<typeof disconnectFromAgent>;
const mockRefreshAgentConnections = refreshAgentConnections as jest.MockedFunction<typeof refreshAgentConnections>;

describe('agentSlice', () => {
  const mockAgent: AgentConnection = {
    id: 'test-1',
    name: 'Test Agent',
    host: 'localhost',
    port: 22,
    connected: false,
  };

  let store: ReturnType<typeof configureStore> & {
    dispatch: ThunkDispatch<RootState, unknown, Action>;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        agents: agentReducer,
      },
    }) as typeof store;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('reducers', () => {
    it('should handle setSelectedAgent', () => {
      store.dispatch(setSelectedAgent('test-1'));
      const state = store.getState() as RootState;
      expect(state.agents.selectedAgentId).toBe('test-1');

      store.dispatch(setSelectedAgent(null));
      const updatedState = store.getState() as RootState;
      expect(updatedState.agents.selectedAgentId).toBeNull();
    });
  });

  describe('connectAgent', () => {
    it('should handle successful connection', async () => {
      mockConnectToAgent.mockResolvedValueOnce({ ...mockAgent, connected: true });

      const result = await store.dispatch(connectAgent(mockAgent));
      expect(connectAgent.fulfilled.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.agents.connections).toHaveLength(1);
      expect(state.agents.connections[0]).toEqual({ ...mockAgent, connected: true });
      expect(state.agents.loading).toBe(false);
      expect(state.agents.error).toBeNull();
    });

    it('should handle connection failure', async () => {
      const error = 'Connection failed';
      mockConnectToAgent.mockRejectedValueOnce(new Error(error));

      const result = await store.dispatch(connectAgent(mockAgent));
      expect(connectAgent.rejected.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.agents.connections).toHaveLength(0);
      expect(state.agents.loading).toBe(false);
      expect(state.agents.error).toBe(error);
    });
  });

  describe('disconnectAgent', () => {
    beforeEach(() => {
      store.dispatch(connectAgent.fulfilled({ ...mockAgent, connected: true }, 'pending', mockAgent));
    });

    it('should handle successful disconnection', async () => {
      mockDisconnectFromAgent.mockResolvedValueOnce();

      const result = await store.dispatch(disconnectAgent(mockAgent.id));
      expect(disconnectAgent.fulfilled.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.agents.connections).toHaveLength(0);
      expect(state.agents.loading).toBe(false);
      expect(state.agents.error).toBeNull();
    });

    it('should handle disconnection failure', async () => {
      const error = 'Disconnection failed';
      mockDisconnectFromAgent.mockRejectedValueOnce(new Error(error));

      const result = await store.dispatch(disconnectAgent(mockAgent.id));
      expect(disconnectAgent.rejected.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.agents.connections).toHaveLength(1);
      expect(state.agents.loading).toBe(false);
      expect(state.agents.error).toBe(error);
    });
  });

  describe('refreshAgents', () => {
    it('should handle successful refresh', async () => {
      const agents = [mockAgent, { ...mockAgent, id: 'test-2', name: 'Test Agent 2' }];
      mockRefreshAgentConnections.mockResolvedValueOnce(agents);

      const result = await store.dispatch(refreshAgents());
      expect(refreshAgents.fulfilled.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.agents.connections).toEqual(agents);
      expect(state.agents.loading).toBe(false);
      expect(state.agents.error).toBeNull();
    });

    it('should handle refresh failure', async () => {
      const error = 'Refresh failed';
      mockRefreshAgentConnections.mockRejectedValueOnce(new Error(error));

      const result = await store.dispatch(refreshAgents());
      expect(refreshAgents.rejected.match(result)).toBeTruthy();
      
      const state = store.getState() as RootState;
      expect(state.agents.connections).toHaveLength(0);
      expect(state.agents.loading).toBe(false);
      expect(state.agents.error).toBe(error);
    });
  });
}); 