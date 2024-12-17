import type { SystemMetrics } from '@dsh/shared/types/metrics.types';

export interface DockerStats {
  containers: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
  created: string;
  ports: Array<{
    ip: string;
    privatePort: number;
    publicPort: number;
    type: string;
  }>;
  networks: {
    [key: string]: {
      ipAddress: string;
      gateway: string;
      macAddress: string;
    };
  };
  mounts: Array<{
    type: string;
    source: string;
    destination: string;
    mode: string;
    rw: boolean;
  }>;
  labels: { [key: string]: string };
}

export interface DockerComposeConfig {
  version: string;
  services: {
    [key: string]: {
      image: string;
      container_name?: string;
      command?: string | string[];
      entrypoint?: string | string[];
      environment?: { [key: string]: string } | string[];
      ports?: string[];
      volumes?: string[];
      depends_on?: string[];
      networks?: string[];
      restart?: string;
      labels?: { [key: string]: string };
    };
  };
  networks?: {
    [key: string]: {
      driver?: string;
      external?: boolean;
      name?: string;
    };
  };
  volumes?: {
    [key: string]: {
      driver?: string;
      external?: boolean;
      name?: string;
    };
  };
}

export interface DockerMetrics extends SystemMetrics {
  docker: {
    containers: DockerStats;
    volumes: {
      total: number;
      used: number;
      available: number;
    };
    images: {
      total: number;
      size: number;
    };
  };
}

export interface DockerError {
  code: string;
  message: string;
  details?: string;
}

export interface DockerNetwork {
  id: string;
  name: string;
  driver: string;
  scope: string;
  internal: boolean;
  ipam: {
    driver: string;
    config: Array<{
      subnet: string;
      gateway: string;
    }>;
  };
  containers: Record<string, {
    ipv4Address: string;
    ipv6Address: string;
    macAddress: string;
  }>;
}

export interface DockerVolume {
  name: string;
  driver: string;
  mountpoint: string;
  scope: string;
  labels: Record<string, string>;
  options: Record<string, string>;
  usageData?: {
    size: number;
    refCount: number;
  };
}

export interface DockerBuild {
  id: string;
  status: 'pending' | 'building' | 'success' | 'error';
  progress: number;
  context: string;
  dockerfile: string;
  tags: string[];
  args: Record<string, string>;
  target?: string;
  error?: string;
  logs: string[];
  startTime: string;
  endTime?: string;
}

export interface DockerRegistry {
  url: string;
  username: string;
  password?: string;
  email?: string;
  auth?: string;
  serveraddress?: string;
}

export interface DockerHealthCheck {
  test: string[];
  interval: number;
  timeout: number;
  retries: number;
  startPeriod?: number;
}

export interface DockerContainerUpdate {
  cpuShares?: number;
  memory?: number;
  memorySwap?: number;
  cpuPeriod?: number;
  cpuQuota?: number;
  restartPolicy?: {
    name: string;
    maximumRetryCount?: number;
  };
}

export interface DockerExecConfig {
  attachStdin?: boolean;
  attachStdout?: boolean;
  attachStderr?: boolean;
  tty?: boolean;
  env?: string[];
  cmd: string[];
  user?: string;
  workingDir?: string;
}

export interface DockerImage {
  id: string;
  tags: string[];
  created: string;
  size: number;
  virtualSize: number;
  shared: boolean;
  containers: string[];
  repoTags: string[];
  repoDigests: string[];
  parent: string;
  labels: Record<string, string>;
  architecture: string;
  os: string;
  author?: string;
  comment?: string;
}

export interface DockerState {
  containers: DockerContainer[];
  images: DockerImage[];
  networks: DockerNetwork[];
  volumes: DockerVolume[];
  builds: DockerBuild[];
  loading: boolean;
  error: string | null;
}

export const isDockerNetwork = (data: unknown): data is DockerNetwork => {
  if (typeof data !== 'object' || data === null) return false;
  
  const network = data as Partial<DockerNetwork>;
  return (
    typeof network.id === 'string' &&
    typeof network.name === 'string' &&
    typeof network.driver === 'string'
  );
};

export const isDockerVolume = (data: unknown): data is DockerVolume => {
  if (typeof data !== 'object' || data === null) return false;
  
  const volume = data as Partial<DockerVolume>;
  return (
    typeof volume.name === 'string' &&
    typeof volume.driver === 'string' &&
    typeof volume.mountpoint === 'string'
  );
};
