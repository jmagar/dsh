import type { SSHConfig } from './ssh.types';

export interface SFTPConfig extends SSHConfig {
  autoReconnect?: boolean;
  maxConnections?: number;
  timeout?: number;
}

export interface SFTPTransfer {
  id: string;
  type: 'upload' | 'download';
  source: string;
  destination: string;
  size: number;
  transferred: number;
  progress: number;
  speed: number;
  status: 'pending' | 'active' | 'paused' | 'completed' | 'error';
  error?: string;
  startTime: string;
  endTime?: string;
}

export interface SFTPStats {
  mode: number;
  uid: number;
  gid: number;
  size: number;
  accessTime: string;
  modifyTime: string;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  permissions: {
    user: { read: boolean; write: boolean; execute: boolean };
    group: { read: boolean; write: boolean; execute: boolean };
    others: { read: boolean; write: boolean; execute: boolean };
  };
}

export interface SFTPOperationOptions {
  recursive?: boolean;
  overwrite?: boolean;
  preserveTimestamps?: boolean;
  concurrency?: number;
  progress?: (progress: number) => void;
}

export interface SFTPState {
  connected: boolean;
  currentPath: string;
  transfers: SFTPTransfer[];
  history: string[];
  loading: boolean;
  error: string | null;
}

// Type guards
export const isSFTPStats = (data: unknown): data is SFTPStats => {
  if (typeof data !== 'object' || data === null) return false;
  
  const stats = data as Partial<SFTPStats>;
  return (
    typeof stats.mode === 'number' &&
    typeof stats.size === 'number' &&
    typeof stats.isDirectory === 'boolean' &&
    typeof stats.isFile === 'boolean'
  );
}; 