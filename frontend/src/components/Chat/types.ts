import { Message, ChatSession } from '@/client/types/chat.types';

export interface ChatState {
  sessions: ChatSession[];
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface ChatHook {
  sessions: ChatSession[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  createSession: (name: string) => Promise<ChatSession>;
  deleteSession: (id: string) => Promise<void>;
  refreshSessions: () => Promise<void>;
}

export interface ChatProps {
  initialSessionId?: string;
}
