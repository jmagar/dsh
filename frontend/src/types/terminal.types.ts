export type TerminalTheme = 'light' | 'dark' | 'system';

export interface TerminalOptions {
  fontSize: number;
  fontFamily: string;
  theme: TerminalTheme;
  cursorStyle: 'block' | 'underline' | 'bar';
  cursorBlink: boolean;
  scrollback: number;
  tabStopWidth: number;
}

export interface TerminalCommand {
  id: string;
  command: string;
  timestamp: string;
  output?: string;
  exitCode?: number;
  duration?: number;
  user?: string;
  workingDirectory?: string;
}

export interface TerminalSession {
  id: string;
  name: string;
  pid?: number;
  shell: string;
  columns: number;
  rows: number;
  createdAt: string;
  lastActivity: string;
  connected: boolean;
}

export interface TerminalSize {
  cols: number;
  rows: number;
}

export interface TerminalState {
  sessions: TerminalSession[];
  activeSession: string | null;
  history: TerminalCommand[];
  options: TerminalOptions;
  loading: boolean;
  error: string | null;
}

// Terminal events
export type TerminalEventType = 
  | 'data'
  | 'resize'
  | 'exit'
  | 'disconnect'
  | 'reconnect'
  | 'error';

export interface TerminalEvent {
  type: TerminalEventType;
  sessionId: string;
  data?: string | TerminalSize;
  timestamp: string;
  error?: Error;
}

// Type guards
export const isTerminalEvent = (data: unknown): data is TerminalEvent => {
  if (typeof data !== 'object' || data === null) return false;
  
  const event = data as Partial<TerminalEvent>;
  return (
    typeof event.type === 'string' &&
    typeof event.sessionId === 'string' &&
    typeof event.timestamp === 'string' &&
    ['data', 'resize', 'exit', 'disconnect', 'reconnect', 'error'].includes(event.type)
  );
}; 