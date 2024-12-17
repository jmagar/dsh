import type { BaseMetadata } from '@dsh/shared';
import type { ErrorInfo } from 'react';

export interface PerformanceEntry {
  name: string;
  duration: number;
  startTime: number;
}

export interface PerformanceMetadata extends BaseMetadata {
  metricName?: string;
  startTime?: number;
}

export interface NavigationMetadata extends BaseMetadata {
  fromRoute?: string;
  toRoute?: string;
}

export interface ErrorBoundaryProps {
  error: Error;
  errorInfo: ErrorInfo;
}
