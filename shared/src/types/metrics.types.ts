export interface CPUMetrics {
  user: number;
  system: number;
  idle: number;
  iowait?: number;
  steal?: number;
  total: number;
  cores: number;
  threads: number;
}

export interface MemoryMetrics {
  total: number;
  used: number;
  free: number;
  shared: number;
  buffers?: number;
  cached?: number;
  available: number;
  swapTotal: number;
  swapUsed: number;
  swapFree: number;
  usage: number;
}

export interface StorageMetrics {
  total: number;
  used: number;
  free: number;
  usage: number;
}

export interface NetworkMetrics {
  bytesSent: number;
  bytesRecv: number;
  packetsSent: number;
  packetsRecv: number;
  errorsIn: number;
  errorsOut: number;
  dropsIn: number;
  dropsOut: number;
}

export interface SystemMetrics {
  metrics: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    cpu?: CPUMetrics;
    memory?: MemoryMetrics;
    storage?: StorageMetrics;
    network?: NetworkMetrics;
    loadAverage?: [number, number, number];
    uptimeSeconds?: number;
  };
  timestamp: string;
  hostname?: string;
  ipAddress?: string;
  osInfo?: {
    platform: string;
    os: string;
    arch: string;
  };
}