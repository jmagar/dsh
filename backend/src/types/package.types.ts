export interface PackageMetadata {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  dependencies: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  repository?: {
    type: string;
    url: string;
  };
  keywords?: string[];
  bugs?: {
    url: string;
    email?: string;
  };
  homepage?: string;
}

export interface PackageManager {
  type: 'npm' | 'yarn' | 'pnpm';
  version: string;
  lockfileVersion: number;
}

export interface PackageDependency {
  name: string;
  version: string;
  resolved: string;
  integrity?: string;
  requires?: Record<string, string>;
  dependencies?: Record<string, PackageDependency>;
}

export interface PackageLock {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  packages: Record<string, PackageDependency>;
  dependencies: Record<string, PackageDependency>;
}

export interface PackageScript {
  name: string;
  command: string;
  description?: string;
  env?: Record<string, string>;
  cwd?: string;
}

export interface PackageConfig {
  registry?: string;
  scope?: string;
  access?: 'public' | 'restricted';
  proxy?: string;
  httpsProxy?: string;
  noproxy?: string[];
  maxSockets?: number;
  cafile?: string;
  strictSSL?: boolean;
}

export interface PackageAudit {
  level: 'info' | 'low' | 'moderate' | 'high' | 'critical';
  type: string;
  vulnerable_versions: string;
  patched_versions: string;
  title: string;
  description: string;
  recommendation: string;
  references: string[];
  findings: Array<{
    version: string;
    paths: string[];
  }>;
}

export interface PackageUpdate {
  name: string;
  current: string;
  wanted: string;
  latest: string;
  dependent: string;
  location: string;
}

export interface PackageRegistry {
  name: string;
  url: string;
  token?: string;
  username?: string;
  password?: string;
  email?: string;
  scope?: string;
} 