export interface A11yCheck {
  element: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
}

export interface A11yCheckResult {
  url: string;
  checks: A11yCheck[];
  timestamp: number;
}
