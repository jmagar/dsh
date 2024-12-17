export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  websocket: {
    url: string;
    reconnectAttempts: number;
    reconnectInterval: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    tokenExpiry: number;
  };
  features: {
    enableMetrics: boolean;
    enableChat: boolean;
    enableDocker: boolean;
  };
}

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  VITE_API_URL: string;
  VITE_WS_URL: string;
  VITE_AUTH_URL?: string;
  VITE_METRICS_INTERVAL?: string;
  [key: string]: string | undefined;
} 