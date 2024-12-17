export type SyslogSeverity = 
  | 'emergency'   // 0 - System is unusable
  | 'alert'       // 1 - Action must be taken immediately
  | 'critical'    // 2 - Critical conditions
  | 'error'       // 3 - Error conditions
  | 'warning'     // 4 - Warning conditions
  | 'notice'      // 5 - Normal but significant condition
  | 'info'        // 6 - Informational messages
  | 'debug';      // 7 - Debug-level messages

export type SyslogFacility =
  | 'kern'        // 0 - Kernel messages
  | 'user'        // 1 - User-level messages
  | 'mail'        // 2 - Mail system
  | 'daemon'      // 3 - System daemons
  | 'auth'        // 4 - Security/authorization messages
  | 'syslog'      // 5 - Messages generated internally by syslogd
  | 'lpr'         // 6 - Line printer subsystem
  | 'news'        // 7 - Network news subsystem
  | 'uucp'        // 8 - UUCP subsystem
  | 'cron'        // 9 - Clock daemon
  | 'authpriv'    // 10 - Security/authorization messages (private)
  | 'ftp'         // 11 - FTP daemon
  | 'local0'      // 16 - Local use 0
  | 'local1'      // 17 - Local use 1
  | 'local2'      // 18 - Local use 2
  | 'local3'      // 19 - Local use 3
  | 'local4'      // 20 - Local use 4
  | 'local5'      // 21 - Local use 5
  | 'local6'      // 22 - Local use 6
  | 'local7';     // 23 - Local use 7

export interface SyslogMessage {
  facility: SyslogFacility;
  severity: SyslogSeverity;
  timestamp: string;
  hostname: string;
  appName: string;
  procId?: string;
  msgId?: string;
  message: string;
  structuredData?: Record<string, unknown> | SyslogStructuredData[];
}

export interface SyslogConfig {
  host: string;
  port: number;
  protocol: 'udp' | 'tcp' | 'tls';
  facility: SyslogFacility;
  appName: string;
  hostname?: string;
  certPath?: string;
  keyPath?: string;
}

export interface SyslogFilter {
  facilities?: SyslogFacility[];
  severities?: SyslogSeverity[];
  hostname?: string;
  appName?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

export interface SyslogStats {
  totalMessages: number;
  messagesByFacility: Record<SyslogFacility, number>;
  messagesBySeverity: Record<SyslogSeverity, number>;
  messagesPerMinute: number;
  topHosts: Array<{ hostname: string; count: number }>;
  topApps: Array<{ appName: string; count: number }>;
}

export interface SyslogState {
  messages: SyslogMessage[];
  filter: SyslogFilter;
  stats: SyslogStats;
  loading: boolean;
  error: string | null;
}

// Type guards
export const isSyslogSeverity = (value: string): value is SyslogSeverity => {
  return [
    'emergency', 'alert', 'critical', 'error',
    'warning', 'notice', 'info', 'debug'
  ].includes(value);
};

export const isSyslogFacility = (value: string): value is SyslogFacility => {
  return [
    'kern', 'user', 'mail', 'daemon', 'auth', 'syslog',
    'lpr', 'news', 'uucp', 'cron', 'authpriv', 'ftp',
    'local0', 'local1', 'local2', 'local3', 'local4',
    'local5', 'local6', 'local7'
  ].includes(value);
};

export const isSyslogMessage = (data: unknown): data is SyslogMessage => {
  if (typeof data !== 'object' || data === null) return false;
  
  const msg = data as Partial<SyslogMessage>;
  return (
    typeof msg.facility === 'string' &&
    typeof msg.severity === 'string' &&
    typeof msg.timestamp === 'string' &&
    typeof msg.hostname === 'string' &&
    typeof msg.appName === 'string' &&
    typeof msg.message === 'string' &&
    isSyslogFacility(msg.facility) &&
    isSyslogSeverity(msg.severity)
  );
}; 

// Add numeric values for severity and facility for RFC5424 compliance
export const SyslogSeverityValue = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
} as const;

export const SyslogFacilityValue = {
  kern: 0,
  user: 1,
  mail: 2,
  daemon: 3,
  auth: 4,
  syslog: 5,
  lpr: 6,
  news: 7,
  uucp: 8,
  cron: 9,
  authpriv: 10,
  ftp: 11,
  local0: 16,
  local1: 17,
  local2: 18,
  local3: 19,
  local4: 20,
  local5: 21,
  local6: 22,
  local7: 23
} as const;

// Structured Data types
export interface SyslogStructuredData {
  id: string;
  params: Record<string, string>;
}

// Enhanced message with structured data support
export interface SyslogMessageEnhanced extends SyslogMessage {
  structuredData?: SyslogStructuredData[];
  version?: number; // RFC5424 version
  priority?: number; // Calculated from facility and severity
  enterpriseId?: number; // For private structured data
}

// Retention and archival settings
export interface SyslogRetentionConfig {
  maxAge: number; // in days
  maxSize: number; // in megabytes
  archiveEnabled: boolean;
  archivePath?: string;
  compressionEnabled?: boolean;
  rotationInterval?: 'daily' | 'weekly' | 'monthly';
}

// Pattern matching and alerting
export interface SyslogPattern {
  id: string;
  name: string;
  pattern: string | RegExp;
  severity: SyslogSeverity;
  facility?: SyslogFacility;
  description?: string;
  enabled: boolean;
  actions: SyslogAction[];
}

export interface SyslogAction {
  type: 'email' | 'webhook' | 'notification' | 'script';
  config: {
    recipients?: string[];
    url?: string;
    scriptPath?: string;
    template?: string;
  };
}

// Advanced filtering
export interface SyslogAdvancedFilter extends SyslogFilter {
  patterns?: string[];
  excludePatterns?: string[];
  structuredDataId?: string[];
  minSeverity?: SyslogSeverity;
  maxSeverity?: SyslogSeverity;
  messageLength?: {
    min?: number;
    max?: number;
  };
  customFields?: Record<string, string | string[]>;
}

// Aggregation and reporting
export interface SyslogAggregation {
  timeframe: 'hour' | 'day' | 'week' | 'month';
  groupBy: ('facility' | 'severity' | 'hostname' | 'appName')[];
  metrics: ('count' | 'avgLength' | 'maxLength')[];
  filters?: SyslogAdvancedFilter;
}

export interface SyslogReport {
  id: string;
  name: string;
  description?: string;
  aggregation: SyslogAggregation;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time?: string;
    dayOfWeek?: number;
    dayOfMonth?: number;
  };
  output: {
    format: 'pdf' | 'csv' | 'json';
    destination: 'email' | 'filesystem' | 's3';
    config: Record<string, unknown>;
  };
}

// Enhanced stats with more metrics
export interface SyslogStatsEnhanced extends SyslogStats {
  averageMessageSize: number;
  messagesByHour: Record<number, number>;
  messagesByDay: Record<string, number>;
  patternMatches: Record<string, number>;
  failedMessages: number;
  processingTime: {
    avg: number;
    max: number;
    min: number;
  };
  storageUsage: {
    current: number;
    available: number;
    percentUsed: number;
  };
}

// Type guards for new types
export const isSyslogStructuredData = (data: unknown): data is SyslogStructuredData => {
  if (typeof data !== 'object' || data === null) return false;
  
  const sd = data as Partial<SyslogStructuredData>;
  return (
    typeof sd.id === 'string' &&
    typeof sd.params === 'object' &&
    sd.params !== null &&
    Object.entries(sd.params).every(
      ([key, value]) => typeof key === 'string' && typeof value === 'string'
    )
  );
};

export const isSyslogMessageEnhanced = (data: unknown): data is SyslogMessageEnhanced => {
  if (!isSyslogMessage(data)) return false;
  
  const msg = data as Partial<SyslogMessageEnhanced>;
  if (msg.structuredData !== undefined) {
    if (!Array.isArray(msg.structuredData)) return false;
    if (!msg.structuredData.every(isSyslogStructuredData)) return false;
  }
  
  if (msg.version !== undefined && typeof msg.version !== 'number') return false;
  if (msg.priority !== undefined && typeof msg.priority !== 'number') return false;
  if (msg.enterpriseId !== undefined && typeof msg.enterpriseId !== 'number') return false;
  
  return true;
};

// Utility functions
export const calculatePriority = (facility: SyslogFacility, severity: SyslogSeverity): number => {
  return SyslogFacilityValue[facility] * 8 + SyslogSeverityValue[severity];
};

export const parsePriority = (priority: number): { facility: SyslogFacility; severity: SyslogSeverity } => {
  const facilityValue = Math.floor(priority / 8);
  const severityValue = priority % 8;
  
  const facility = Object.entries(SyslogFacilityValue)
    .find(([_, value]) => value === facilityValue)?.[0] as SyslogFacility;
  const severity = Object.entries(SyslogSeverityValue)
    .find(([_, value]) => value === severityValue)?.[0] as SyslogSeverity;
    
  if (!facility || !severity) {
    throw new Error(`Invalid priority value: ${priority}`);
  }
  
  return { facility, severity };
}; 