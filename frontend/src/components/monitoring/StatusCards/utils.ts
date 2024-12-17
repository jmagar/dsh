export function getErrorMessage(error: unknown): string | null {
  if (!error) return null;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Unknown error occurred';
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
} 