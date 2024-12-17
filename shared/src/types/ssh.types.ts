// Move from frontend/src/types/ssh.types.ts
export interface SSHConfig {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
  passphrase?: string;
  keepaliveInterval?: number;
  readyTimeout?: number;
  strictHostKeyChecking?: boolean;
  knownHosts?: string[];
}

export interface SSHSession {
  id: string;
  config: SSHConfig;
  connected: boolean;
  lastActivity: string;
  error?: string;
}

export interface SSHExecOptions {
  cwd?: string;
  env?: Record<string, string>;
  pty?: boolean;
  timeout?: number;
  maxBuffer?: number;
  signal?: AbortSignal;
}

export interface SSHExecResult {
  code: number;
  signal?: string;
  stdout: string;
  stderr: string;
  duration: number;
}

export interface SSHForwardConfig {
  remoteHost: string;
  remotePort: number;
  localPort?: number;
  localHost?: string;
}

export interface SSHKeyPair {
  publicKey: string;
  privateKey: string;
  passphrase?: string;
  type: 'rsa' | 'dsa' | 'ecdsa' | 'ed25519';
  size?: number;
  fingerprint: string;
}

export interface SSHKnownHost {
  host: string;
  type: string;
  key: string;
  fingerprint: string;
  comment?: string;
}

export interface SSHTunnelConfig extends SSHConfig {
  localPort: number;
  remoteHost: string;
  remotePort: number;
  keepAlive?: boolean;
  reconnect?: boolean;
  reconnectDelay?: number;
  maxRetries?: number;
}

export interface SSHShell {
  id: string;
  sessionId: string;
  cols: number;
  rows: number;
  term: string;
  createdAt: string;
  lastActivity: string;
}

export interface SSHStats {
  bytesReceived: number;
  bytesSent: number;
  packetsReceived: number;
  packetsSent: number;
  errors: number;
  retries: number;
  latency: number;
}

export interface SSHState {
  sessions: SSHSession[];
  shells: SSHShell[];
  tunnels: Array<{
    config: SSHTunnelConfig;
    active: boolean;
    error?: string;
  }>;
  knownHosts: SSHKnownHost[];
  loading: boolean;
  error: string | null;
}

// Type guards
export const isSSHConfig = (data: unknown): data is SSHConfig => {
  if (typeof data !== 'object' || data === null) return false;
  
  const config = data as Partial<SSHConfig>;
  return (
    typeof config.host === 'string' &&
    typeof config.port === 'number' &&
    typeof config.username === 'string'
  );
};

export const isSSHSession = (data: unknown): data is SSHSession => {
  if (typeof data !== 'object' || data === null) return false;
  
  const session = data as Partial<SSHSession>;
  return (
    typeof session.id === 'string' &&
    isSSHConfig(session.config) &&
    typeof session.connected === 'boolean' &&
    typeof session.lastActivity === 'string'
  );
};

export const isSSHKeyPair = (data: unknown): data is SSHKeyPair => {
  if (typeof data !== 'object' || data === null) return false;
  
  const keyPair = data as Partial<SSHKeyPair>;
  return (
    typeof keyPair.publicKey === 'string' &&
    typeof keyPair.privateKey === 'string' &&
    typeof keyPair.type === 'string' &&
    typeof keyPair.fingerprint === 'string'
  );
};
// ... rest of shared SSH types 