export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  repository?: string;
  main: string;
  enabled: boolean;
  dependencies?: Record<string, string>;
  config?: PluginConfig;
  hooks?: PluginHooks;
  api?: PluginAPI;
}

export interface PluginConfig {
  schema: Record<string, unknown>;
  defaults: Record<string, unknown>;
  current: Record<string, unknown>;
}

export interface PluginHooks {
  onInstall?: () => Promise<void>;
  onUninstall?: () => Promise<void>;
  onEnable?: () => Promise<void>;
  onDisable?: () => Promise<void>;
  onUpdate?: (previousVersion: string) => Promise<void>;
  onConfigChange?: (newConfig: Record<string, unknown>) => Promise<void>;
}

export interface PluginAPI {
  routes?: PluginRoute[];
  middleware?: PluginMiddleware[];
  services?: PluginService[];
  commands?: PluginCommand[];
  events?: PluginEvent[];
}

export interface PluginRoute {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  handler: (req: unknown, res: unknown) => Promise<void>;
  middleware?: PluginMiddleware[];
}

export interface PluginMiddleware {
  name: string;
  priority?: number;
  handler: (req: unknown, res: unknown, next: () => void) => Promise<void>;
}

export interface PluginService {
  name: string;
  implementation: unknown;
}

export interface PluginCommand {
  name: string;
  description: string;
  usage: string;
  handler: (args: string[]) => Promise<void>;
}

export interface PluginEvent {
  name: string;
  handler: (data: unknown) => Promise<void>;
}

export interface PluginManager {
  install: (pluginPath: string) => Promise<void>;
  uninstall: (pluginId: string) => Promise<void>;
  enable: (pluginId: string) => Promise<void>;
  disable: (pluginId: string) => Promise<void>;
  update: (pluginId: string) => Promise<void>;
  getPlugin: (pluginId: string) => Plugin | undefined;
  listPlugins: () => Plugin[];
}

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  size: number;
  checksum: string;
  downloadUrl: string;
  dependencies: Record<string, string>;
  compatibility: {
    platform: string[];
    minVersion: string;
    maxVersion?: string;
  };
}

export interface PluginRegistry {
  register: (plugin: Plugin) => void;
  unregister: (pluginId: string) => void;
  get: (pluginId: string) => Plugin | undefined;
  list: () => Plugin[];
  clear: () => void;
}

export interface PluginError extends Error {
  pluginId: string;
  code: string;
  details?: Record<string, unknown>;
}

export type PluginStatus = 'installed' | 'enabled' | 'disabled' | 'error' | 'updating' | 'uninstalling'; 