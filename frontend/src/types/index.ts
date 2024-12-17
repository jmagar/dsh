// Import shared types
import type {
  AgentStatus,
  DockerStats,
  SystemMetrics,
  SSHConfig,
  SFTPConfig
} from '@dsh/shared/types/index.js';

// Export UI-specific types
export * from './ui.types.js';
export * from './components.types.js';
export * from './editor.types.js';
export * from './logviewer.types.js';
export * from './terminal.types.js';
export * from './explorer.types.js';
export * from './redux.types.js';
export * from './events.types.js';
export * from './api.types.js';
export * from './error.types.js';
export * from './notification.types.js';
export * from './route.types.js';
export * from './config.types.js';

// Re-export shared types
export type {
  AgentStatus,
  DockerStats,
  SystemMetrics,
  SSHConfig,
  SFTPConfig
};
