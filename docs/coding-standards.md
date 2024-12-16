# Coding Standards and Best Practices

This document outlines the coding standards and best practices for the DSH project. It complements our existing guidelines in `logging-and-type-safety.md`, `security.md`, and `testing.md`.

## Code Organization

### File Structure
```
src/
├── components/       # Reusable UI components
│   ├── SystemStatus/  # Component-specific directory
│   ├── EnvTest/      # Component-specific directory
│   └── index.ts      # Barrel exports (to be added)
├── pages/           # Page components
│   └── AgentMetrics/ # Page-specific components and logic
├── services/        # API and service integrations
├── utils/           # Utility functions
│   ├── a11y.ts      # Accessibility utilities
│   ├── logger.ts    # Logging utilities
│   ├── metrics.ts   # Metrics processing
│   └── websocket-test.ts # WebSocket testing utilities
├── styles/          # Global styles and theme
└── App.tsx         # Root application component

Recommended Additions:
├── hooks/           # Custom React hooks (to be added)
├── types/           # TypeScript type definitions (to be added)
└── constants/       # Application constants (to be added)
```

### File Naming
- React components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities and hooks: camelCase (e.g., `useMetrics.ts`)
- Test files: `[name].test.ts` or `[name].spec.ts`
- Type definitions: `[name].types.ts`

## TypeScript Standards

### Type Definitions
```typescript
// ✅ Do: Use explicit interfaces for object shapes
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// ❌ Don't: Use type assertions without validation
const user = data as UserProfile;

// ✅ Do: Validate data before type assertion
const user = isUserProfile(data) ? data : null;
```

### Generics
```typescript
// ✅ Do: Use descriptive generic names
interface Repository<TEntity> {
  find(id: string): Promise<TEntity>;
}

// ❌ Don't: Use single letters for generics
interface Repository<T> {
  find(id: string): Promise<T>;
}
```

### Null Handling
```typescript
// ✅ Do: Use undefined for optional values
interface Config {
  timeout?: number;
}

// ❌ Don't: Use null for optional values
interface Config {
  timeout: number | null;
}
```

## React Best Practices

### Component Structure
```typescript
// ✅ Do: Use functional components with explicit return types
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
};

// ❌ Don't: Use implicit return types
const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
};
```

### Hook Usage
```typescript
// ✅ Do: Extract complex logic into custom hooks
const useMetricsData = (serverId: string) => {
  const [data, setData] = useState<MetricsData | null>(null);
  // ... implementation
  return data;
};

// ❌ Don't: Mix business logic with UI components
const MetricsDisplay = ({ serverId }) => {
  const [data, setData] = useState<MetricsData | null>(null);
  // ... complex data fetching logic
};
```

### Props
```typescript
// ✅ Do: Use interface for props with descriptive names
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

// ❌ Don't: Use type for props or generic names
type Props = {
  data: any;
  handler: Function;
};
```

## State Management

### Context Usage
```typescript
// ✅ Do: Split contexts by domain
const MetricsContext = createContext<MetricsContextType | null>(null);
const AuthContext = createContext<AuthContextType | null>(null);

// ❌ Don't: Create a single global context
const AppContext = createContext<AppContextType | null>(null);
```

### State Updates
```typescript
// ✅ Do: Use functional updates for derived state
setState(prev => ({
  ...prev,
  count: prev.count + 1
}));

// ❌ Don't: Use object updates directly
setState({
  ...state,
  count: state.count + 1
});
```

## Error Handling

### Custom Error Classes
```typescript
// ✅ Do: Create specific error classes
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// ❌ Don't: Use generic errors
throw new Error('API request failed');
```

### Error Boundaries
```typescript
// ✅ Do: Use error boundaries for UI error handling
class MetricsErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
}

// ❌ Don't: Let errors crash the entire app
try {
  // risky operation
} catch (e) {
  console.error(e);
}
```

## Performance Optimization

### Memoization
```typescript
// ✅ Do: Memoize expensive calculations
const memoizedValue = useMemo(
  () => expensiveCalculation(props.data),
  [props.data]
);

// ❌ Don't: Memoize simple values
const memoizedName = useMemo(
  () => props.name,
  [props.name]
);
```

### Event Handlers
```typescript
// ✅ Do: Use useCallback for event handlers passed as props
const handleClick = useCallback(() => {
  // handle click
}, [dependency]);

// ❌ Don't: Create new function references on each render
const handleClick = () => {
  // handle click
};
```

## Documentation

### Component Documentation
```typescript
/**
 * Displays real-time system metrics with automatic updates.
 * @param serverId - Unique identifier for the server
 * @param refreshInterval - Update interval in milliseconds
 * @param onError - Called when metrics fetch fails
 */
interface MetricsDisplayProps {
  serverId: string;
  refreshInterval?: number;
  onError?: (error: Error) => void;
}
```

### Function Documentation
```typescript
/**
 * Calculates system resource usage from raw metrics.
 * @param metrics - Raw system metrics data
 * @returns Processed metrics with usage percentages
 * @throws {ValidationError} If metrics data is invalid
 */
function calculateResourceUsage(metrics: RawMetrics): ProcessedMetrics {
  // implementation
}
```

## Code Review Guidelines

### Pull Request Size
- Keep PRs focused and small (< 400 lines)
- Split large changes into smaller, logical PRs
- Include tests with code changes

### Review Checklist
1. Type safety
2. Error handling
3. Performance implications
4. Security considerations
5. Test coverage
6. Documentation updates

## Commit Messages

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test updates
- chore: Build/config updates

Example:
```
feat(metrics): add real-time CPU usage monitoring

- Implement WebSocket connection for live updates
- Add CPU usage calculation
- Update MetricsDisplay component

Closes #123
```
