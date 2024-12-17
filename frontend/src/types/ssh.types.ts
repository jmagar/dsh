export interface SSHConfig {
  host: string;
  port: number;
  username: string;
  privateKey?: string;
  password?: string;
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
  startTime: string;
  lastActivity: string;
}

export interface SSHExecOptions {
  cwd?: string;
  env?: Record<string, string>;
  pty?: boolean;
  timeout?: number;
  signal?: AbortSignal;
}

export interface SSHExecResult {
  stdout: string;
  stderr: string;
  code: number;
  signal?: string;
  duration: number;
}

export interface SSHForwardConfig {
  remoteHost: string;
  remotePort: number;
  localPort: number;
  localHost?: string;
}

export interface SSHKeyPair {
  publicKey: string;
  privateKey: string;
  passphrase?: string;
  type: 'rsa' | 'ed25519' | 'ecdsa';
  comment?: string;
  fingerprint: string;
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