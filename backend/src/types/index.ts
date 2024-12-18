// Import shared types using configured path alias
import type * as SharedTypes from '@dsh/shared/types/index.js';

// Backend-specific types
import type * as AuthTypes from './auth.types.js';
import type * as CoreTypes from './core.types.js';
import type * as DatabaseTypes from './database.types.js';
import type * as DockerTypes from './docker.types.js';
import type * as MiddlewareTypes from './middleware.types.js';
import type * as NetworkTypes from './network.types.js';
import type * as NotificationTypes from './notifications.types.js';
import type * as PackageTypes from './package.types.js';
import type * as PluginTypes from './plugin.types.js';
import type * as QueueTypes from './queue.types.js';
import type * as SchedulerTypes from './scheduler.types.js';
import type * as ServiceTypes from './service.types.js';
import type * as UnraidTypes from './unraid.types.js';
import type * as ValidationTypes from './validation.types.js';
import type * as WebSocketTypes from './websocket.types.js';

// Export all types under namespaces to avoid conflicts
export {
  SharedTypes,
  AuthTypes,
  CoreTypes,
  DatabaseTypes,
  DockerTypes,
  MiddlewareTypes,
  NetworkTypes,
  NotificationTypes,
  PackageTypes,
  PluginTypes,
  QueueTypes,
  SchedulerTypes,
  ServiceTypes,
  UnraidTypes,
  ValidationTypes,
  WebSocketTypes,
}; 