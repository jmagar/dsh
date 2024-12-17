import type { User } from './core.types.js';
import type { Schema } from './validation.types.js';

export interface Middleware {
  name: string;
  enabled: boolean;
  priority: number;
  handler: MiddlewareHandler;
}

export type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export interface Request {
  id: string;
  method: string;
  url: string;
  path: string;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
  body: unknown;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  ip: string;
  protocol: string;
  secure: boolean;
  xhr: boolean;
  user?: User;
  session?: Session;
  startTime: number;
  context: RequestContext;
}

export interface Response {
  status: (code: number) => Response;
  send: (body: unknown) => void;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  getHeader: (name: string) => string | undefined;
  removeHeader: (name: string) => void;
  cookie: (name: string, value: string, options?: CookieOptions) => void;
  clearCookie: (name: string, options?: CookieOptions) => void;
  redirect: (url: string) => void;
  locals: Record<string, unknown>;
}

export type NextFunction = (error?: Error) => void;

export interface RequestContext {
  requestId: string;
  correlationId?: string;
  user?: User;
  session?: Session;
  startTime: number;
  logger: ContextLogger;
  state: Map<string, unknown>;
}

export interface Session {
  id: string;
  user?: User;
  data: Record<string, unknown>;
  createdAt: Date;
  expiresAt: Date;
  lastActivity: Date;
  isNew: boolean;
  save: () => Promise<void>;
  regenerate: () => Promise<void>;
  destroy: () => Promise<void>;
}

export interface CookieOptions {
  maxAge?: number;
  signed?: boolean;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
}

export interface ContextLogger {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
}

export interface AuthMiddlewareConfig {
  enabled: boolean;
  ignorePaths?: string[];
  tokenExtractor?: TokenExtractor;
  userExtractor?: UserExtractor;
}

export type TokenExtractor = (req: Request) => string | undefined;
export type UserExtractor = (token: string) => Promise<User | undefined>;

export interface CorsMiddlewareConfig {
  origin: string | string[] | boolean;
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export interface RateLimitMiddlewareConfig {
  windowMs: number;
  max: number;
  message?: string;
  statusCode?: number;
  headers?: boolean;
  handler?: (req: Request, res: Response) => void;
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (req: Request) => string;
}

export interface CompressionMiddlewareConfig {
  filter?: (req: Request, res: Response) => boolean;
  threshold?: number;
  level?: number;
  memLevel?: number;
  windowBits?: number;
  strategy?: number;
}

export interface LoggerMiddlewareConfig {
  format?: string;
  stream?: NodeJS.WritableStream;
  skip?: (req: Request, res: Response) => boolean;
  immediate?: boolean;
}

export interface ValidationMiddlewareConfig {
  schema: Schema;
  location?: 'body' | 'query' | 'params' | 'headers';
  stripUnknown?: boolean;
  abortEarly?: boolean;
}

export interface ErrorMiddlewareConfig {
  includeStackTrace?: boolean;
  logErrors?: boolean;
  errorHandler?: ErrorHandler;
}

export type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface SecurityMiddlewareConfig {
  helmet?: {
    contentSecurityPolicy?: boolean | Record<string, unknown>;
    crossOriginEmbedderPolicy?: boolean | Record<string, unknown>;
    crossOriginOpenerPolicy?: boolean | Record<string, unknown>;
    crossOriginResourcePolicy?: boolean | Record<string, unknown>;
    dnsPrefetchControl?: boolean | Record<string, unknown>;
    expectCt?: boolean | Record<string, unknown>;
    frameguard?: boolean | Record<string, unknown>;
    hidePoweredBy?: boolean;
    hsts?: boolean | Record<string, unknown>;
    ieNoOpen?: boolean;
    noSniff?: boolean;
    originAgentCluster?: boolean;
    permittedCrossDomainPolicies?: boolean | Record<string, unknown>;
    referrerPolicy?: boolean | Record<string, unknown>;
    xssFilter?: boolean | Record<string, unknown>;
  };
  cors?: CorsMiddlewareConfig;
  rateLimit?: RateLimitMiddlewareConfig;
}

export interface CacheMiddlewareConfig {
  duration?: number;
  cacheControl?: string;
  etag?: boolean | 'weak' | 'strong';
  lastModified?: boolean;
  revalidate?: boolean;
  keyGenerator?: (req: Request) => string;
}

export interface MonitoringMiddlewareConfig {
  metrics?: boolean;
  tracing?: boolean;
  healthCheck?: boolean;
  performanceMetrics?: boolean;
}

export interface SessionMiddlewareConfig {
  secret: string;
  name?: string;
  resave?: boolean;
  saveUninitialized?: boolean;
  rolling?: boolean;
  cookie?: CookieOptions;
  store?: SessionStore;
}

export interface SessionStore {
  get: (sid: string) => Promise<Session | null>;
  set: (sid: string, session: Session) => Promise<void>;
  destroy: (sid: string) => Promise<void>;
  touch?: (sid: string, session: Session) => Promise<void>;
  clear?: () => Promise<void>;
  length?: () => Promise<number>;
  all?: () => Promise<Session[]>;
} 