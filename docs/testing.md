# Testing Guide

This document outlines our testing strategy and practices for the DSH project.

## Test Types

### Unit Tests
- Located in `__tests__` directories next to source files
- Uses Jest as the test runner
- Coverage threshold: 80% for all metrics
- Run with: `npm test`

### End-to-End Tests
- Located in `frontend/cypress/e2e`
- Uses Cypress for browser testing
- Tests critical user flows
- Run with: `npm run test:e2e`

### Accessibility Tests
- Uses Pa11y for WCAG2AA compliance
- Tests all main routes
- Enforces zero accessibility errors
- Run with: `npm run test:a11y`

### Memory Leak Tests
- Located in `backend/tests/memory-leaks.js`
- Uses memwatch-next for heap analysis
- Tests server memory stability
- Run with: `npm run test:memory-leaks`

### Database Tests
- Located in `backend/tests/db`
- Tests Prisma schema and migrations
- Uses test database
- Run with: `npm run test:db`

### API Contract Tests
- Uses Dredd for API specification testing
- Validates against OpenAPI spec
- Located in `backend/api-docs.yml`
- Run during CI pipeline

## Coverage Requirements

All code must maintain minimum coverage thresholds:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## Running Tests

### All Tests
```bash
npm test                 # Run all tests
npm run test:frontend   # Run frontend tests
npm run test:backend    # Run backend tests
```

### Specific Test Types
```bash
npm run test:e2e        # Run E2E tests
npm run test:a11y       # Run accessibility tests
npm run test:db         # Run database tests
npm run test:memory-leaks # Run memory leak tests
```

## CI/CD Integration

Tests are automatically run in our CI pipeline:
1. Unit tests run in parallel for frontend/backend
2. E2E tests run after unit tests pass
3. Accessibility tests run on built frontend
4. Memory leak tests run for backend
5. Database tests run against test database
6. Coverage reports are uploaded as artifacts

## Writing Tests

### Unit Test Example
```typescript
import { calculateMetrics } from '../metrics';

describe('calculateMetrics', () => {
  it('should calculate CPU usage correctly', () => {
    const input = { user: 50, system: 30, idle: 20 };
    expect(calculateMetrics(input)).toEqual({
      total: 80,
      usage: 0.8
    });
  });
});
```

### E2E Test Example
```typescript
describe('Server List', () => {
  it('should display server metrics', () => {
    cy.visit('/servers');
    cy.get('[data-testid="server-list"]').should('be.visible');
    cy.get('[data-testid="server-metrics"]').should('have.length.gt', 0);
  });
});
```

### Accessibility Test Configuration
```json
{
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/servers",
    "http://localhost:3000/metrics"
  ],
  "threshold": {
    "errors": 0,
    "warnings": 10
  }
}
```

## Best Practices

1. **Test Organization**
   - Keep tests close to source files
   - Use descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)

2. **Test Data**
   - Use factories for test data
   - Avoid sharing state between tests
   - Clean up after tests

3. **Mocking**
   - Mock external services
   - Use MSW for API mocking
   - Keep mocks simple

4. **Performance**
   - Write efficient tests
   - Avoid unnecessary setup
   - Use test parallelization

5. **Maintenance**
   - Keep tests up to date
   - Review test coverage regularly
   - Fix flaky tests immediately
