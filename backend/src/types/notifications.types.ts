export interface NotificationProvider {
  id: string;
  type: 'gotify' | 'telegram' | 'discord' | 'slack' | 'email' | 'webhook';
  name: string;
  enabled: boolean;
  config: NotificationConfig;
}

export type NotificationConfig = 
  | GotifyConfig 
  | TelegramConfig 
  | DiscordConfig 
  | SlackConfig 
  | EmailConfig 
  | WebhookConfig;

export interface GotifyConfig {
  url: string;
  token: string;
  priority?: number;
  extras?: Record<string, string>;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string | number;
  parseMode?: 'Markdown' | 'HTML';
  disableNotification?: boolean;
  disableWebPagePreview?: boolean;
}

export interface DiscordConfig {
  webhookUrl: string;
  username?: string;
  avatarUrl?: string;
  tts?: boolean;
  embeds?: boolean;
}

export interface SlackConfig {
  webhookUrl: string;
  channel?: string;
  username?: string;
  iconUrl?: string;
  iconEmoji?: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string[];
  tls?: {
    rejectUnauthorized?: boolean;
    ciphers?: string;
  };
}

export interface WebhookConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  bodyTemplate?: string;
  timeout?: number;
}

export interface NotificationMessage {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  timestamp: string;
  source: {
    type: string;
    id: string;
    name: string;
  };
  metadata?: Record<string, unknown>;
  actions?: NotificationAction[];
  tags?: string[];
}

export interface NotificationAction {
  id: string;
  label: string;
  type: 'button' | 'link';
  url?: string;
  callback?: string;
  style?: 'default' | 'primary' | 'danger';
}

export interface NotificationDelivery {
  id: string;
  messageId: string;
  providerId: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  timestamp: string;
  attempts: number;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface NotificationPreferences {
  userId: string;
  providers: Array<{
    id: string;
    enabled: boolean;
    priority: 'all' | 'high' | 'urgent';
  }>;
  schedule?: {
    quiet: {
      start: string;
      end: string;
      days: number[];
    };
    timezone: string;
  };
  filters?: Array<{
    type: string;
    priority: string[];
    tags: string[];
    sources: string[];
  }>;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  description?: string;
  type: string;
  content: string;
  variables: Array<{
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required: boolean;
    default?: unknown;
  }>;
  providers?: string[];
} 