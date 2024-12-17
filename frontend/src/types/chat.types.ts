import type { BaseMetadata } from '@dsh/shared';

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  timestamp: string;
  type: 'user' | 'system' | 'error';
}

export interface WebSocketMessage {
  type: 'message' | 'error';
  message?: ChatMessage;
  error?: string;
  sessionId?: string;
  content?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMetadata extends BaseMetadata {
  target?: string;
  sessionId?: string;
  messageId?: string;
}

// Type guards
export const isChatMessage = (data: unknown): data is ChatMessage => {
  if (data === null || typeof data !== 'object') return false;
  
  const msg = data as Partial<ChatMessage>;
  return (
    typeof msg.id === 'string' &&
    typeof msg.sessionId === 'string' &&
    typeof msg.content === 'string' &&
    typeof msg.timestamp === 'string' &&
    (msg.type === 'user' || msg.type === 'system' || msg.type === 'error')
  );
};

export const isWebSocketMessage = (data: unknown): data is WebSocketMessage => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const msg = data as Partial<WebSocketMessage>;
  return typeof msg.type === 'string' && 
    (msg.type === 'message' || msg.type === 'error');
};

export const isWebSocketErrorMessage = (data: WebSocketMessage): data is WebSocketMessage & { type: 'error', error: string } => {
  return data.type === 'error' && typeof data.error === 'string';
};

export const isWebSocketChatMessage = (data: WebSocketMessage): data is WebSocketMessage & { type: 'message', message: ChatMessage } => {
  return data.type === 'message' && typeof data.message !== 'undefined' && isChatMessage(data.message);
};

export const isChatSession = (data: unknown): data is ChatSession => {
  if (data === null || typeof data !== 'object') return false;
  
  const session = data as Partial<ChatSession>;
  return (
    typeof session.id === 'string' &&
    typeof session.name === 'string' &&
    typeof session.createdAt === 'string' &&
    typeof session.updatedAt === 'string'
  );
};

export const isChatMessageArray = (data: unknown): data is ChatMessage[] => {
  return Array.isArray(data) && data.every(isChatMessage);
};

export const isChatSessionArray = (data: unknown): data is ChatSession[] => {
  return Array.isArray(data) && data.every(isChatSession);
};

export interface UseChatReturn {
  messages: ChatMessage[];
  sessions: ChatSession[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
  createSession: (name: string) => Promise<ChatSession>;
  deleteSession: (id: string) => Promise<void>;
  refreshSessions: () => Promise<void>;
}

export interface UseChatProps {
  sessionId?: string;
  onError?: (error: string) => void;
}
