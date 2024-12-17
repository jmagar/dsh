// WebSocket event types
export interface WebSocketEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: string;
  sessionId?: string;
}

// Custom event types
export interface CustomEvent<T = unknown> {
  type: string;
  detail: T;
  timestamp: string;
}

// Event handler types
export type EventHandler<T = unknown> = (event: T) => void;
export type AsyncEventHandler<T = unknown> = (event: T) => Promise<void>;

// Event subscription types
export interface EventSubscription {
  unsubscribe: () => void;
}

export interface EventEmitter {
  on: (event: string, handler: EventHandler) => EventSubscription;
  off: (event: string, handler: EventHandler) => void;
  emit: (event: string, payload: unknown) => void;
} 