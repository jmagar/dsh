import type { SystemMetrics } from './metrics.types.js';

export interface DockerStats {
  containers: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
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

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  command: string;
  created: string;
  state: {
    status: 'created' | 'running' | 'paused' | 'restarting' | 'removing' | 'exited' | 'dead';
    running: boolean;
    paused: boolean;
    restarting: boolean;
    oomKilled: boolean;
    dead: boolean;
    pid: number;
    exitCode: number;
    error: string;
    startedAt: string;
    finishedAt: string;
  };
  ports: Array<{
    ip: string;
    privatePort: number;
    publicPort: number;
    type: string;
  }>;
  mounts: Array<{
    type: string;
    name: string;
    source: string;
    destination: string;
    driver: string;
    mode: string;
    rw: boolean;
  }>;
}

export interface DockerComposeConfig {
  version: string;
  services: Record<string, {
    image?: string;
    build?: {
      context: string;
      dockerfile: string;
      args?: Record<string, string>;
      target?: string;
    };
    command?: string | string[];
    entrypoint?: string | string[];
    environment?: Record<string, string>;
    env_file?: string | string[];
    ports?: string[];
    volumes?: string[];
    depends_on?: string[];
    networks?: string[];
    restart?: string;
    labels?: Record<string, string>;
    healthcheck?: {
      test: string | string[];
      interval?: string;
      timeout?: string;
      retries?: number;
      start_period?: string;
    };
  }>;
  networks?: Record<string, {
    driver?: string;
    driver_opts?: Record<string, string>;
    ipam?: {
      driver: string;
      config: Array<{
        subnet: string;
        gateway?: string;
      }>;
    };
  }>;
  volumes?: Record<string, {
    driver?: string;
    driver_opts?: Record<string, string>;
    external?: boolean;
  }>;
}

export interface DockerError {
  code: number;
  message: string;
  details?: string;
}

export interface DockerNetwork {
  id: string;
  name: string;
  driver: string;
  scope: string;
  enableIPv6: boolean;
  internal: boolean;
  attachable: boolean;
  ingress: boolean;
  ipam: {
    driver: string;
    config: Array<{
      subnet: string;
      gateway?: string;
    }>;
    options?: Record<string, string>;
  };
  labels: Record<string, string>;
}

export interface DockerVolume {
  name: string;
  driver: string;
  mountpoint: string;
  status: {
    state: string;
    health: string;
  };
  labels: Record<string, string>;
  scope: string;
  options: Record<string, string>;
}

export interface DockerBuild {
  id: string;
  stream: string;
  error: string | null;
  progress: string;
  status: string;
  started: string;
  finished: string;
  duration: number;
  success: boolean;
  tags: string[];
  size: number;
}

export interface DockerRegistry {
  url: string;
  username: string;
  password: string;
  email: string;
  serveraddress: string;
}

export interface DockerHealthCheck {
  test: string[];
  interval: number;
  timeout: number;
  retries: number;
  startPeriod: number;
}

export interface DockerContainerUpdate {
  cpuShares?: number;
  memory?: number;
  memorySwap?: number;
  memoryReservation?: number;
  kernelMemory?: number;
  cpuPeriod?: number;
  cpuQuota?: number;
  cpusetCpus?: string;
  cpusetMems?: string;
  blkioWeight?: number;
  restartPolicy?: {
    name: string;
    maximumRetryCount: number;
  };
}

export interface DockerExecConfig {
  attachStdin?: boolean;
  attachStdout?: boolean;
  attachStderr?: boolean;
  detachKeys?: string;
  tty?: boolean;
  env?: string[];
  cmd?: string[];
  privileged?: boolean;
  user?: string;
  workingDir?: string;
}

export interface DockerImage {
  id: string;
  parentId: string;
  repoTags: string[];
  repoDigests: string[];
  created: string;
  size: number;
  sharedSize: number;
  virtualSize: number;
  labels: Record<string, string>;
  containers: number;
}

export interface DockerState {
  containers: DockerContainer[];
  images: DockerImage[];
  volumes: DockerVolume[];
  networks: DockerNetwork[];
  stats: DockerStats;
  errors: DockerError[];
  loading: boolean;
}

// Type guards
export const isDockerContainer = (data: unknown): data is DockerContainer => {
  if (typeof data !== 'object' || data === null) return false;
  
  const container = data as Partial<DockerContainer>;
  return (
    typeof container.id === 'string' &&
    typeof container.name === 'string' &&
    typeof container.image === 'string' &&
    typeof container.state === 'object' &&
    Array.isArray(container.ports) &&
    Array.isArray(container.mounts)
  );
};

export const isDockerImage = (data: unknown): data is DockerImage => {
  if (typeof data !== 'object' || data === null) return false;
  
  const image = data as Partial<DockerImage>;
  return (
    typeof image.id === 'string' &&
    Array.isArray(image.repoTags) &&
    Array.isArray(image.repoDigests) &&
    typeof image.created === 'string' &&
    typeof image.size === 'number'
  );
};

// ... rest of docker types from frontend/src/types/docker.types.ts 