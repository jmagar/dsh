import type { User } from './core.types.js';

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiry: string;
  refreshTokenExpiry: string;
  passwordHashRounds: number;
  allowedOrigins?: string[];
  sessionTimeout?: number;
}

export interface TokenPayload {
  userId: string;
  username: string;
  roles: string[];
  exp: number;
  iat?: number;
  refreshCount?: number;
}

export interface AuthenticationResult {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenFamily: string;
}

export interface AuthenticationRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface PasswordResetRequest {
  token: string;
  newPassword: string;
}

export interface AuthProvider {
  type: AuthProviderType;
  config: AuthProviderConfig;
  enabled: boolean;
}

export type AuthProviderType = 'local' | 'ldap' | 'oauth2' | 'saml';

export interface AuthProviderConfig {
  id: string;
  name: string;
  order: number;
  settings: Record<string, unknown>;
}

export interface LDAPConfig extends AuthProviderConfig {
  settings: {
    url: string;
    bindDN: string;
    bindPassword: string;
    searchBase: string;
    searchFilter: string;
    groupSearchBase?: string;
    groupSearchFilter?: string;
    tlsEnabled: boolean;
    tlsCertPath?: string;
  };
}

export interface OAuth2Config extends AuthProviderConfig {
  settings: {
    clientId: string;
    clientSecret: string;
    authorizationURL: string;
    tokenURL: string;
    userInfoURL: string;
    scope: string[];
    callbackURL: string;
  };
}

export interface SAMLConfig extends AuthProviderConfig {
  settings: {
    entryPoint: string;
    issuer: string;
    cert: string;
    privateKey?: string;
    callbackURL: string;
    signatureAlgorithm?: string;
  };
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  lastActivity: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuthenticationError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export type AuthErrorCode = 
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_DISABLED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'PROVIDER_ERROR'
  | 'PERMISSION_DENIED'
  | 'SESSION_EXPIRED'
  | 'RATE_LIMITED';

export interface AuthorizationContext {
  user: User;
  token: TokenPayload;
  session: AuthSession;
  provider: AuthProvider;
}

export interface AuthorizationPolicy {
  id: string;
  name: string;
  description?: string;
  rules: AuthorizationRule[];
  enabled: boolean;
}

export interface AuthorizationRule {
  resource: string;
  action: string;
  effect: 'allow' | 'deny';
  conditions?: Record<string, unknown>;
}

export type AuthEventType = 
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT'
  | 'TOKEN_REFRESH'
  | 'PASSWORD_RESET'
  | 'ACCOUNT_LOCKED'
  | 'POLICY_VIOLATION';

export interface AuthEvent {
  type: AuthEventType;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  provider?: AuthProviderType;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
} 