import type { User } from './core.types.js';

export interface WebSocketConfig {
  port: number;
  path: string;
  heartbeatInterval: number;
  maxPayloadSize: number;
  pingTimeout?: number;
  pingInterval?: number;
  clientTracking?: boolean;
  perMessageDeflate?: boolean | PerMessageDeflateOptions;
  ssl?: WebSocketSSLConfig;
}

export interface PerMessageDeflateOptions {
  serverNoContextTakeover?: boolean;
  clientNoContextTakeover?: boolean;
  serverMaxWindowBits?: number;
  clientMaxWindowBits?: number;
  zlibInflateOptions?: {
    chunkSize?: number;
    windowBits?: number;
    level?: number;
    memLevel?: number;
    strategy?: number;
  };
  zlibDeflateOptions?: {
    chunkSize?: number;
    windowBits?: number;
    level?: number;
    memLevel?: number;
    strategy?: number;
  };
  threshold?: number;
}

export interface WebSocketSSLConfig {
  key: string;
  cert: string;
  ca?: string[];
  passphrase?: string;
}

export interface WebSocketClient {
  id: string;
  connected: boolean;
  lastHeartbeat: string;
  user?: User;
  ip?: string;
  userAgent?: string;
  protocol?: string;
  subscriptions: Set<string>;
  metadata?: Record<string, unknown>;
  stats: WebSocketClientStats;
}

export interface WebSocketClientStats {
  connectedAt: Date;
  messagesSent: number;
  messagesReceived: number;
  bytesReceived: number;
  bytesSent: number;
  lastMessageAt?: Date;
  lastErrorAt?: Date;
  reconnectCount: number;
}

export interface WebSocketMessage<T = unknown> {
  id: string;
  type: WebSocketMessageType;
  payload: T;
  timestamp: Date;
  clientId: string;
  userId?: string;
}

export type WebSocketMessageType =
  | 'connect'
  | 'disconnect'
  | 'subscribe'
  | 'unsubscribe'
  | 'message'
  | 'error'
  | 'heartbeat'
  | 'broadcast'
  | 'command'
  | 'event';

export interface WebSocketRoom {
  id: string;
  name: string;
  clients: Set<string>;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  lastActivityAt: Date;
}

export interface WebSocketSubscription {
  clientId: string;
  room: string;
  joinedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface WebSocketBroadcastOptions {
  rooms?: string[];
  exclude?: string[];
  volatile?: boolean;
  compress?: boolean;
  binary?: boolean;
}

export interface WebSocketError extends Error {
  code: number;
  reason?: string;
  client?: WebSocketClient;
}

export type WebSocketErrorCode =
  | 1000 // Normal Closure
  | 1001 // Going Away
  | 1002 // Protocol Error
  | 1003 // Unsupported Data
  | 1004 // Reserved
  | 1005 // No Status Received
  | 1006 // Abnormal Closure
  | 1007 // Invalid Frame Payload Data
  | 1008 // Policy Violation
  | 1009 // Message Too Big
  | 1010 // Mandatory Extension
  | 1011 // Internal Server Error
  | 1012 // Service Restart
  | 1013 // Try Again Later
  | 1014 // Bad Gateway
  | 1015; // TLS Handshake

export interface WebSocketStats {
  startTime: Date;
  uptime: number;
  totalConnections: number;
  activeConnections: number;
  totalMessages: number;
  totalBytes: number;
  rooms: number;
  subscriptions: number;
  errors: number;
}

export interface WebSocketMiddleware {
  name: string;
  enabled: boolean;
  priority: number;
  handler: WebSocketMiddlewareHandler;
}

export type WebSocketMiddlewareHandler = (
  client: WebSocketClient,
  message: WebSocketMessage,
  next: (error?: Error) => void
) => Promise<void> | void;

export interface WebSocketAuthenticator {
  validate: (token: string) => Promise<User | null>;
  generateToken: (user: User) => Promise<string>;
}

export interface WebSocketLogger {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
} 