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
  osInfo?: OSInfo;
}

// Helper function to safely extract metrics
export function getSystemMetrics(metrics?: SystemMetrics): SystemMetrics {
  if (!metrics || !metrics.metrics) {
    return {
      metrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0
      },
      timestamp: new Date().toISOString(),
      hostname: 'N/A',
      ipAddress: 'N/A',
      osInfo: {
        platform: 'N/A',
        os: 'N/A',
        arch: 'N/A'
      }
    };
  }
  return {
    ...metrics,
    hostname: metrics.hostname ?? 'N/A',
    ipAddress: metrics.ipAddress ?? 'N/A',
    osInfo: metrics.osInfo ?? {
      platform: 'N/A',
      os: 'N/A',
      arch: 'N/A'
    }
  };
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
  readTime: number;
  writeTime: number;
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
  timestamp: string;
  value: number;
  metadata?: Record<string, unknown>;
}

export interface MetricQuery {
  serverId: string;
  metricType: string;
  startTime: string;
  endTime: string;
  interval?: string;
  aggregation?: 'avg' | 'max' | 'min' | 'sum';
}

export interface OSInfo {
  platform: string;
  os: string;
  arch: string;
  release?: string;
}