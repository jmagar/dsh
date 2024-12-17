export interface BaseNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'unread' | 'read' | 'archived' | 'deleted';
  source: {
    type: string;
    id: string;
    name: string;
  };
  metadata?: Record<string, unknown>;
}

export interface SystemNotification extends BaseNotification {
  type: 'system';
  category: 'update' | 'security' | 'performance' | 'error' | 'warning' | 'info';
  details: {
    code?: string;
    component?: string;
    action?: string;
    data?: Record<string, unknown>;
  };
}

export interface UserNotification extends BaseNotification {
  type: 'user';
  category: 'account' | 'security' | 'activity' | 'social';
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  action?: {
    type: string;
    label: string;
    url?: string;
    data?: Record<string, unknown>;
  };
}

export interface TaskNotification extends BaseNotification {
  type: 'task';
  category: 'backup' | 'sync' | 'maintenance' | 'deployment';
  task: {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress?: number;
    result?: Record<string, unknown>;
  };
}

export interface AlertNotification extends BaseNotification {
  type: 'alert';
  category: 'threshold' | 'anomaly' | 'availability' | 'security';
  alert: {
    name: string;
    condition: string;
    threshold?: number;
    current?: number;
    status: 'active' | 'resolved';
    severity: 'info' | 'warning' | 'error' | 'critical';
  };
}

export type AppNotification =
  | SystemNotification
  | UserNotification
  | TaskNotification
  | AlertNotification;

export interface NotificationPreferences {
  channels: {
    inApp: boolean;
    email: boolean;
    push: boolean;
    slack?: boolean;
    discord?: boolean;
  };
  categories: Record<string, {
    enabled: boolean;
    priority: 'all' | 'high' | 'urgent';
  }>;
  schedule?: {
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
      days: number[];
    };
    timezone: string;
  };
}

export interface NotificationChannel {
  type: 'inApp' | 'email' | 'push' | 'slack' | 'discord';
  enabled: boolean;
  config?: Record<string, unknown>;
  templates?: Record<string, string>;
}

export interface NotificationBadge {
  total: number;
  unread: number;
  priority: {
    low: number;
    normal: number;
    high: number;
    urgent: number;
  };
}

export interface NotificationGroup {
  id: string;
  type: string;
  count: number;
  unread: number;
  notifications: AppNotification[];
  lastUpdated: string;
}

export interface NotificationAction {
  type: 'mark_read' | 'mark_unread' | 'archive' | 'delete' | 'custom';
  notificationIds: string[];
  metadata?: Record<string, unknown>;
} 