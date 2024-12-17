export interface BaseError {
  code: string;
  message: string;
  status?: number;
  timestamp: string;
  path?: string;
  stack?: string;
  cause?: unknown;
}

export interface ValidationError extends BaseError {
  code: 'VALIDATION_ERROR';
  details: Array<{
    field: string;
    message: string;
    value?: unknown;
    constraint?: string;
  }>;
}

export interface AuthenticationError extends BaseError {
  code: 'AUTHENTICATION_ERROR';
  reason: 'invalid_credentials' | 'token_expired' | 'token_invalid' | 'token_missing' | 'session_expired';
}

export interface AuthorizationError extends BaseError {
  code: 'AUTHORIZATION_ERROR';
  requiredPermissions: string[];
  userPermissions: string[];
}

export interface NetworkError extends BaseError {
  code: 'NETWORK_ERROR';
  request?: {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: unknown;
  };
  response?: {
    status: number;
    statusText: string;
    headers?: Record<string, string>;
    body?: unknown;
  };
}

export interface DatabaseError extends BaseError {
  code: 'DATABASE_ERROR';
  operation: string;
  table?: string;
  constraint?: string;
}

export interface ResourceError extends BaseError {
  code: 'RESOURCE_ERROR';
  resourceType: string;
  resourceId: string;
  operation: 'create' | 'read' | 'update' | 'delete' | 'list';
}

export interface ServiceError extends BaseError {
  code: 'SERVICE_ERROR';
  service: string;
  operation: string;
  retryable: boolean;
}

export interface ConfigurationError extends BaseError {
  code: 'CONFIGURATION_ERROR';
  configPath: string;
  expectedType: string;
  receivedValue?: unknown;
}

export interface RateLimitError extends BaseError {
  code: 'RATE_LIMIT_ERROR';
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export type AppError =
  | ValidationError
  | AuthenticationError
  | AuthorizationError
  | NetworkError
  | DatabaseError
  | ResourceError
  | ServiceError
  | ConfigurationError
  | RateLimitError;

export interface ErrorHandler {
  handle: (error: Error | AppError) => void;
  report: (error: Error | AppError) => Promise<void>;
  format: (error: Error | AppError) => {
    message: string;
    details?: unknown;
  };
} 