export interface FileSystemEntry {
  name: string;
  path: string;
  type: 'file' | 'directory' | 'symlink';
  size: number;
  created: string;
  modified: string;
  accessed: string;
  permissions: {
    owner: string;
    group: string;
    mode: number;
  };
  metadata?: {
    mimeType?: string;
    encoding?: string;
    isHidden?: boolean;
    isSystem?: boolean;
    isReadOnly?: boolean;
    isExecutable?: boolean;
  };
}

export interface FileSystemStats {
  totalSpace: number;
  freeSpace: number;
  availableSpace: number;
  usedSpace: number;
  inodes?: {
    total: number;
    used: number;
    free: number;
  };
  mountPoint?: string;
  fileSystem?: string;
}

export interface FileOperation {
  type: 'copy' | 'move' | 'delete' | 'create' | 'rename' | 'chmod' | 'chown';
  source: string;
  destination?: string;
  recursive?: boolean;
  overwrite?: boolean;
  preserveTimestamps?: boolean;
  preserveOwnership?: boolean;
  mode?: number;
  owner?: string;
  group?: string;
}

export interface FileOperationResult {
  success: boolean;
  operation: FileOperation;
  error?: {
    code: string;
    message: string;
    path?: string;
  };
  details?: {
    bytesProcessed?: number;
    filesProcessed?: number;
    skipped?: string[];
  };
}

export interface FileFilter {
  name?: string | RegExp;
  type?: 'file' | 'directory' | 'symlink';
  extension?: string[];
  minSize?: number;
  maxSize?: number;
  modifiedAfter?: string;
  modifiedBefore?: string;
  permissions?: {
    owner?: string;
    group?: string;
    mode?: number;
  };
  recursive?: boolean;
  depth?: number;
  followSymlinks?: boolean;
}

export interface FileWatcher {
  path: string;
  recursive?: boolean;
  filter?: FileFilter;
  events: Array<'create' | 'modify' | 'delete' | 'rename'>;
  callback: (event: FileSystemEvent) => void;
}

export interface FileSystemEvent {
  type: 'create' | 'modify' | 'delete' | 'rename';
  path: string;
  entry: FileSystemEntry;
  oldPath?: string;
  timestamp: string;
}

export interface FileContent {
  path: string;
  content: string | Buffer;
  encoding?: string;
  size: number;
  modified: string;
  metadata?: {
    mimeType?: string;
    lineEndings?: 'LF' | 'CRLF' | 'CR';
    bom?: boolean;
  };
}

export interface DirectoryContent {
  path: string;
  entries: FileSystemEntry[];
  filter?: FileFilter;
  stats: FileSystemStats;
}

export interface FileSystemError {
  code: string;
  message: string;
  path?: string;
  syscall?: string;
  errno?: number;
}

export interface FileSystemCapabilities {
  caseSensitive: boolean;
  supportsSymlinks: boolean;
  supportsHardlinks: boolean;
  supportsChmod: boolean;
  supportsChown: boolean;
  supportsTimestamps: boolean;
  maximumPathLength?: number;
  supportedEncodings: string[];
} 