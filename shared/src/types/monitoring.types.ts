export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  resolvedAt?: string;
  notificationsSent: Array<{
    channel: string;
    timestamp: string;
    success: boolean;
  }>;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  panels: Array<{
    id: string;
    type: 'graph' | 'gauge' | 'table' | 'stat';
    title: string;
    query: string;
    timeRange: {
      from: string;
      to: string;
    };
    visualization: {
      type: string;
      options: Record<string, unknown>;
    };
  }>;
}

export interface MetricsCollector {
  interval: number;
  metrics: Array<{
    name: string;
    type: 'counter' | 'gauge' | 'histogram';
    help: string;
    labels: string[];
  }>;
  storage: {
    type: 'prometheus' | 'influxdb' | 'elasticsearch';
    retention: string;
    aggregation: string;
  };
} 