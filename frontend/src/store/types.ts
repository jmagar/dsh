import type { AgentState } from './slices/agentSlice';
import type { MetricsState } from './slices/metricsSlice';
import type { UiState } from './slices/uiSlice';
import type { DockerState } from './slices/dockerSlice';
import type { ChatState } from './slices/chatSlice';

export interface RootState {
  agents: AgentState;
  metrics: MetricsState;
  ui: UiState;
  docker: DockerState;
  chat: ChatState;
} 