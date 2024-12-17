export interface ServiceConfig {
  name: string;
  version: string;
  port: number;
  environment: 'development' | 'production' | 'test';
  logLevel: string;
}

export interface ServiceHealth {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  details: Record<string, unknown>;
} 