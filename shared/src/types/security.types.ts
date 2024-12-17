export interface SecurityPolicy {
  cors: {
    origins: string[];
    methods: string[];
    headers: string[];
    credentials: boolean;
  };
  rateLimit: {
    window: number;
    max: number;
    skipList: string[];
  };
  authentication: {
    type: 'jwt' | 'oauth2' | 'apikey';
    provider?: string;
    expiresIn: number;
    refreshable: boolean;
  };
  encryption: {
    algorithm: string;
    keySize: number;
    saltRounds: number;
  };
}

export interface Audit {
  action: string;
  resource: string;
  user: string;
  timestamp: string;
  success: boolean;
  ip: string;
  userAgent: string;
  changes?: {
    before: unknown;
    after: unknown;
  };
}

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'execute';
  conditions?: Record<string, unknown>;
}

export interface Role {
  name: string;
  description: string;
  permissions: Permission[];
  metadata?: Record<string, unknown>;
} 