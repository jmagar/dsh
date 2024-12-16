/* eslint-disable no-console */
import {
  Logger,
  LogLevel,
  LogMetadata,
  AgentMetadata,
  createLogMetadata as sharedCreateLogMetadata,
  BaseMetadata,
} from '@dsh/shared';
import type { ErrorInfo } from 'react';
import { PerformanceEntry, PerformanceMetadata, NavigationMetadata } from '../types/logger.types';

interface PerformanceEntry {
  name: string;
  duration: number;
  startTime: number;
}

interface PerformanceMetadata extends BaseMetadata {
  metricName?: string;
  startTime?: number;
}

interface NavigationMetadata extends BaseMetadata {
  fromRoute?: string;
  toRoute?: string;
}

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
    metadata?: Partial<LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata>
  ): {
    level: LogLevel;
    message: string;
    metadata: LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata;
  } {
    return {
      level,
      message,
      metadata: sharedCreateLogMetadata(this.service, this.environment, {
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...metadata,
      }),
    };
  }

  private logToConsole(
    level: LogLevel,
    message: string,
    metadata: LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata
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
      default:
        console.log(JSON.stringify(entry));
    }
  }

  logError(error: Error, errorInfo?: ErrorInfo): void {
    const componentStack = errorInfo?.componentStack;
    const metadata: Partial<LogMetadata> = {};

    if (typeof componentStack === 'string' && componentStack.trim().length > 0) {
      metadata.message = componentStack;
    }

    this.log(LogLevel.ERROR, `Error: ${error.message}`, metadata);
  }

  error(
    message: string,
    metadata?: Partial<LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata>
  ): void {
    const entry = this.createEntry(LogLevel.ERROR, message, metadata);
    this.logToConsole(LogLevel.ERROR, message, entry.metadata);
  }

  private log(
    level: LogLevel,
    message: string,
    metadata?: Partial<LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata>
  ): void {
    const entry = this.createEntry(level, message, metadata);
    this.logToConsole(level, message, entry.metadata);

    // Send to backend logging service if in production
    if (process.env.NODE_ENV === 'production') {
      void this.sendToBackend(entry);
    }
  }

  warn(
    message: string,
    metadata?: Partial<LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata>
  ): void {
    const entry = this.createEntry(LogLevel.WARN, message, metadata);
    this.logToConsole(LogLevel.WARN, message, entry.metadata);
  }

  info(
    message: string,
    metadata?: Partial<LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata>
  ): void {
    const entry = this.createEntry(LogLevel.INFO, message, metadata);
    this.logToConsole(LogLevel.INFO, message, entry.metadata);
  }

  debug(
    message: string,
    metadata?: Partial<LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata>
  ): void {
    const entry = this.createEntry(LogLevel.DEBUG, message, metadata);
    this.logToConsole(LogLevel.DEBUG, message, entry.metadata);
  }

  logPerformance(metric: PerformanceEntry): void {
    this.log(LogLevel.INFO, 'Performance Metric', {
      duration: metric.duration,
      startTime: metric.startTime,
      metricName: metric.name,
      component: 'performance',
    });
  }

  logRouteChange(from: string, to: string): void {
    this.log(LogLevel.INFO, 'Route Change', {
      component: 'navigation',
      fromRoute: from,
      toRoute: to,
    });
  }

  private sendToBackend(entry: {
    level: LogLevel;
    message: string;
    metadata: LogMetadata | AgentMetadata | PerformanceMetadata | NavigationMetadata;
  }): void {
    // Placeholder for backend logging implementation
    console.log('Sending to backend:', JSON.stringify(entry));
  }
}

// Create singleton instance
export const logger = new BrowserLogger('dsh-frontend', process.env.NODE_ENV ?? 'development');

// Error boundary logging
export function logError(error: Error, errorInfo: ErrorInfo): void {
  logger.logError(error, errorInfo);
}

export { sharedCreateLogMetadata as createLogMetadata };
