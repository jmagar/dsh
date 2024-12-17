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
  structuredData?: Record<string, Record<string, string>>;
}

export interface SyslogConfig {
  enabled: boolean;
  port: number;
  protocol: 'udp' | 'tcp' | 'tls';
  host: string;
  format: 'rfc3164' | 'rfc5424';
  maxSize: number;
  retentionDays: number;
  tls?: {
    cert: string;
    key: string;
    ca?: string;
  };
}

export interface SyslogFilter {
  facility?: SyslogFacility[];
  severity?: SyslogSeverity[];
  hostname?: string[];
  appName?: string[];
  timeRange?: {
    start: string;
    end: string;
  };
}

export interface SyslogStats {
  totalMessages: number;
  messagesByFacility: Record<SyslogFacility, number>;
  messagesBySeverity: Record<SyslogSeverity, number>;
  messagesPerMinute: number;
  averageMessageSize: number;
  storageUsed: number;
}

export interface SyslogState {
  messages: SyslogMessage[];
  config: SyslogConfig;
  filter: SyslogFilter;
  stats: SyslogStats;
  loading: boolean;
  error: string | null;
}

export interface SyslogStructuredData {
  id: string;
  version?: string;
  params: Record<string, string>;
}

export interface SyslogMessageEnhanced extends SyslogMessage {
  version?: number; // RFC5424 version
  structuredData?: SyslogStructuredData[];
  originalMessage: string;
}

export interface SyslogRetentionConfig {
  enabled: boolean;
  maxSize: number;
  maxAge: number;
  maxFiles: number;
  compress: boolean;
  rotateOnStart: boolean;
  rotationSchedule?: string;
}

export interface SyslogPattern {
  id: string;
  name: string;
  pattern: string;
  description?: string;
  tags: string[];
  enabled: boolean;
  priority: number;
  action?: SyslogAction;
}

export interface SyslogAction {
  type: 'alert' | 'forward' | 'transform' | 'drop';
  config: {
    target?: string;
    template?: string;
    condition?: string;
    threshold?: number;
    interval?: number;
  };
}

export interface SyslogAdvancedFilter extends SyslogFilter {
  pattern?: string;
  tags?: string[];
  structuredData?: Record<string, string>;
  messageContent?: string;
  excludePattern?: string;
  excludeTags?: string[];
  customFields?: Record<string, string>;
}

export interface SyslogAggregation {
  field: string;
  operation: 'count' | 'sum' | 'avg' | 'min' | 'max';
  interval?: string;
  groupBy?: string[];
}

export interface SyslogReport {
  id: string;
  name: string;
  description?: string;
  filter: SyslogAdvancedFilter;
  aggregations: SyslogAggregation[];
  schedule?: string;
  format: 'csv' | 'json' | 'pdf';
  recipients?: string[];
}

// Type guards
export const isSyslogMessage = (data: unknown): data is SyslogMessage => {
  if (typeof data !== 'object' || data === null) return false;
  
  const msg = data as Partial<SyslogMessage>;
  return (
    typeof msg.facility === 'string' &&
    typeof msg.severity === 'string' &&
    typeof msg.timestamp === 'string' &&
    typeof msg.hostname === 'string' &&
    typeof msg.appName === 'string' &&
    typeof msg.message === 'string'
  );
};

export const isSyslogStructuredData = (data: unknown): data is SyslogStructuredData => {
  if (typeof data !== 'object' || data === null) return false;
  
  const sd = data as Partial<SyslogStructuredData>;
  return (
    typeof sd.id === 'string' &&
    typeof sd.params === 'object' &&
    sd.params !== null
  );
};

// ... rest of syslog types from frontend/src/types/syslog.types.ts 