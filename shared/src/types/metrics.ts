export interface SystemMetrics {
  timestamp: Date;
  cpu: CPUMetrics;
  memory: MemoryMetrics;
  storage: StorageMetrics;
  network: NetworkMetrics;
  loadAverage: [number, number, number];
  uptimeSeconds: number;
}

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
  ioStats?: IOMetrics;
  total: number;
  used: number;
  free: number;
  usage: number;
}

export interface IOMetrics {
  reads: number;
  writes: number;
  readBytes: number;
  writeBytes: number;
  ioTime?: number;
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
  connections: number;
  tcpConns: number;
  udpConns: number;
  listenPorts: number;
  interfaces: number;
  totalSpeed: number;
  averageSpeed: number;
}

export interface MetricDataPoint {
  timestamp: Date;
  value: number;
  metadata?: Record<string, unknown>;
}

export interface MetricQuery {
  serverId: string;
  metricType: string;
  startTime: Date;
  endTime: Date;
  interval?: string; // e.g., '1m', '5m', '1h'
  aggregation?: 'avg' | 'max' | 'min' | 'sum';
} 