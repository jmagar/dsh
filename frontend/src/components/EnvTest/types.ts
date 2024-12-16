export interface EnvVars {
  API_URL: string | undefined;
  FRONTEND_URL: string | undefined;
  NODE_ENV: string | undefined;
  CORS_ORIGIN: string | undefined;
  WS_URL: string | undefined;
}

export interface EnvTestProps {
  /** Optional className for styling */
  className?: string;
  /** Optional style overrides */
  style?: React.CSSProperties;
}
