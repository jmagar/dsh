export interface Agent {
  id: string;
  name: string;
  host: string;
  port: number;
  apiKey?: string;
  sshKey?: string;
  connected: boolean;
  lastSeen?: string;
  osInfo?: {
    os: string;
    platform: string;
    arch: string;
    release?: string;
  };
  config?: AgentConfig;
  metrics?: AgentMetrics;
}

export interface AgentConfig {
  server: {
    url: string;
    heartbeatInterval: string;
    reconnectDelay: string;
  };
  logging: {
    level: string;
    format: string;
    file: string;
    maxSize: number;
    maxFiles: number;
    compress: boolean;
  };
  monitoring: {
    enabled: boolean;
    interval: string;
    retention: string;
  };
  security: {
    tlsVerify: boolean;
    minTlsVersion: string;
  };
  process: {
    maxJobs: number;
    jobTimeout: string;
  };
}

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
  name: string;
  host: string;
  port: number;
  connected: boolean;
  lastSeen: string;
  osInfo: {
    platform: string;
    os: string;
    arch: string;
    release?: string;
  };
  metrics?: AgentMetrics;
}

export interface AgentMetrics {
  cpu: {
    usage: number;
    loadAverage: number[];
    processes: number;
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
  uptime: number;
}

export interface AgentCommand {
  type: 'COLLECT_METRICS' | 'UPDATE_CONFIG' | 'RESTART' | 'SHUTDOWN';
  payload?: unknown;
  timestamp: string;
}

export interface AgentResponse {
  success: boolean;
  error?: string;
  data?: unknown;
  timestamp: string;
}

export interface AgentHeartbeat {
  status: string;
  uptime: number;
  loadAvg: number[];
  processes: number;
  metrics: AgentMetrics;
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