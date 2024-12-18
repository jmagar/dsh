import { type Action, type ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface AgentState {
  connections: Record<string, AgentConnection>;
  selectedAgentId: string | null;
  loading: boolean;
  error: string | null;
}

export interface AgentConnection {
  id: string;
  status: 'connected' | 'disconnected';
  lastSeen: string;
  hostname: string;
}

export interface ChatState {
  sessions: Record<string, ChatSession>;
  activeSessionId: string | null;
  loading: boolean;
  error: string | null;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  status: 'active' | 'closed';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

export interface DockerState {
  containers: Record<string, DockerContainer>;
  selectedContainerId: string | null;
  loading: boolean;
  error: string | null;
}

export interface DockerContainer {
  id: string;
  name: string;
  status: string;
  image: string;
}

export interface MetricsState {
  data: Record<string, MetricsData>;
  loading: boolean;
  error: string | null;
}

export interface MetricsData {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    rx: number;
    tx: number;
  };
  timestamp: string;
}

export interface UIState {
  dialogs: {
    [key: string]: boolean;
  };
} 