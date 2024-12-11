import { Logger, LogLevel, LogMetadata, createLogMetadata } from '@dsh/shared/utils/logger';

class BrowserLogger implements Logger {
  private readonly service: string;
  private readonly environment: string;

  constructor(service: string, environment: string) {
    this.service = service;
    this.environment = environment;
  }

  private createEntry(level: LogLevel, message: string, metadata?: Partial<LogMetadata>) {
    return {
      level,
      message,
      metadata: createLogMetadata(this.service, this.environment, {
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...metadata
      })
    };
  }

  private logToConsole(level: LogLevel, message: string, metadata: LogMetadata) {
    const entry = { level, message, metadata };

    switch (level) {
      case LogLevel.ERROR:
        console.error(entry);
        break;
      case LogLevel.WARN:
        console.warn(entry);
        break;
      case LogLevel.INFO:
        console.info(entry);
        break;
      case LogLevel.DEBUG:
        console.debug(entry);
        break;
    }

    // Send to backend logging service if in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToBackend(entry);
    }
  }

  private async sendToBackend(entry: any) {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      });
    } catch (error) {
      console.error('Failed to send log to backend:', error);
    }
  }

  error(message: string, metadata?: Partial<LogMetadata>) {
    const entry = this.createEntry(LogLevel.ERROR, message, metadata);
    this.logToConsole(LogLevel.ERROR, message, entry.metadata);
  }

  warn(message: string, metadata?: Partial<LogMetadata>) {
    const entry = this.createEntry(LogLevel.WARN, message, metadata);
    this.logToConsole(LogLevel.WARN, message, entry.metadata);
  }

  info(message: string, metadata?: Partial<LogMetadata>) {
    const entry = this.createEntry(LogLevel.INFO, message, metadata);
    this.logToConsole(LogLevel.INFO, message, entry.metadata);
  }

  debug(message: string, metadata?: Partial<LogMetadata>) {
    const entry = this.createEntry(LogLevel.DEBUG, message, metadata);
    this.logToConsole(LogLevel.DEBUG, message, entry.metadata);
  }
}

// Create singleton instance
export const logger = new BrowserLogger('dsh-frontend', process.env.NODE_ENV || 'development');

// Error boundary logging
export const logError = (error: Error, errorInfo: React.ErrorInfo) => {
  logger.error('React Error Boundary caught error', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    },
    componentStack: errorInfo.componentStack
  });
};

// Performance logging
export const logPerformance = (metric: PerformanceEntry) => {
  logger.info('Performance metric', {
    name: metric.name,
    duration: metric.duration,
    startTime: metric.startTime,
    entryType: metric.entryType
  });
};

// Route change logging
export const logRouteChange = (from: string, to: string) => {
  logger.info('Route changed', {
    from,
    to,
    timestamp: new Date().toISOString()
  });
};
