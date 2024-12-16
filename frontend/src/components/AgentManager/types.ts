export interface AgentFormData {
  name: string;
  host: string;
  port: string;
  apiKey: string;
  sshKey: string;
}

export interface AgentMetrics {
  cpu: {
    usage: number;
    loadAverage: number;
  };
  memory: {
    usage: number;
    available: number;
    total: number;
  };
  disk: {
    usage: number;
    available: number;
    total: number;
  };
}

export interface AgentConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  connected: boolean;
}

export interface TestResult {
  success: boolean;
  message: string;
}

// Alias for AgentConnection to maintain compatibility
export type AgentStatus = AgentConnection;
