import type { ErrorInfo } from 'react';

export interface ErrorDetails {
  code: string;
  message: string;
  field?: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  constraints?: Record<string, string>;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export type ErrorHandler = (error: Error, errorInfo?: ErrorInfo) => void;

export interface ErrorContextValue {
  error: Error | null;
  setError: (error: Error | null) => void;
  clearError: () => void;
  handleError: ErrorHandler;
} 