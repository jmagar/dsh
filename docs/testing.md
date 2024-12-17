# Testing Guide

This document outlines our testing strategy and practices for the DSH project.

## Test Types

### Unit Tests
- Located in `__tests__` directories next to source files
- Uses Jest with Vite test configuration
- Coverage threshold: 80% for all metrics
- Run with: `npm test`

Example Jest configuration with Vite:
```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@dsh/shared/(.*)$': '<rootDir>/../shared/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  }
}
```

### Component Tests
- Uses React Testing Library
- Tests component behavior and interactions
- Focuses on user interactions and accessibility
- Run with: `npm run test:components`

Example component test:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { DockerManager } from './DockerManager';

describe('DockerManager', () => {
  it('should display container list', async () => {
    render(<DockerManager hostId="test-host" />);
    
    expect(await screen.findByText('Docker Management')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should handle refresh action', async () => {
    const { getByTitle } = render(<DockerManager hostId="test-host" />);
    
    fireEvent.click(getByTitle('Refresh'));
    // Assert refresh behavior
  });
});
```

### End-to-End Tests
- Uses Cypress for browser testing
- Tests critical user flows
- Supports Vite's dev server
- Run with: `npm run test:e2e`

Example Cypress configuration:
```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    setupNodeEvents(on, config) {
      // Vite-specific setup
    },
  },
});
```

### Accessibility Tests
- Uses axe-core with Jest
- Tests WCAG2AA compliance
- Integrated with component tests
- Run with: `npm run test:a11y`

Example accessibility test:
```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('DockerManager Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<DockerManager hostId="test-host" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### API Contract Tests
- Uses MSW (Mock Service Worker) for API mocking
- Validates against OpenAPI spec
- Located in `src/mocks/handlers.ts`
- Run with: `npm run test:api`

Example MSW setup:
```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/containers', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: 'container-1' }
      ])
    );
  }),
];
```

## Coverage Requirements

All code must maintain minimum coverage thresholds:
```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "statements": 80,
        "branches": 80,
        "functions": 80,
        "lines": 80
      }
    }
  }
}
```

## Running Tests

### Development Mode
```bash
# Watch mode with Vite
npm run test:watch

# Component tests
npm run test:components

# E2E tests with UI
npm run cypress:open
```

### CI Pipeline
```bash
# All tests
npm run test:ci

# Coverage report
npm run test:coverage
```

## Best Practices

### Component Testing
1. **User-Centric Testing**
   ```typescript
   // ✅ Do: Test user interactions
   test('should handle user input', () => {
     render(<SearchBox />);
     fireEvent.change(screen.getByRole('textbox'), {
       target: { value: 'search term' }
     });
     expect(screen.getByDisplayValue('search term')).toBeInTheDocument();
   });

   // ❌ Don't: Test implementation details
   test('should update state', () => {
     const { result } = renderHook(() => useState(''));
     act(() => {
       result.current[1]('new value');
     });
   });
   ```

2. **Async Testing**
   ```typescript
   // ✅ Do: Use proper async assertions
   test('should load data', async () => {
     render(<DataList />);
     expect(await screen.findByText('Loading...')).toBeInTheDocument();
     expect(await screen.findByText('Data Item')).toBeInTheDocument();
   });
   ```

3. **Mock Management**
   ```typescript
   // ✅ Do: Reset mocks between tests
   beforeEach(() => {
     vi.clearAllMocks();
   });

   // ✅ Do: Use mock implementations
   vi.mock('@/services/api', () => ({
     fetchData: vi.fn().mockResolvedValue(['item1', 'item2'])
   }));
   ```

### Integration Testing
1. **API Mocking**
   ```typescript
   // ✅ Do: Use MSW for API mocking
   const server = setupServer(
     rest.get('/api/data', (req, res, ctx) => {
       return res(ctx.json({ data: 'test' }));
     })
   );

   beforeAll(() => server.listen());
   afterEach(() => server.resetHandlers());
   afterAll(() => server.close());
   ```

2. **State Management**
   ```typescript
   // ✅ Do: Test with real store
   const wrapper = ({ children }) => (
     <Provider store={store}>
       {children}
     </Provider>
   );

   render(<Component />, { wrapper });
   ```

### E2E Testing
1. **Critical Paths**
   ```typescript
   // cypress/e2e/critical-path.cy.ts
   describe('Critical User Journey', () => {
     it('should complete main workflow', () => {
       cy.visit('/');
       cy.findByRole('button', { name: /start/i }).click();
       cy.findByText(/success/i).should('exist');
     });
   });
   ```

2. **Custom Commands**
   ```typescript
   // cypress/support/commands.ts
   Cypress.Commands.add('login', (email, password) => {
     cy.visit('/login');
     cy.findByLabelText(/email/i).type(email);
     cy.findByLabelText(/password/i).type(password);
     cy.findByRole('button', { name: /sign in/i }).click();
   });
   ```

## Test Organization

```
src/
├── __tests__/                    # Global test utilities
├── components/
│   └── DockerManager/
│       ├── __tests__/           # Component tests
│       │   ├── unit/
│       │   └── integration/
│       └── DockerManager.tsx
├── mocks/                       # MSW handlers
└── test-utils/                  # Test helpers
```

## Continuous Integration

Tests are run in the following order:
1. Lint checks
2. Type checks
3. Unit tests
4. Component tests
5. Integration tests
6. E2E tests
7. Coverage report generation

Configuration in `.github/workflows/test.yml`:
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:ci
      - run: npm run test:e2e:ci
      - uses: actions/upload-artifact@v2
        with:
          name: coverage
          path: coverage/
```
