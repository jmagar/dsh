export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  timestamp: string;
  type: 'user' | 'system' | 'error';
}

export interface ChatSession {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMetadata {
  target?: string;
  sessionId?: string;
  messageId?: string;
  userId?: string;
  context?: Record<string, unknown>;
}

export interface ChatConfig {
  maxMessageLength: number;
  maxHistoryLength: number;
  timeoutSeconds: number;
  retryAttempts: number;
  retryDelayMs: number;
}

export interface ChatStreamOptions {
  sessionId: string;
  maxTokens?: number;
  temperature?: number;
  stopSequences?: string[];
  timeoutMs?: number;
}

// Type guards
export const isChatMessage = (data: unknown): data is ChatMessage => {
  if (typeof data !== 'object' || data === null) return false;
  
  const msg = data as Partial<ChatMessage>;
  return (
    typeof msg.id === 'string' &&
    typeof msg.sessionId === 'string' &&
    typeof msg.content === 'string' &&
    typeof msg.timestamp === 'string' &&
    (msg.type === 'user' || msg.type === 'system' || msg.type === 'error')
  );
};

export const isChatSession = (data: unknown): data is ChatSession => {
  if (typeof data !== 'object' || data === null) return false;
  
  const session = data as Partial<ChatSession>;
  return (
    typeof session.id === 'string' &&
    typeof session.name === 'string' &&
    typeof session.createdAt === 'string' &&
    typeof session.updatedAt === 'string'
  );
}; 