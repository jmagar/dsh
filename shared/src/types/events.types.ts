export interface BaseEvent {
  id: string;
  type: string;
  timestamp: string;
  source: {
    type: string;
    id: string;
    name: string;
  };
  metadata?: Record<string, unknown>;
}

export interface SystemEvent extends BaseEvent {
  type: 'system';
  subtype: 'startup' | 'shutdown' | 'update' | 'error' | 'warning';
  details: {
    message: string;
    code?: string;
    level: 'info' | 'warning' | 'error';
    component?: string;
  };
}

export interface ResourceEvent extends BaseEvent {
  type: 'resource';
  subtype: 'created' | 'updated' | 'deleted' | 'state_changed';
  resource: {
    type: string;
    id: string;
    name: string;
  };
  changes?: Array<{
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }>;
}

export interface UserEvent extends BaseEvent {
  type: 'user';
  subtype: 'login' | 'logout' | 'password_changed' | 'profile_updated' | 'settings_changed';
  user: {
    id: string;
    username: string;
  };
  details?: Record<string, unknown>;
}

export interface SecurityEvent extends BaseEvent {
  type: 'security';
  subtype: 'authentication' | 'authorization' | 'audit';
  details: {
    action: string;
    status: 'success' | 'failure';
    reason?: string;
    user?: {
      id: string;
      username: string;
    };
    resource?: {
      type: string;
      id: string;
    };
  };
}

export interface TaskEvent extends BaseEvent {
  type: 'task';
  subtype: 'scheduled' | 'started' | 'completed' | 'failed' | 'cancelled';
  task: {
    id: string;
    name: string;
    type: string;
  };
  status: {
    state: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
    progress?: number;
    error?: {
      message: string;
      code?: string;
    };
  };
}

export interface WebSocketEvent extends BaseEvent {
  type: 'websocket';
  subtype: 'connected' | 'disconnected' | 'error' | 'message';
  connection: {
    id: string;
    clientId: string;
  };
  payload?: unknown;
}

export type AppEvent =
  | SystemEvent
  | ResourceEvent
  | UserEvent
  | SecurityEvent
  | TaskEvent
  | WebSocketEvent;

export interface EventSubscriber {
  id: string;
  types: string[];
  filter?: (event: AppEvent) => boolean;
  handler: (event: AppEvent) => void | Promise<void>;
}

export interface EventBus {
  publish: (event: AppEvent) => Promise<void>;
  subscribe: (subscriber: EventSubscriber) => () => void;
  unsubscribe: (subscriberId: string) => void;
  getHistory: (options?: {
    types?: string[];
    startTime?: string;
    endTime?: string;
    limit?: number;
  }) => Promise<AppEvent[]>;
} 