/**
 * Type guard utilities for runtime type checking
 */

/**
 * Type guard for string values
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Type guard for number values
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Type guard for boolean values
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Type guard for array values
 */
export function isArray<T>(value: unknown, itemGuard?: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && (!itemGuard || value.every(itemGuard));
}

/**
 * Type guard for object values
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard for Date values
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Type guard for Error values
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Type guard for Promise values
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}

/**
 * Type guard for null values
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Type guard for undefined values
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Type guard for nullish values (null or undefined)
 */
export function isNullish(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

/**
 * Type guard for non-nullish values
 */
export function isNonNullish<T>(value: T | null | undefined): value is T {
  return !isNullish(value);
}

/**
 * Type guard for function values
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Type guard for record values with specific value type
 */
export function isRecord<T>(
  value: unknown,
  valueGuard: (value: unknown) => value is T
): value is Record<string, T> {
  return isObject(value) && Object.values(value).every(valueGuard);
}

/**
 * Type guard for union of literal types
 */
export function isLiteralUnion<T extends string | number>(
  value: unknown,
  literals: readonly T[]
): value is T {
  return literals.includes(value as T);
}

/**
 * Type guard for objects with required properties
 */
export function hasRequiredProperties<T extends Record<string, unknown>>(
  value: unknown,
  properties: (keyof T)[]
): value is T {
  return isObject(value) && properties.every(prop => prop in value);
}
