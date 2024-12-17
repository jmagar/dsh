export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  created: string;
  state: {
    status: 'created' | 'running' | 'paused' | 'restarting' | 'removing' | 'exited' | 'dead';
    running: boolean;
    paused: boolean;
    restarting: boolean;
    pid: number;
    exitCode: number;
    error: string;
    startedAt: string;
    finishedAt: string;
  };
  config: {
    hostname: string;
    domainname: string;
    user: string;
    exposedPorts: Record<string, Record<string, never>>;
    env: string[];
    cmd: string[];
    volumes: Record<string, Record<string, never>>;
    workingDir: string;
    entrypoint: string[];
    labels: Record<string, string>;
  };
  networkSettings: {
    networks: Record<string, {
      networkId: string;
      endpointId: string;
      gateway: string;
      ipAddress: string;
      ipPrefixLen: number;
      macAddress: string;
    }>;
    ports: Record<string, Array<{
      hostIp: string;
      hostPort: string;
    }>>;
  };
  mounts: Array<{
    type: 'bind' | 'volume' | 'tmpfs';
    source: string;
    destination: string;
    mode: string;
    rw: boolean;
  }>;
  stats: {
    cpu: {
      totalUsage: number;
      percpuUsage: number[];
      usageInKernelmode: number;
      usageInUsermode: number;
    };
    memory: {
      usage: number;
      maxUsage: number;
      limit: number;
      stats: {
        cache: number;
        rss: number;
        swap: number;
      };
    };
    networks: Record<string, {
      rxBytes: number;
      rxPackets: number;
      rxErrors: number;
      rxDropped: number;
      txBytes: number;
      txPackets: number;
      txErrors: number;
      txDropped: number;
    }>;
    blkio: {
      ioServiceBytesRecursive: Array<{
        major: number;
        minor: number;
        op: string;
        value: number;
      }>;
    };
  };
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

export interface DockerNetwork {
  id: string;
  name: string;
  created: string;
  scope: 'local' | 'global' | 'swarm';
  driver: 'bridge' | 'host' | 'overlay' | 'macvlan' | 'none';
  enableIPv6: boolean;
  internal: boolean;
  attachable: boolean;
  ingress: boolean;
  ipam: {
    driver: string;
    config: Array<{
      subnet: string;
      gateway: string;
      ipRange: string;
      auxAddress: Record<string, string>;
    }>;
    options: Record<string, string>;
  };
  containers: Record<string, {
    name: string;
    endpointId: string;
    macAddress: string;
    ipv4Address: string;
    ipv6Address: string;
  }>;
  options: Record<string, string>;
  labels: Record<string, string>;
}

export interface DockerVolume {
  name: string;
  driver: string;
  mountpoint: string;
  created: string;
  status: Record<string, string>;
  labels: Record<string, string>;
  scope: 'local' | 'global';
  options: Record<string, string>;
  usageData: {
    size: number;
    refCount: number;
  };
}

export interface DockerCompose {
  version: string;
  services: Record<string, {
    image?: string;
    build?: {
      context: string;
      dockerfile: string;
      args?: Record<string, string>;
    };
    command?: string[];
    environment?: Record<string, string>;
    env_file?: string[];
    ports?: string[];
    volumes?: string[];
    depends_on?: string[];
    networks?: string[];
    restart?: 'no' | 'always' | 'on-failure' | 'unless-stopped';
    labels?: Record<string, string>;
    healthcheck?: {
      test: string[];
      interval: string;
      timeout: string;
      retries: number;
      start_period: string;
    };
  }>;
  networks?: Record<string, {
    driver: string;
    driver_opts?: Record<string, string>;
    ipam?: {
      driver: string;
      config: Array<{
        subnet: string;
        gateway: string;
      }>;
    };
  }>;
  volumes?: Record<string, {
    driver: string;
    driver_opts?: Record<string, string>;
    external?: boolean;
  }>;
}

export interface DockerBuild {
  context: string;
  dockerfile: string;
  tags: string[];
  buildArgs: Record<string, string>;
  target?: string;
  network?: string;
  cacheFrom?: string[];
  labels: Record<string, string>;
  options: {
    pull?: boolean;
    noCache?: boolean;
    squash?: boolean;
    platform?: string;
  };
  progress: {
    current: number;
    total: number;
    status: string;
    stream?: string;
    error?: string;
  };
}

export interface DockerRegistry {
  url: string;
  username: string;
  password: string;
  email?: string;
  serveraddress: string;
  identitytoken?: string;
  auth?: string;
}

export interface DockerEvents {
  type: 'container' | 'image' | 'volume' | 'network' | 'daemon';
  action: string;
  actor: {
    id: string;
    attributes: Record<string, string>;
  };
  time: number;
  timeNano: number;
}

export interface DockerSystemInfo {
  id: string;
  containers: number;
  containersRunning: number;
  containersPaused: number;
  containersStopped: number;
  images: number;
  driver: string;
  memoryLimit: boolean;
  swapLimit: boolean;
  kernelMemory: boolean;
  cpuCfsPeriod: boolean;
  cpuCfsQuota: boolean;
  cpuShares: boolean;
  cpuSet: boolean;
  debug: boolean;
  dockerRootDir: string;
  operatingSystem: string;
  osType: string;
  architecture: string;
  serverVersion: string;
  plugins: {
    volume: string[];
    network: string[];
    authorization: string[];
    log: string[];
  };
}

export interface DockerSecret {
  id: string;
  version: {
    index: number;
  };
  createdAt: string;
  updatedAt: string;
  spec: {
    name: string;
    labels?: Record<string, string>;
    data: string;
    driver?: {
      name: string;
      options?: Record<string, string>;
    };
    templating?: {
      name: string;
      options?: Record<string, string>;
    };
  };
}

export interface DockerConfig {
  id: string;
  version: {
    index: number;
  };
  createdAt: string;
  updatedAt: string;
  spec: {
    name: string;
    labels?: Record<string, string>;
    data: string;
    templating?: {
      name: string;
      options?: Record<string, string>;
    };
  };
}

export interface DockerSwarmConfig {
  id: string;
  version: {
    index: number;
  };
  createdAt: string;
  updatedAt: string;
  spec: {
    name: string;
    orchestration?: {
      taskHistoryRetentionLimit?: number;
    };
    raft?: {
      snapshotInterval?: number;
      keepOldSnapshots?: number;
      logEntriesForSlowFollowers?: number;
      electionTick?: number;
      heartbeatTick?: number;
    };
    dispatcher?: {
      heartbeatPeriod?: string;
    };
    caConfig?: {
      nodeCertExpiry?: string;
      externalCAs?: Array<{
        protocol: string;
        url: string;
        options?: Record<string, string>;
      }>;
    };
    encryptionConfig?: {
      autoLockManagers: boolean;
    };
    taskDefaults?: {
      logDriver?: {
        name: string;
        options?: Record<string, string>;
      };
    };
  };
}

export interface DockerService {
  id: string;
  version: {
    index: number;
  };
  createdAt: string;
  updatedAt: string;
  spec: {
    name: string;
    labels?: Record<string, string>;
    taskTemplate: {
      containerSpec: {
        image: string;
        command?: string[];
        args?: string[];
        env?: string[];
        dir?: string;
        user?: string;
        groups?: string[];
        privileges?: {
          credentialSpec?: Record<string, string>;
          seLinuxContext?: Record<string, string>;
        };
        stopGracePeriod?: number;
        healthcheck?: {
          test: string[];
          interval: number;
          timeout: number;
          retries: number;
          startPeriod?: number;
        };
        hosts?: string[];
        dnsConfig?: {
          nameservers: string[];
          search: string[];
          options: string[];
        };
        secrets?: Array<{
          file: {
            name: string;
            uid?: string;
            gid?: string;
            mode?: number;
          };
          secretId: string;
          secretName: string;
        }>;
        configs?: Array<{
          file: {
            name: string;
            uid?: string;
            gid?: string;
            mode?: number;
          };
          configId: string;
          configName: string;
        }>;
      };
      resources?: {
        limits?: {
          nanoCPUs?: number;
          memoryBytes?: number;
          pids?: number;
        };
        reservations?: {
          nanoCPUs?: number;
          memoryBytes?: number;
          genericResources?: Array<{
            namedResourceSpec?: {
              kind: string;
              value: string;
            };
            discreteResourceSpec?: {
              kind: string;
              value: number;
            };
          }>;
        };
      };
      restartPolicy?: {
        condition: 'none' | 'on-failure' | 'any';
        delay?: number;
        maxAttempts?: number;
        window?: number;
      };
      placement?: {
        constraints?: string[];
        preferences?: Array<{
          spread?: {
            spreadDescriptor: string;
          };
        }>;
        maxReplicas?: number;
        platforms?: Array<{
          architecture: string;
          os: string;
        }>;
      };
      networks?: Array<{
        target: string;
        aliases?: string[];
      }>;
      logDriver?: {
        name: string;
        options?: Record<string, string>;
      };
    };
    mode?: {
      replicated?: {
        replicas: number;
      };
      global?: Record<string, never>;
    };
    updateConfig?: {
      parallelism: number;
      delay: number;
      failureAction: 'continue' | 'pause' | 'rollback';
      monitor: number;
      maxFailureRatio: number;
      order: 'stop-first' | 'start-first';
    };
    rollbackConfig?: {
      parallelism: number;
      delay: number;
      failureAction: 'continue' | 'pause';
      monitor: number;
      maxFailureRatio: number;
      order: 'stop-first' | 'start-first';
    };
    networks?: Array<{
      target: string;
      aliases?: string[];
    }>;
    endpointSpec?: {
      mode: 'vip' | 'dnsrr';
      ports?: Array<{
        name?: string;
        protocol: 'tcp' | 'udp';
        targetPort: number;
        publishedPort?: number;
        publishMode?: 'ingress' | 'host';
      }>;
    };
  };
  endpoint?: {
    spec: {
      mode: 'vip' | 'dnsrr';
      ports: Array<{
        name?: string;
        protocol: 'tcp' | 'udp';
        targetPort: number;
        publishedPort: number;
        publishMode: 'ingress' | 'host';
      }>;
    };
    ports: Array<{
      name?: string;
      protocol: 'tcp' | 'udp';
      targetPort: number;
      publishedPort: number;
      publishMode: 'ingress' | 'host';
    }>;
    virtualIPs: Array<{
      networkId: string;
      addr: string;
    }>;
  };
} 