import type { SystemMetrics } from './metrics.types.js';

export interface DockerStats {
  containers: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIO: {
    bytesReceived: number;
    bytesSent: number;
    packetsReceived: number;
    packetsSent: number;
  };
  blockIO: {
    read: number;
    write: number;
    total: number;
  };
}

export interface DockerMetrics extends SystemMetrics {
  docker: {
    containers: DockerStats;
    volumes: {
      total: number;
      used: number;
      available: number;
      usage: number;
      mountPoints: number;
    };
    images: {
      total: number;
      size: number;
      layers: number;
      cached: number;
    };
    system: {
      version: string;
      apiVersion: string;
      goroutines: number;
      nEvents: number;
      nFd: number;
      nGoroutines: number;
    };
  };
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  imageID: string;
  command: string;
  created: string;
  platform: string;
  state: DockerContainerState;
  status: string;
  ports: DockerPort[];
  mounts: DockerMount[];
  networks: Record<string, DockerNetworkInfo>;
  labels: Record<string, string>;
  sizeRw: number;
  sizeRootFs: number;
  hostConfig: DockerHostConfig;
  networkSettings: DockerNetworkSettings;
  config: DockerContainerConfig;
}

export interface DockerContainerState {
  status: DockerContainerStatus;
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
  health?: DockerHealthState;
}

export type DockerContainerStatus = 
  | 'created'
  | 'running'
  | 'paused'
  | 'restarting'
  | 'removing'
  | 'exited'
  | 'dead';

export interface DockerPort {
  ip: string;
  privatePort: number;
  publicPort: number;
  type: 'tcp' | 'udp' | 'sctp';
}

export interface DockerMount {
  type: 'bind' | 'volume' | 'tmpfs' | 'npipe';
  name: string;
  source: string;
  destination: string;
  driver: string;
  mode: string;
  rw: boolean;
  propagation: string;
}

export interface DockerNetworkInfo {
  networkID: string;
  endpointID: string;
  gateway: string;
  ipAddress: string;
  ipPrefixLen: number;
  ipv6Gateway: string;
  globalIPv6Address: string;
  globalIPv6PrefixLen: number;
  macAddress: string;
}

export interface DockerHostConfig {
  binds: string[];
  containerIDFile: string;
  logConfig: DockerLogConfig;
  networkMode: string;
  portBindings: Record<string, DockerPortBinding[]>;
  restartPolicy: DockerRestartPolicy;
  autoRemove: boolean;
  volumeDriver: string;
  volumesFrom: string[];
  capAdd: string[];
  capDrop: string[];
  dns: string[];
  dnsOptions: string[];
  dnsSearch: string[];
  extraHosts: string[];
  groupAdd: string[];
  ipcMode: string;
  cgroup: string;
  links: string[];
  oomScoreAdj: number;
  pidMode: string;
  privileged: boolean;
  publishAllPorts: boolean;
  readonlyRootfs: boolean;
  securityOpt: string[];
  utsMode: string;
  usernsMode: string;
  shmSize: number;
  runtime: string;
  isolation: string;
  cpuShares: number;
  memory: number;
  memorySwap: number;
  cpuPeriod: number;
  cpuQuota: number;
  cpusetCpus: string;
  cpusetMems: string;
  maxImagesSize: number;
  maxContainerSize: number;
}

export interface DockerLogConfig {
  type: string;
  config: Record<string, string>;
}

export interface DockerPortBinding {
  hostIp: string;
  hostPort: string;
}

export interface DockerRestartPolicy {
  name: string;
  maximumRetryCount: number;
}

export interface DockerNetworkSettings {
  bridge: string;
  sandboxID: string;
  hairpinMode: boolean;
  linkLocalIPv6Address: string;
  linkLocalIPv6PrefixLen: number;
  sandboxKey: string;
  endpointID: string;
  gateway: string;
  globalIPv6Address: string;
  globalIPv6PrefixLen: number;
  ipAddress: string;
  ipPrefixLen: number;
  ipv6Gateway: string;
  macAddress: string;
  networks: Record<string, DockerNetworkInfo>;
}

export interface DockerContainerConfig {
  hostname: string;
  domainname: string;
  user: string;
  attachStdin: boolean;
  attachStdout: boolean;
  attachStderr: boolean;
  exposedPorts: Record<string, Record<string, never>>;
  tty: boolean;
  openStdin: boolean;
  stdinOnce: boolean;
  env: string[];
  cmd: string[];
  healthcheck: DockerHealthCheck;
  argsEscaped: boolean;
  image: string;
  volumes: Record<string, Record<string, never>>;
  workingDir: string;
  entrypoint: string[];
  networkDisabled: boolean;
  macAddress: string;
  onBuild: string[];
  labels: Record<string, string>;
  stopSignal: string;
  stopTimeout: number;
  shell: string[];
}

export interface DockerHealthState {
  status: 'none' | 'starting' | 'healthy' | 'unhealthy';
  failingStreak: number;
  log: Array<{
    start: string;
    end: string;
    exitCode: number;
    output: string;
  }>;
}

export interface DockerComposeConfig {
  version: string;
  services: Record<string, DockerComposeService>;
  networks?: Record<string, DockerComposeNetwork>;
  volumes?: Record<string, DockerComposeVolume>;
  secrets?: Record<string, DockerComposeSecret>;
  configs?: Record<string, DockerComposeConfigItem>;
}

export interface DockerComposeService {
  image?: string;
  build?: DockerComposeBuild;
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
  healthcheck?: DockerHealthCheck;
  deploy?: DockerComposeServiceDeploy;
  secrets?: DockerComposeServiceSecret[];
  configs?: DockerComposeServiceConfig[];
}

export interface DockerComposeBuild {
  context: string;
  dockerfile: string;
  args?: Record<string, string>;
  target?: string;
  cache_from?: string[];
  network?: string;
  labels?: Record<string, string>;
  shm_size?: string | number;
}

export interface DockerComposeServiceDeploy {
  mode?: 'replicated' | 'global';
  replicas?: number;
  labels?: Record<string, string>;
  update_config?: {
    parallelism?: number;
    delay?: string;
    failure_action?: 'continue' | 'pause' | 'rollback';
    monitor?: string;
    max_failure_ratio?: number;
    order?: 'stop-first' | 'start-first';
  };
  resources?: {
    limits?: {
      cpus?: string;
      memory?: string;
    };
    reservations?: {
      cpus?: string;
      memory?: string;
    };
  };
  restart_policy?: {
    condition?: 'none' | 'on-failure' | 'any';
    delay?: string;
    max_attempts?: number;
    window?: string;
  };
  placement?: {
    constraints?: string[];
    preferences?: Array<{
      spread?: string;
    }>;
  };
}

export interface DockerComposeNetwork {
  driver?: string;
  driver_opts?: Record<string, string>;
  ipam?: DockerNetworkIpam;
  external?: boolean;
  internal?: boolean;
  attachable?: boolean;
  labels?: Record<string, string>;
}

export interface DockerNetworkIpam {
  driver: string;
  config: Array<{
    subnet: string;
    gateway?: string;
    ip_range?: string;
    aux_addresses?: Record<string, string>;
  }>;
  options?: Record<string, string>;
}

export interface DockerComposeVolume {
  driver?: string;
  driver_opts?: Record<string, string>;
  external?: boolean;
  labels?: Record<string, string>;
  name?: string;
}

export interface DockerComposeSecret {
  file?: string;
  external?: boolean;
  name?: string;
  template?: {
    source: string;
    target?: string;
    uid?: string;
    gid?: string;
    mode?: number;
  };
}

export interface DockerComposeServiceSecret {
  source: string;
  target?: string;
  uid?: string;
  gid?: string;
  mode?: number;
}

export interface DockerComposeServiceConfig {
  source: string;
  target?: string;
  uid?: string;
  gid?: string;
  mode?: number;
}

export interface DockerComposeConfigItem {
  file?: string;
  external?: boolean;
  name?: string;
  template?: {
    source: string;
    target?: string;
    uid?: string;
    gid?: string;
    mode?: number;
  };
}

export interface DockerError {
  code: number;
  message: string;
  details?: string;
  response?: {
    statusCode: number;
    body: string;
  };
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
  ipam: DockerNetworkIpam;
  options?: Record<string, string>;
  labels: Record<string, string>;
  containers?: Record<string, DockerNetworkContainer>;
}

export interface DockerNetworkContainer {
  name: string;
  endpointID: string;
  macAddress: string;
  ipv4Address: string;
  ipv6Address: string;
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
  usageData?: {
    size: number;
    refCount: number;
  };
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
  buildArgs?: Record<string, string>;
  target?: string;
  context?: string;
}

export interface DockerRegistry {
  url: string;
  username: string;
  password: string;
  email: string;
  serveraddress: string;
  identitytoken?: string;
  registrytoken?: string;
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
  restartPolicy?: DockerRestartPolicy;
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
  architecture?: string;
  os?: string;
  author?: string;
  comment?: string;
  config?: DockerContainerConfig;
  rootFS?: {
    type: string;
    layers: string[];
  };
}

export interface DockerState {
  containers: DockerContainer[];
  images: DockerImage[];
  volumes: DockerVolume[];
  networks: DockerNetwork[];
  stats: DockerStats;
  errors: DockerError[];
  loading: boolean;
  version?: {
    version: string;
    apiVersion: string;
    minAPIVersion: string;
    gitCommit: string;
    goVersion: string;
    os: string;
    arch: string;
    kernelVersion: string;
    experimental: boolean;
    buildTime: string;
  };
}

// Type guards
/**
 * Type guard to check if an unknown value is a DockerContainer
 * @param data - Value to check
 * @returns True if value matches DockerContainer interface
 */
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

/**
 * Type guard to check if an unknown value is a DockerImage
 * @param data - Value to check
 * @returns True if value matches DockerImage interface
 */
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

/**
 * Type guard to check if an unknown value is a DockerVolume
 * @param data - Value to check
 * @returns True if value matches DockerVolume interface
 */
export const isDockerVolume = (data: unknown): data is DockerVolume => {
  if (typeof data !== 'object' || data === null) return false;
  
  const volume = data as Partial<DockerVolume>;
  return (
    typeof volume.name === 'string' &&
    typeof volume.driver === 'string' &&
    typeof volume.mountpoint === 'string' &&
    typeof volume.status === 'object'
  );
};

/**
 * Type guard to check if an unknown value is a DockerNetwork
 * @param data - Value to check
 * @returns True if value matches DockerNetwork interface
 */
export const isDockerNetwork = (data: unknown): data is DockerNetwork => {
  if (typeof data !== 'object' || data === null) return false;
  
  const network = data as Partial<DockerNetwork>;
  return (
    typeof network.id === 'string' &&
    typeof network.name === 'string' &&
    typeof network.driver === 'string' &&
    typeof network.scope === 'string'
  );
};

// ... rest of docker types from frontend/src/types/docker.types.ts 