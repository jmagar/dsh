import { hostname } from 'os';

import type { Logger, LogMetadata } from '@dsh/shared/utils/logger';
import type { Request, Response } from 'express';
import * as winston from 'winston';

import { config } from '../config';

interface RequestMetadata extends Omit<LogMetadata, 'query'> {
  method: string;
  url: string;
  ip: string;
  userAgent: string;
  headers: Record<string, string>;
  query: Record<string, unknown>;
  body: Record<string, unknown>;
}

interface ResponseMetadata extends Omit<LogMetadata, 'contentLength'> {
  statusCode: number;
  contentLength: number | undefined;
  duration: number;
}

interface ErrorMetadata extends LogMetadata {
  error: Error;
  request: RequestMetadata;
}

interface LogEntry extends LogMetadata {
  request?: RequestMetadata;
  response?: ResponseMetadata;
}

class BackendLogger implements Logger {
  private readonly winston: winston.Logger;
  private readonly service: string;
  private readonly env: string;

  constructor(service: string, env: string) {
    this.service = service;
    this.env = env;
    this.winston = this.createWinstonLogger();
  }

  private createWinstonLogger(): winston.Logger {
    const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      }),
    ];

    if (this.env === 'production') {
      transports.push(
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: logFormat,
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: logFormat,
        })
      );
    }

    return winston.createLogger({
      level: this.env === 'development' ? 'debug' : 'info',
      format: logFormat,
      defaultMeta: {
        service: this.service,
        environment: this.env,
        hostname: hostname(),
      },
      transports,
    });
  }

  error(message: string, metadata?: Partial<LogMetadata>): void {
    this.winston.error(message, { component: 'backend', ...metadata });
  }

  warn(message: string, metadata?: Partial<LogMetadata>): void {
    this.winston.warn(message, { component: 'backend', ...metadata });
  }

  info(message: string, metadata?: Partial<LogMetadata>): void {
    this.winston.info(message, { component: 'backend', ...metadata });
  }

  debug(message: string, metadata?: Partial<LogMetadata>): void {
    this.winston.debug(message, { component: 'backend', ...metadata });
  }

  requestLogger(): (req: Request, res: Response, next: () => void) => void {
    return (req: Request, res: Response, next: () => void): void => {
      const start = Date.now();

      const requestMetadata: RequestMetadata = {
        component: 'backend',
        method: req.method,
        url: req.url,
        ip: req.ip ?? 'unknown',
        userAgent: req.get('user-agent') ?? 'unknown',
        headers: Object.entries(req.headers).reduce<Record<string, string>>(
          (acc, [key, value]) => ({
            ...acc,
            [key]: Array.isArray(value) ? value.join(', ') : String(value ?? ''),
          }),
          {}
        ),
        query: { ...(req.query as Record<string, unknown>) },
        body: { ...(req.body as Record<string, unknown>) },
      };

      const logEntry: LogEntry = {
        component: 'backend',
        request: requestMetadata,
      };

      this.info('Incoming request', logEntry);

      res.on('finish', () => {
        const contentLength = res.get('content-length');
        const contentLengthNum =
          contentLength !== undefined && contentLength !== '' ? Number(contentLength) : undefined;

        const responseMetadata: ResponseMetadata = {
          component: 'backend',
          statusCode: res.statusCode,
          contentLength: contentLengthNum,
          duration: Date.now() - start,
        };

        const completeLogEntry: LogEntry = {
          component: 'backend',
          metrics: {
            duration: responseMetadata.duration,
            statusCode: responseMetadata.statusCode,
            contentLength: responseMetadata.contentLength ?? 0,
          },
          request: requestMetadata,
          response: responseMetadata,
        };

        this.info('Request completed', completeLogEntry);
      });

      next();
    };
  }

  errorLogger(): (error: Error, req: Request, res: Response, next: () => void) => void {
    return (error: Error, req: Request, _res: Response, next: () => void): void => {
      const headers = Object.entries(req.headers).reduce<Record<string, string>>(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Array.isArray(value) ? value.join(', ') : String(value ?? ''),
        }),
        {}
      );

      const requestMetadata: RequestMetadata = {
        component: 'backend',
        method: req.method,
        url: req.url,
        headers,
        query: { ...(req.query as Record<string, unknown>) },
        body: { ...(req.body as Record<string, unknown>) },
        ip: req.ip ?? 'unknown',
        userAgent: req.get('user-agent') ?? 'unknown',
      };

      const errorMetadata: ErrorMetadata = {
        component: 'backend',
        error,
        request: requestMetadata,
      };

      this.error('Express error', errorMetadata);
      next();
    };
  }
}

export const logger = new BackendLogger('dsh-backend', config.env);
export const logQuery = (query: string, duration: number): void => {
  logger.debug('Database query executed', {
    component: 'database',
    query,
    metrics: { duration },
  });
};
