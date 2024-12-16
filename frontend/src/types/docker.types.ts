import { SystemMetrics } from '@dsh/shared/types/metrics';

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
