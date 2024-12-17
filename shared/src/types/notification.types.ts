export type NotificationType = 'system' | 'user' | 'task' | 'alert' | 'service' | 'plugin';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type NotificationStatus = 'unread' | 'read' | 'archived' | 'deleted';
export type NotificationChannel = 'inApp' | 'email' | 'push' | 'slack' | 'discord' | 'webhook';
export type NotificationSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  source: NotificationSource;
  metadata?: Record<string, unknown>;
  actions?: NotificationAction[];
  expiresAt?: string;
  deliveryStatus?: NotificationDeliveryStatus[];
  tags?: string[];
}

export interface NotificationSource {
  type: string;
  id: string;
  name: string;
  icon?: string;
  url?: string;
}

export interface NotificationDeliveryStatus {
  channel: NotificationChannel;
  status: 'pending' | 'sent' | 'failed' | 'delivered' | 'read';
  timestamp: string;
  error?: string;
  attempts?: number;
  metadata?: Record<string, unknown>;
}

export interface SystemNotification extends BaseNotification {
  type: 'system';
  category: SystemNotificationCategory;
  details: SystemNotificationDetails;
  affectedComponents?: string[];
  resolution?: {
    type: 'automatic' | 'manual';
    steps?: string[];
    documentation?: string;
  };
}

export type SystemNotificationCategory = 
  | 'update'
  | 'security'
  | 'performance'
  | 'error'
  | 'warning'
  | 'info'
  | 'maintenance'
  | 'configuration';

export interface SystemNotificationDetails {
  code?: string;
  component?: string;
  action?: string;
  data?: Record<string, unknown>;
  stackTrace?: string;
  metrics?: Record<string, number>;
  recommendations?: string[];
}

export interface UserNotification extends BaseNotification {
  type: 'user';
  category: UserNotificationCategory;
  user: NotificationUser;
  action?: NotificationAction;
  relatedUsers?: NotificationUser[];
  context?: Record<string, unknown>;
}

export type UserNotificationCategory = 
  | 'account'
  | 'security'
  | 'activity'
  | 'social'
  | 'preferences'
  | 'permissions';

export interface NotificationUser {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  role?: string;
}

export interface TaskNotification extends BaseNotification {
  type: 'task';
  category: TaskNotificationCategory;
  task: TaskInfo;
  dependencies?: string[];
  artifacts?: TaskArtifact[];
  logs?: TaskLog[];
}

export type TaskNotificationCategory = 
  | 'backup'
  | 'sync'
  | 'maintenance'
  | 'deployment'
  | 'import'
  | 'export'
  | 'analysis';

export interface TaskInfo {
  id: string;
  name: string;
  status: TaskStatus;
  progress?: number;
  result?: Record<string, unknown>;
  startTime?: string;
  endTime?: string;
  duration?: number;
  retries?: number;
  priority?: number;
}

export type TaskStatus = 
  | 'pending'
  | 'queued'
  | 'running'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface TaskArtifact {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  metadata?: Record<string, unknown>;
}

export interface TaskLog {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, unknown>;
}

export interface AlertNotification extends BaseNotification {
  type: 'alert';
  category: AlertNotificationCategory;
  alert: AlertInfo;
  relatedAlerts?: string[];
  acknowledgment?: AlertAcknowledgment;
  escalation?: AlertEscalation;
}

export type AlertNotificationCategory = 
  | 'threshold'
  | 'anomaly'
  | 'availability'
  | 'security'
  | 'compliance'
  | 'resource';

export interface AlertInfo {
  name: string;
  condition: string;
  threshold?: number;
  current?: number;
  status: 'active' | 'acknowledged' | 'resolved';
  severity: NotificationSeverity;
  metrics?: Record<string, number>;
  frequency?: number;
  lastOccurrence?: string;
  nextCheck?: string;
}

export interface AlertAcknowledgment {
  userId: string;
  timestamp: string;
  comment?: string;
  duration?: number;
}

export interface AlertEscalation {
  level: number;
  policy: string;
  notifiedUsers: string[];
  nextEscalation?: string;
}

export interface ServiceNotification extends BaseNotification {
  type: 'service';
  category: ServiceNotificationCategory;
  service: ServiceInfo;
  dependencies?: ServiceDependency[];
  metrics?: ServiceMetrics;
}

export type ServiceNotificationCategory = 
  | 'status'
  | 'performance'
  | 'scaling'
  | 'configuration'
  | 'dependency';

export interface ServiceInfo {
  id: string;
  name: string;
  type: string;
  version: string;
  status: 'running' | 'degraded' | 'stopped' | 'starting' | 'stopping';
  health: NotificationSeverity;
}

export interface ServiceDependency {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'unhealthy' | 'unknown';
  impact: 'critical' | 'high' | 'medium' | 'low';
}

export interface ServiceMetrics {
  uptime: number;
  latency: number;
  errorRate: number;
  saturation: number;
  customMetrics?: Record<string, number>;
}

export interface PluginNotification extends BaseNotification {
  type: 'plugin';
  category: PluginNotificationCategory;
  plugin: PluginInfo;
  changes?: PluginChange[];
}

export type PluginNotificationCategory = 
  | 'installation'
  | 'update'
  | 'configuration'
  | 'error'
  | 'compatibility';

export interface PluginInfo {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'inactive' | 'error';
  compatibility: boolean;
  lastUpdate?: string;
}

export interface PluginChange {
  type: 'added' | 'removed' | 'modified';
  component: string;
  description: string;
  impact?: NotificationSeverity;
}

export type AppNotification =
  | SystemNotification
  | UserNotification
  | TaskNotification
  | AlertNotification
  | ServiceNotification
  | PluginNotification;

export interface NotificationPreferences {
  channels: NotificationChannelPreferences;
  categories: Record<string, NotificationCategoryPreference>;
  schedule?: NotificationSchedule;
  filters?: NotificationFilter[];
  grouping?: NotificationGrouping;
}

export interface NotificationChannelPreferences {
  inApp: boolean;
  email: boolean;
  push: boolean;
  slack?: boolean;
  discord?: boolean;
  webhook?: WebhookConfig[];
}

export interface WebhookConfig {
  url: string;
  secret?: string;
  events: string[];
  enabled: boolean;
  retries?: number;
}

export interface NotificationCategoryPreference {
  enabled: boolean;
  priority: NotificationPriority | 'all';
  channels?: NotificationChannel[];
  muteUntil?: string;
}

export interface NotificationSchedule {
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    days: number[];
    exceptions?: string[];
  };
  timezone: string;
  customSchedules?: Array<{
    name: string;
    schedule: string;
    channels: NotificationChannel[];
  }>;
}

export interface NotificationFilter {
  type: string;
  condition: 'include' | 'exclude';
  value: string | string[];
  priority?: NotificationPriority[];
  channels?: NotificationChannel[];
}

export interface NotificationGrouping {
  enabled: boolean;
  rules: Array<{
    type: string;
    field: string;
    interval?: number;
    maxSize?: number;
  }>;
}

export interface NotificationChannelConfig {
  type: NotificationChannel;
  enabled: boolean;
  config?: Record<string, unknown>;
  templates?: Record<string, NotificationTemplate>;
  deliveryRules?: NotificationDeliveryRule[];
}

export interface NotificationTemplate {
  subject?: string;
  body: string;
  format: 'text' | 'html' | 'markdown';
  variables?: string[];
}

export interface NotificationDeliveryRule {
  condition: Record<string, unknown>;
  priority?: NotificationPriority;
  template?: string;
  throttle?: {
    limit: number;
    window: number;
  };
}

export interface NotificationBadge {
  total: number;
  unread: number;
  priority: Record<NotificationPriority, number>;
  categories?: Record<string, number>;
}

export interface NotificationGroup {
  id: string;
  type: string;
  count: number;
  unread: number;
  notifications: AppNotification[];
  lastUpdated: string;
  summary?: string;
  preview?: AppNotification;
}

export interface NotificationAction {
  type: NotificationActionType;
  notificationIds: string[];
  metadata?: Record<string, unknown>;
  timestamp?: string;
  user?: string;
  result?: 'success' | 'failure';
}

export type NotificationActionType = 
  | 'mark_read'
  | 'mark_unread'
  | 'archive'
  | 'delete'
  | 'snooze'
  | 'escalate'
  | 'assign'
  | 'custom'; 