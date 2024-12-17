export interface ValidationRule {
  type: 'required' | 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url' | 'custom';
  message?: string;
  options?: ValidationOptions;
  customValidator?: (value: unknown) => boolean | Promise<boolean>;
}

export interface ValidationOptions {
  min?: number;
  max?: number;
  pattern?: RegExp | string;
  enum?: unknown[];
  nullable?: boolean;
  transform?: (value: unknown) => unknown;
}

export interface ValidationSchema {
  [key: string]: ValidationRule | ValidationSchema;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
  rule?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidatorConfig {
  stopOnFirstError?: boolean;
  customMessages?: Record<string, string>;
  customValidators?: Record<string, (value: unknown) => boolean | Promise<boolean>>;
}

export interface RequestValidation {
  params?: ValidationSchema;
  query?: ValidationSchema;
  body?: ValidationSchema;
  headers?: ValidationSchema;
}

export interface ValidationMiddlewareOptions {
  schema: RequestValidation;
  config?: ValidatorConfig;
  onError?: (errors: ValidationError[]) => void;
}

export interface ValidationContext {
  path: string[];
  value: unknown;
  root: unknown;
  options: ValidatorConfig;
}

export type ValidationFunction = (value: unknown, options?: ValidationOptions) => boolean | Promise<boolean>;

export interface ValidationRegistry {
  register: (name: string, validator: ValidationFunction) => void;
  get: (name: string) => ValidationFunction | undefined;
  remove: (name: string) => void;
  clear: () => void;
}

export interface SchemaValidationOptions {
  strict?: boolean;
  additionalProperties?: boolean;
  coerce?: boolean;
  defaults?: boolean;
}

export interface ValidationPipeline {
  validators: ValidationFunction[];
  transform?: (value: unknown) => unknown;
  options?: ValidationOptions;
}

export interface AsyncValidationContext extends ValidationContext {
  abortSignal?: AbortSignal;
  timeout?: number;
} 