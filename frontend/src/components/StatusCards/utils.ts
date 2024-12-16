export function getErrorMessage(error: string | null | undefined): string | null {
  if (error === null || error === undefined) {
    return null;
  }
  const trimmed = error.trim();
  return trimmed === '' ? null : trimmed;
}

export function formatPercentage(value: number = 0): string {
  return `${value.toFixed(2)}%`;
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
