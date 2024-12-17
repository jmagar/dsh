export type FileType = 
  | 'file'
  | 'directory'
  | 'symlink'
  | 'socket'
  | 'pipe'
  | 'block-device'
  | 'character-device'
  | 'unknown';

export interface FileStats {
  size: number;
  created: string;
  modified: string;
  accessed: string;
  mode: number;
  uid: number;
  gid: number;
  isDirectory: boolean;
  isFile: boolean;
  isSymlink: boolean;
}

export interface FileSystemEntry {
  name: string;
  path: string;
  type: FileType;
  stats: FileStats;
  extension?: string;
  mimeType?: string;
  symlink?: {
    target: string;
    broken: boolean;
  };
}

export interface DirectoryContents {
  path: string;
  entries: FileSystemEntry[];
  total: number;
  directories: number;
  files: number;
}

export interface FileSystemError {
  code: string;
  path: string;
  message: string;
  syscall?: string;
}

export interface FileOperationResult {
  success: boolean;
  error?: FileSystemError;
  path: string;
  operation: FileOperation;
  timestamp: string;
}

export type FileOperation = 
  | 'read'
  | 'write'
  | 'delete'
  | 'move'
  | 'copy'
  | 'rename'
  | 'chmod'
  | 'chown';

export interface FileFilter {
  name?: string | RegExp;
  type?: FileType[];
  extension?: string[];
  minSize?: number;
  maxSize?: number;
  modifiedAfter?: string;
  modifiedBefore?: string;
  permissions?: number;
}

export interface ExplorerState {
  currentPath: string;
  selected: string[];
  clipboard: {
    operation: 'copy' | 'cut' | null;
    paths: string[];
  };
  view: 'list' | 'grid' | 'details';
  sortBy: 'name' | 'size' | 'type' | 'modified';
  sortDirection: 'asc' | 'desc';
  filter: FileFilter;
  history: string[];
  loading: boolean;
  error: string | null;
}

export interface FileOperationOptions {
  overwrite?: boolean;
  recursive?: boolean;
  preserveTimestamps?: boolean;
  mode?: number;
  uid?: number;
  gid?: number;
}

// Breadcrumb navigation
export interface PathSegment {
  name: string;
  path: string;
  isRoot: boolean;
}

// Search functionality
export interface FileSearchOptions extends FileFilter {
  recursive?: boolean;
  maxDepth?: number;
  followSymlinks?: boolean;
  ignoreHidden?: boolean;
  ignorePatterns?: string[];
}

export interface FileSearchResult {
  path: string;
  matches: Array<{
    line: number;
    column: number;
    text: string;
  }>;
  stats: FileStats;
}

// Type guards
export const isFileSystemEntry = (data: unknown): data is FileSystemEntry => {
  if (typeof data !== 'object' || data === null) return false;
  
  const entry = data as Partial<FileSystemEntry>;
  return (
    typeof entry.name === 'string' &&
    typeof entry.path === 'string' &&
    typeof entry.type === 'string' &&
    typeof entry.stats === 'object' &&
    entry.stats !== null
  );
};

export const isFileStats = (data: unknown): data is FileStats => {
  if (typeof data !== 'object' || data === null) return false;
  
  const stats = data as Partial<FileStats>;
  return (
    typeof stats.size === 'number' &&
    typeof stats.created === 'string' &&
    typeof stats.modified === 'string' &&
    typeof stats.accessed === 'string' &&
    typeof stats.mode === 'number' &&
    typeof stats.uid === 'number' &&
    typeof stats.gid === 'number' &&
    typeof stats.isDirectory === 'boolean' &&
    typeof stats.isFile === 'boolean' &&
    typeof stats.isSymlink === 'boolean'
  );
}; 