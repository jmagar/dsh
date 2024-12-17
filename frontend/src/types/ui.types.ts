import type { ReactNode, CSSProperties } from 'react';

// Common UI component props
export interface BaseProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface LoadingProps extends BaseProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}

export interface ErrorProps extends BaseProps {
  error: Error | string;
  retry?: () => void;
}

// Modal types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
}

// Form types
export interface FormProps<T = unknown> extends BaseProps {
  onSubmit: (data: T) => void | Promise<void>;
  initialValues?: Partial<T>;
  validate?: (values: T) => Record<string, string>;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    success: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
} 