# Development Guide

This guide covers the setup and development workflow for the DSH project.

## Prerequisites

- Node.js 16 or higher
- Go 1.19 or higher
- Docker (for running Redis and PostgreSQL)

## Development Tools

### Frontend Tools (Vite)

- **Vite**: Next Generation Frontend Tooling
  ```bash
  npm run dev        # Start dev server
  npm run build      # Production build
  npm run preview    # Preview production build
  ```

  Key Features:
  - Hot Module Replacement (HMR)
  - Lightning-fast cold start
  - Optimized build with Rollup
  - CSS code splitting
  - Asset handling and optimization

- **TypeScript Tools**
  ```bash
  npm run type-check  # Run TypeScript checks
  ```

- **TypeDoc**: API documentation generator
  ```bash
  npm run docs
  ```

### Go Tools

- **golangci-lint**: Comprehensive Go linter
  ```bash
  golangci-lint run
  ```

- **Air**: Live reload for Go development
  ```bash
  air
  ```

- **Delve**: Go debugger
  ```bash
  dlv debug agent/cmd/agent/main.go
  ```

## Project Structure

```
dsh/
├── frontend/          # React frontend application with Vite
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── index.html    # Entry HTML
│   ├── vite.config.ts # Vite configuration
│   ├── tsconfig.json # TypeScript configuration
│   └── dist/         # Production build output
├── backend/          # Node.js backend server
├── shared/           # Shared TypeScript types and utilities
├── agent/            # Go monitoring agent
├── prisma/           # Database schema and migrations
└── docs/            # Project documentation
```

## Vite Configuration

### Environment Variables
Vite uses the `VITE_` prefix for environment variables:
```env
# .env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const wsUrl = import.meta.env.VITE_WS_URL;
```

### Path Aliases
Configured in `vite.config.ts` and `tsconfig.json`:
```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/client': resolve(__dirname, './src/client'),
      '@dsh/shared': resolve(__dirname, '../shared/src'),
    }
  }
});
```

### Build Optimization
Vite automatically handles:
- Code splitting
- Tree shaking
- CSS code splitting
- Asset optimization

Custom optimizations in `vite.config.ts`:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  }
});
```

## Development Workflow

### Starting Development Servers

```bash
# Start all services
npm run dev

# Start individual services
npm run dev:frontend  # Starts Vite dev server
npm run dev:backend
```

### Code Quality Tools

1. **Type Checking**
```bash
npm run type-check
```

2. **Linting**
```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

3. **Formatting**
```bash
npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:frontend
npm run test:backend
npm run test:e2e
```

## Building for Production

```bash
# Build all packages
npm run build

# Build individual packages
npm run build:frontend  # Uses Vite build
npm run build:backend
npm run build:shared
```

### Production Build Analysis
```bash
# Analyze bundle size
npx vite-bundle-visualizer

# Preview production build
npm run preview
```

## Best Practices

1. **Code Organization**
   - Follow feature-based structure
   - Keep components small and focused
   - Use TypeScript strictly

2. **State Management**
   - Use Redux for global state
   - React Query for server state
   - Local state when appropriate

3. **Error Handling**
   - Centralized error handling
   - Proper error logging
   - User-friendly error messages

4. **Performance**
   - Use Vite's code splitting
   - Optimize imports
   - Use proper caching
   - Leverage Vite's build optimizations
   - Use dynamic imports for route-level code splitting
   - Optimize asset loading with ?url imports
   - Use CSS code splitting

5. **Security**
   - Validate all inputs
   - Use proper authentication
   - Follow security best practices

## Debugging

### TypeScript Debugging

1. Use VS Code's built-in debugger with Vite
   ```json
   {
     "type": "chrome",
     "request": "launch",
     "name": "Launch Chrome against localhost",
     "url": "http://localhost:3000",
     "webRoot": "${workspaceFolder}/src",
     "sourceMaps": true
   }
   ```

2. Configure launch.json for your needs
3. Set breakpoints in code
4. Use Vite's error overlay
5. Use Vite's HMR debugging:
   ```typescript
   if (import.meta.hot) {
     import.meta.hot.on('vite:beforeUpdate', () => {
       console.log('vite:beforeUpdate');
     });
   }
   ```

### Go Debugging

1. Install Delve
2. Use VS Code's Go extension
3. Set breakpoints in Go code

## Documentation

- API documentation is generated with TypeDoc
- Go documentation follows standard Go conventions
- Additional documentation is in the `docs` directory
