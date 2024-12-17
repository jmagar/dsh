export interface InfrastructureNode {
  id: string;
  name: string;
  type: 'server' | 'container' | 'vm' | 'network' | 'storage';
  status: 'running' | 'stopped' | 'error' | 'unknown';
  provider: 'local' | 'aws' | 'gcp' | 'azure' | 'custom';
  region?: string;
  zone?: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

export interface InfrastructureResource {
  id: string;
  nodeId: string;
  type: 'cpu' | 'memory' | 'storage' | 'network';
  allocated: number;
  used: number;
  available: number;
  unit: string;
  limits?: {
    min: number;
    max: number;
    soft: number;
    hard: number;
  };
}

export interface InfrastructureService {
  id: string;
  name: string;
  type: 'web' | 'database' | 'cache' | 'queue' | 'storage' | 'custom';
  status: 'running' | 'stopped' | 'error' | 'deploying' | 'scaling';
  version: string;
  replicas: {
    desired: number;
    current: number;
    ready: number;
    available: number;
  };
  endpoints: Array<{
    type: 'http' | 'tcp' | 'udp';
    port: number;
    protocol: string;
    url?: string;
  }>;
  dependencies: string[];
  nodeIds: string[];
}

export interface InfrastructureNetwork {
  id: string;
  name: string;
  type: 'bridge' | 'overlay' | 'host' | 'custom';
  subnet: string;
  gateway?: string;
  driver: string;
  scope: 'local' | 'global' | 'swarm';
  ipam: {
    driver: string;
    config: Array<{
      subnet: string;
      gateway?: string;
      ipRange?: string;
    }>;
  };
  enableIPv6: boolean;
  internal: boolean;
  attachable: boolean;
  ingress: boolean;
  labels: Record<string, string>;
}

export interface InfrastructureVolume {
  id: string;
  name: string;
  driver: string;
  mountpoint: string;
  scope: 'local' | 'global';
  status: 'available' | 'in-use' | 'error';
  size: number;
  used: number;
  available: number;
  encrypted: boolean;
  backupEnabled: boolean;
  lastBackup?: string;
  nodeIds: string[];
  mountOptions?: Record<string, string>;
}

export interface InfrastructureTemplate {
  id: string;
  name: string;
  description: string;
  version: string;
  type: 'compose' | 'kubernetes' | 'terraform' | 'custom';
  content: string;
  variables: Record<string, {
    type: string;
    default?: unknown;
    required: boolean;
    description?: string;
  }>;
  validation: {
    schema?: Record<string, unknown>;
    rules?: Array<{
      field: string;
      rule: string;
      message: string;
    }>;
  };
}

export interface InfrastructureDeployment {
  id: string;
  templateId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'rolled-back';
  variables: Record<string, unknown>;
  startTime: string;
  endTime?: string;
  duration?: number;
  steps: Array<{
    name: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
    message?: string;
    startTime: string;
    endTime?: string;
  }>;
  rollback?: {
    enabled: boolean;
    automatic: boolean;
    triggered: boolean;
    status?: 'pending' | 'in-progress' | 'completed' | 'failed';
  };
}

export interface InfrastructureBackup {
  id: string;
  resourceId: string;
  type: 'full' | 'incremental';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  size: number;
  compressed: boolean;
  encrypted: boolean;
  startTime: string;
  endTime?: string;
  retention: {
    policy: 'days' | 'count';
    value: number;
  };
  location: {
    type: 'local' | 's3' | 'gcs' | 'azure';
    path: string;
    credentials?: Record<string, string>;
  };
}

export interface InfrastructureMonitoring {
  enabled: boolean;
  interval: number;
  retention: string;
  metrics: Array<{
    name: string;
    type: 'gauge' | 'counter' | 'histogram';
    description: string;
    labels: string[];
  }>;
  alerts: Array<{
    name: string;
    condition: string;
    threshold: number;
    duration: string;
    severity: 'info' | 'warning' | 'critical';
    notifications: Array<{
      type: 'email' | 'slack' | 'webhook';
      target: string;
    }>;
  }>;
}

// Type guards
export const isInfrastructureNode = (data: unknown): data is InfrastructureNode => {
  if (typeof data !== 'object' || data === null) return false;
  
  const node = data as Partial<InfrastructureNode>;
  return (
    typeof node.id === 'string' &&
    typeof node.name === 'string' &&
    typeof node.type === 'string' &&
    typeof node.status === 'string' &&
    typeof node.provider === 'string' &&
    typeof node.createdAt === 'string' &&
    typeof node.updatedAt === 'string' &&
    typeof node.metadata === 'object'
  );
};

export const isInfrastructureService = (data: unknown): data is InfrastructureService => {
  if (typeof data !== 'object' || data === null) return false;
  
  const service = data as Partial<InfrastructureService>;
  return (
    typeof service.id === 'string' &&
    typeof service.name === 'string' &&
    typeof service.type === 'string' &&
    typeof service.status === 'string' &&
    typeof service.version === 'string' &&
    Array.isArray(service.nodeIds) &&
    typeof service.replicas === 'object'
  );
}; 