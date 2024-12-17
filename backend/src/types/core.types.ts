export interface Plugin {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  dependencies: string[];
  config: Record<string, unknown>;
  hooks: {
    onInstall?: () => Promise<void>;
    onUninstall?: () => Promise<void>;
    onEnable?: () => Promise<void>;
    onDisable?: () => Promise<void>;
    onUpdate?: (prevVersion: string) => Promise<void>;
  };
  permissions: Array<{
    resource: string;
    actions: string[];
  }>;
}

export interface PluginManager {
  installedPlugins: Plugin[];
  loadPlugin: (id: string) => Promise<void>;
  unloadPlugin: (id: string) => Promise<void>;
  enablePlugin: (id: string) => Promise<void>;
  disablePlugin: (id: string) => Promise<void>;
  updatePlugin: (id: string, version: string) => Promise<void>;
}

export interface ServiceWorker {
  id: string;
  scriptUrl: string;
  scope: string;
  status: 'installing' | 'installed' | 'activating' | 'activated' | 'redundant';
  registrationTime: string;
  lastUpdateCheck: string;
  clients: Array<{
    id: string;
    url: string;
    type: 'window' | 'worker' | 'sharedworker';
  }>;
}

export interface ServiceWorkerManager {
  register: (scriptUrl: string, options?: ServiceWorkerOptions) => Promise<void>;
  unregister: (scope: string) => Promise<void>;
  update: (scope: string) => Promise<void>;
  getRegistrations: () => Promise<ServiceWorker[]>;
  addEventListener: (event: ServiceWorkerEvent, handler: (event: ServiceWorkerEventData) => void) => void;
}

export interface ServiceWorkerOptions {
  scope?: string;
  type?: 'classic' | 'module';
  updateViaCache?: 'none' | 'all' | 'imports';
}

export type ServiceWorkerEvent = 
  | 'install'
  | 'activate'
  | 'fetch'
  | 'push'
  | 'sync'
  | 'message'
  | 'notificationclick'
  | 'notificationclose';

export interface ServiceWorkerEventData {
  type: ServiceWorkerEvent;
  target: ServiceWorker;
  timestamp: number;
  data?: unknown;
}

export interface WebSocketRequest {
  url: string;
  headers: Record<string, string>;
  method: string;
  query: Record<string, string>;
}

export interface WebSocketMessage {
  type: 'text' | 'binary' | 'ping' | 'pong';
  data: string | Buffer;
  timestamp: number;
  size: number;
}

export interface WebSocketHandler {
  path: string;
  protocols: string[];
  maxConnections: number;
  pingInterval: number;
  timeout: number;
  handlers: {
    onConnect: (socket: WebSocket, request: WebSocketRequest) => void;
    onMessage: (socket: WebSocket, message: WebSocketMessage) => void;
    onClose: (socket: WebSocket, code: number, reason: string) => void;
    onError: (socket: WebSocket, error: Error) => void;
  };
  middleware?: Array<(socket: WebSocket, next: () => void) => void>;
}

export interface WebSocketConnection {
  id: string;
  socket: WebSocket;
  createdAt: string;
  lastPing: string;
  metadata: Record<string, unknown>;
  stats: {
    messagesReceived: number;
    messagesSent: number;
    bytesReceived: number;
    bytesSent: number;
  };
}

export interface AuthProvider {
  id: string;
  name: string;
  type: 'oauth' | 'oidc' | 'saml' | 'local';
  enabled: boolean;
  config: {
    clientId?: string;
    clientSecret?: string;
    authorizationUrl?: string;
    tokenUrl?: string;
    userInfoUrl?: string;
    scope?: string[];
    callbackUrl: string;
  };
  userMapping: {
    id: string;
    email: string;
    name?: string;
    roles?: string[];
    [key: string]: unknown;
  };
}

export interface AuthSession {
  id: string;
  userId: string;
  provider: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
  scope: string[];
  metadata: Record<string, unknown>;
}

export interface AuthenticationResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name?: string;
    roles: string[];
    permissions: string[];
  };
  session?: AuthSession;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  permissions: string[];
  preferences?: UserPreferences;
  metadata?: Record<string, unknown>;
  status: UserStatus;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  notifications?: NotificationPreferences;
  display?: DisplayPreferences;
}

export interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  desktop?: boolean;
  mobile?: boolean;
  types?: Record<string, boolean>;
}

export interface DisplayPreferences {
  density?: 'compact' | 'comfortable' | 'spacious';
  fontSize?: 'small' | 'medium' | 'large';
  colorMode?: 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  animations?: boolean;
}

export interface CoreConfig {
  appName: string;
  version: string;
  environment: string;
  debug: boolean;
  features: Record<string, boolean>;
  defaults: {
    language: string;
    timezone: string;
    theme: string;
  };
}

export interface SystemInfo {
  os: {
    platform: string;
    release: string;
    arch: string;
  };
  runtime: {
    version: string;
    env: string;
  };
  process: {
    pid: number;
    uptime: number;
    memory: {
      total: number;
      free: number;
      used: number;
    };
  };
}

export interface AppInfo {
  name: string;
  version: string;
  description?: string;
  homepage?: string;
  repository?: string;
  dependencies: Record<string, string>;
  engines?: {
    node?: string;
    npm?: string;
  };
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
  conditions?: FeatureCondition[];
  rolloutPercentage?: number;
  metadata?: Record<string, unknown>;
}

export interface FeatureCondition {
  type: 'user' | 'role' | 'environment' | 'date' | 'custom';
  value: unknown;
  operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan';
}

export interface CoreEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: Date;
  data: T;
  source: string;
  correlationId?: string;
  metadata?: Record<string, unknown>;
}

export interface CoreError extends Error {
  code: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  timestamp: Date;
  correlationId?: string;
  source?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterOptions {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like' | 'nlike';
  value: unknown;
}

export interface SearchOptions {
  query: string;
  fields: string[];
  fuzzy?: boolean;
  boost?: Record<string, number>;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: Date;
  changes?: {
    before: Record<string, unknown>;
    after: Record<string, unknown>;
  };
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
} 