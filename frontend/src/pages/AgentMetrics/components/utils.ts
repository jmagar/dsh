export function formatPercentage(value: number | undefined): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A';
  }
  return `${(value * 100).toFixed(1)}%`;
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
