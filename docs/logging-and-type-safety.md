# Logging and Type Safety Patterns

This document outlines our logging patterns and type safety practices in the DSH project.

## Logging Pattern

### Overview
We use a structured logging approach with TypeScript interfaces to ensure type safety and consistent log formats across the application.

### Base Structure
```typescript
interface BaseMetadata {
  component: string;
  error?: Error;
  message?: string;
  // ... other optional fields
}

interface LogMetadata extends BaseMetadata {
  socketId?: string;
}
```

### Usage Pattern

1. **Basic Logging**
```typescript
logger.info('Event Description', createLogMetadata('component-name', undefined, {
  message: 'Detailed message'
}));
```

2. **Error Logging**
```typescript
try {
  // ... code that might throw
} catch (err) {
  const errorObj = isError(err) ? err : new Error('Unknown error');
  logger.error('Error Description', createLogMetadata('component-name', errorObj, {
    message: 'Detailed error message'
  }));
}
```

3. **Component-specific Logging**
```typescript
const metadata: Partial<LogMetadata> = {
  component: 'component-name',
  message: 'Event details'
};
logger.info('Event Description', createLogMetadata('component-name', undefined, metadata));
```

### Best Practices

1. **Component Names**
   - Use kebab-case for component names
   - Keep them consistent across related logs
   - Examples: 'agent-metrics', 'websocket-handler', 'auth-service'

2. **Error Handling**
   - Always use the `isError` type guard for error checking
   - Create custom error classes for specific error types
   - Include relevant error context in metadata

3. **Message Structure**
   - Event description: Brief, action-oriented
   - Metadata message: Detailed context
   - Example:
     ```typescript
     logger.error('WebSocket Connection Failed',  // Event description
       createLogMetadata('websocket', error, {
         message: 'Failed to establish connection: timeout after 5s'  // Detailed context
       }));
     ```

## Type Safety Patterns

### Strict Boolean Expressions

1. **Object Existence Checks**
   ```typescript
   // ❌ Don't use object truthiness
   if (obj) { ... }
   if (!obj) { ... }

   // ✅ Use explicit type checks
   if (typeof obj === 'undefined' || obj === null) { ... }
   if (typeof obj !== 'undefined' && obj !== null) { ... }
   ```

2. **Optional Properties**
   ```typescript
   // ❌ Don't use optional chaining alone for conditionals
   if (obj?.property) { ... }

   // ✅ Use explicit type checks
   if (typeof obj?.property !== 'undefined' && obj.property !== null) { ... }
   ```

### State Management

1. **Type-Safe State Updates**
   ```typescript
   // ❌ Don't use type assertions
   setState(prevState => ({ ...prevState, status: 'Connected' } as State));

   // ✅ Use proper type annotations
   setState((prevState: State) => ({ ...prevState, status: 'Connected' }));
   ```

2. **Unknown Data Handling**
   ```typescript
   // ❌ Don't assume type safety
   socket.on('data', (data: DataType) => { ... });

   // ✅ Use type guards and validation
   socket.on('data', (data: unknown) => {
     if (!isValidData(data)) {
       handleInvalidData();
       return;
     }
     // Now data is type-safe
     handleData(data);
   });
   ```

### When to Use These Patterns

1. **Logging Pattern**
   - When recording application events
   - When tracking errors and exceptions
   - When monitoring system state changes
   - When debugging issues in production

2. **Type Safety Patterns**
   - When handling external data (API responses, WebSocket events)
   - When updating component state
   - When dealing with optional properties
   - When working with error objects

### Benefits

1. **Type Safety**
   - Catch errors at compile time
   - Prevent runtime type errors
   - Improve code maintainability

2. **Debugging**
   - Consistent log format
   - Rich context in error messages
   - Clear audit trail

3. **Maintenance**
   - Self-documenting code
   - Easier refactoring
   - Better IDE support

## Examples

### Complete Example: WebSocket Event Handling
```typescript
interface MetricsState {
  data: SystemMetrics | null;
  status: string;
}

socket.on('metrics', (data: unknown) => {
  // Type safety for unknown data
  if (data === null || typeof data !== 'object') {
    const error = new MetricsError('Invalid metrics data');
    logger.error('Metrics Data Invalid', createLogMetadata('metrics-handler', error, {
      message: 'Received invalid metrics data format'
    }));
    return;
  }

  // Type-safe state update
  setState((prevState: MetricsState) => ({
    ...prevState,
    data: data as SystemMetrics
  }));

  // Success logging
  logger.info('Metrics Updated', createLogMetadata('metrics-handler', undefined, {
    message: 'Successfully processed new metrics data'
  }));
});
```

## Testing

Always test your logging and type safety implementations:

1. **Unit Tests**
   - Test error handling paths
   - Verify log message format
   - Check type guard behavior

2. **Integration Tests**
   - Test logging in real scenarios
   - Verify error propagation
   - Check state updates

3. **Type Testing**
   ```typescript
   // Use TypeScript's type system to verify your types
   const metadata: Partial<LogMetadata> = {
     component: 'test',
     invalidField: 'error' // TypeScript will catch this
   };
   ```

## Vite-Specific Type Safety

### Environment Variables
```typescript
// Type-safe environment variables with Vite
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_WS_URL: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
if (typeof apiUrl !== 'string') {
  throw new Error('VITE_API_URL must be defined');
}
```

### Module Declarations
```typescript
// For static assets
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

// For style modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

### Import Assertions
```typescript
// Type-safe JSON imports
import data from './data.json' assert { type: 'json' };

// Type-safe URL imports
import imageUrl from './image.png?url';
```

### Best Practices for Vite

1. **Environment Variable Type Safety**
   - Always define types for environment variables
   - Use type guards for runtime validation
   - Keep environment variable types in sync with .env files

2. **Asset Imports**
   - Use appropriate module declarations
   - Leverage Vite's URL imports for assets
   - Type-check asset imports

3. **Development vs Production Types**
   ```typescript
   if (import.meta.env.DEV) {
     // Development-only type-safe code
   }
   ```
