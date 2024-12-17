import type { SSHConfig } from './ssh.types.js';

export interface SFTPConfig extends SSHConfig {
  autoReconnect?: boolean;
  maxConnections?: number;
  timeout?: number;
}

// ... rest of SFTP types from frontend/src/types/sftp.types.ts 