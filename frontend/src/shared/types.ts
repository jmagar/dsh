export interface OSInfo {
  platform: string;
  os: string;
  arch: string;
}

export interface SystemMetrics {
  hostname: string;
  ipAddress: string;
  cpuUsage: number;
  memoryUsage: number;
  osInfo: OSInfo;
  timestamp: string;
}
