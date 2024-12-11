export interface SystemInfo {
  hostname: string;
  platform: string;
  os: string;
  version: string;
  architecture: string;
  cpuInfo: CPU[];
  memoryInfo: Memory;
  environment: Record<string, string>;
  capabilities: string[];
}

export interface CPU {
  model: string;
  cores: number;
  frequency: number;
  cache: number;
}

export interface Memory {
  total: number;
  available: number;
  used: number;
  free: number;
  swapTotal: number;
  swapUsed: number;
  swapFree: number;
}

export interface AgentStatus {
  id: string;
  connected: boolean;
  lastSeen: Date;
  version: string;
  systemInfo?: SystemInfo;
}

export interface AgentCommand {
  type: 'COLLECT_METRICS' | 'UPDATE_CONFIG' | 'RESTART' | 'SHUTDOWN';
  payload?: unknown;
  timestamp: Date;
}

export interface AgentResponse {
  success: boolean;
  error?: string;
  data?: unknown;
  timestamp: Date;
} 