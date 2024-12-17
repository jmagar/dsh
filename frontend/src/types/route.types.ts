import type { ReactNode } from 'react';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  auth?: boolean;
  roles?: string[];
  layout?: React.ComponentType;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  roles?: string[];
} 