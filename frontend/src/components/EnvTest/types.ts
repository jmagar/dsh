export interface EnvVars {
  API_URL?: string;
  FRONTEND_URL?: string;
  NODE_ENV?: string;
  CORS_ORIGIN?: string;
  WS_URL?: string;
}

export interface EnvTestProps {
  envVars: EnvVars;
}
