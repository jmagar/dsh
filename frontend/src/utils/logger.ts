/* eslint-disable no-console */
import {
  Logger,
  LogLevel,
  LogMetadata,
  AgentMetadata,
  createLogMetadata,
} from '@dsh/shared/utils/logger';
import * as React from 'react';

class BrowserLogger implements Logger {
  private readonly service: string;
  private readonly environment: string;

  constructor(service: string, environment: string) {
    this.service = service;
    this.environment = environment;
  }

  private createEntry(
    level: LogLevel,
    message: string,
    metadata?: Partial<LogMetadata | AgentMetadata>
  ): {
    level: LogLevel;
    message: string;
    metadata: LogMetadata | AgentMetadata;
  } {
    return {
      level,
      message,
      metadata: createLogMetadata(this.service, this.environment, {
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...metadata,
      }),
    };
  }

  private logToConsole(
    level: LogLevel,
    message: string,
    metadata: LogMetadata | AgentMetadata
  ): void {
    const entry = { level, message, metadata };

    switch (level) {
      case LogLevel.ERROR:
        console.error(JSON.stringify(entry));
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(entry));
        break;
      case LogLevel.INFO:
        console.info(JSON.stringify(entry));
        break;
      case LogLevel.DEBUG:
        console.debug(JSON.stringify(entry));
        break;
    }

    // Send to backend logging service if in production
    if (process.env.NODE_ENV === 'production') {
      void this.sendToBackend(entry);
    }
  }

  private async sendToBackend(entry: {
    level: LogLevel;
    message: string;
    metadata: LogMetadata | AgentMetadata;
  }): Promise<void> {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error: unknown) {
      const errorObj = error instanceof Error ? error : new Error(String(error));

      this.error(`Failed to send log: ${errorObj.message}`);
    }
  }

  debug(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void {
    const entry = this.createEntry(LogLevel.DEBUG, message, metadata);
    this.logToConsole(LogLevel.DEBUG, message, entry.metadata);
  }

  info(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void {
    const entry = this.createEntry(LogLevel.INFO, message, metadata);
    this.logToConsole(LogLevel.INFO, message, entry.metadata);
  }

  warn(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void {
    const entry = this.createEntry(LogLevel.WARN, message, metadata);
    this.logToConsole(LogLevel.WARN, message, entry.metadata);
  }

  error(message: string, metadata?: Partial<LogMetadata | AgentMetadata>): void {
    const entry = this.createEntry(LogLevel.ERROR, message, metadata);
    this.logToConsole(LogLevel.ERROR, message, entry.metadata);
  }

  logError(error: unknown, errorInfo?: React.ErrorInfo): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    let message = 'No component stack available';
    if (
      errorInfo &&
      typeof errorInfo.componentStack === 'string' &&
      errorInfo.componentStack.length > 0
    ) {
      message = `Component Stack: ${errorInfo.componentStack}`;
    }

    this.error('Unhandled Error', {
      error: errorObj,
      message,
    });
  }

  logPerformance(metric: PerformanceEntry): void {
    this.info('Performance Metric', {
      message: metric.name,
      duration: metric.duration,
      metrics: {
        startTime: metric.startTime,
        duration: metric.duration,
      },
    });
  }

  logRouteChange(from: string, to: string): void {
    this.info('Route Change', {
      message: `Navigation from ${from} to ${to}`,
      target: to,
      config: {
        fromRoute: from,
        toRoute: to,
      },
    });
  }
}

// Create singleton instance
export const logger = new BrowserLogger('dsh-frontend', process.env.NODE_ENV ?? 'development');

// Error boundary logging
export function logError(error: Error, errorInfo: React.ErrorInfo): void {
  logger.logError(error, errorInfo);
}

// Performance logging
export function logPerformance(metric: PerformanceEntry): void {
  logger.logPerformance(metric);
}

// Route change logging
export function logRouteChange(from: string, to: string): void {
  logger.logRouteChange(from, to);
}
