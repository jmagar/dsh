# Development Guide

This guide covers the setup and development workflow for the DSH project.

## Prerequisites

- Node.js 16 or higher
- Go 1.19 or higher
- Docker (for running Redis and PostgreSQL)

## Development Tools

### TypeScript Tools

- **ts-node**: Run TypeScript files directly
  ```bash
  npx ts-node script.ts
  ```

- **tsc-watch**: Watch mode for TypeScript compilation
  ```bash
  npm run dev:frontend  # Watch frontend
  npm run dev:backend   # Watch backend
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
├── frontend/          # React frontend application
├── backend/          # Node.js backend server
├── shared/           # Shared TypeScript types and utilities
├── agent/            # Go monitoring agent
├── prisma/           # Database schema and migrations
└── docs/            # Project documentation
```

## Initial Setup

1. **Clone the Repository**
```bash
git clone https://github.com/[owner]/dsh.git
cd dsh
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Initialize Database**
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Development Workflow

### Starting Development Servers

```bash
# Start all services
npm run dev

# Start individual services
npm run dev:frontend
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

### Git Workflow

1. **Creating a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Committing Changes**
```bash
npm run commit  # Uses commitizen for conventional commits
```

3. **Pre-commit Hooks**
- Lint staged files
- Run type checking
- Format code

## Building for Production

```bash
# Build all packages
npm run build

# Build individual packages
npm run build:frontend
npm run build:backend
npm run build:shared
```

## Docker Support

### Development with Docker

```bash
# Build images
docker compose build

# Start services
docker compose up -d

# View logs
docker compose logs -f
```

### Production Builds

```bash
# Build production images
docker build -t dsh-frontend:prod frontend
docker build -t dsh-backend:prod backend
docker build -t dsh-agent:prod agent
```

## Debugging

### Frontend Debugging

1. **Browser DevTools**
- React Developer Tools
- Redux DevTools
- Performance profiling

2. **Common Issues**
- Check browser console
- Verify API endpoints
- Check environment variables

### Backend Debugging

1. **Logging**
```typescript
import { logger } from './utils/logger';

logger.info('Server started');
logger.error('Error occurred', { error });
```

2. **API Testing**
- Use Postman/Insomnia
- Check request/response headers
- Validate request body

### Database Debugging

1. **Prisma Studio**
```bash
npx prisma studio
```

2. **Query Issues**
- Check Prisma logs
- Use EXPLAIN ANALYZE
- Monitor query performance

## Configuration

### Frontend Configuration
```typescript
// frontend/src/config/index.ts
export const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL
  },
  ws: {
    endpoint: process.env.REACT_APP_WS_URL
  }
};
```

### Backend Configuration
```typescript
// backend/src/config/index.ts
export const config = {
  server: {
    port: process.env.PORT || 3000
  },
  database: {
    url: process.env.DATABASE_URL
  },
  redis: {
    url: process.env.REDIS_URL
  }
};
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
   - Lazy load components
   - Optimize images
   - Use proper caching

5. **Security**
   - Validate all inputs
   - Use proper authentication
   - Follow security best practices

## Development Workflow

1. Start the development servers:
   ```bash
   npm run dev
   ```

2. Start the Go agent with live reload:
   ```bash
   cd agent && air
   ```

3. Run tests in watch mode:
   ```bash
   npm run test:watch
   ```

4. Generate API documentation:
   ```bash
   npm run docs
   ```

## Code Quality

- ESLint and Prettier are configured for TypeScript code
- golangci-lint is configured for Go code
- Pre-commit hooks ensure code quality
- Continuous Integration runs all checks

## Debugging

### TypeScript Debugging

1. Use VS Code's built-in debugger
2. Configure launch.json for your needs
3. Set breakpoints in code

### Go Debugging

1. Install Delve
2. Use VS Code's Go extension
3. Set breakpoints in Go code

## Documentation

- API documentation is generated with TypeDoc
- Go documentation follows standard Go conventions
- Additional documentation is in the `docs` directory
