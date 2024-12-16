# Project Restructuring Plan

This document outlines the step-by-step plan to restructure the DSH frontend project according to our coding standards.

## Phase 1: Analysis and Backup

### 1.1 Create Backup
```bash
# Create a backup branch
git checkout -b backup/restructure-frontend
git add .
git commit -m "chore: backup before restructuring"
```

### 1.2 Current Structure Analysis
```
src/
├── components/
│   ├── EnvTest.tsx
│   └── SystemStatus.tsx
├── pages/
│   └── AgentMetrics.tsx
├── services/
├── styles/
├── utils/
│   ├── a11y.ts
│   ├── logger.ts
│   ├── metrics.ts
│   └── websocket-test.ts
├── App.tsx
├── index.tsx
└── setupTests.ts
```

## Phase 2: Directory Structure Creation

### 2.1 Create New Directories
```bash
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/constants
mkdir -p src/components/SystemStatus
mkdir -p src/components/EnvTest
mkdir -p src/pages/AgentMetrics
```

### 2.2 Create Index Files
Create barrel export files for each directory:
- `src/components/index.ts`
- `src/hooks/index.ts`
- `src/types/index.ts`
- `src/utils/index.ts`
- `src/constants/index.ts`

## Phase 3: Type Reorganization

### 3.1 Extract Types
Move types from various files to dedicated type files:

1. From `metrics.ts`:
   - Create `src/types/metrics.types.ts`
   ```typescript
   export interface BaseMetric {
     // ... existing interface
   }

   export interface MetricPayload {
     // ... existing interface
   }
   ```

2. From `logger.ts`:
   - Create `src/types/logger.types.ts`
   ```typescript
   export interface PerformanceEntry {
     // ... existing interface
   }

   export interface PerformanceMetadata {
     // ... existing interface
   }

   export interface NavigationMetadata {
     // ... existing interface
   }
   ```

3. From `a11y.ts`:
   - Create `src/types/a11y.types.ts`
   ```typescript
   export interface A11yCheck {
     // ... existing interface
   }
   ```

4. From components:
   - Create `src/types/components.types.ts`
   ```typescript
   export interface SystemStatusData {
     // ... existing interface
   }

   export interface ServiceStatusCardProps {
     // ... existing interface
   }

   export interface AgentStatusCardProps {
     // ... existing interface
   }
   ```

## Phase 4: Component Reorganization

### 4.1 SystemStatus Component
Move to component-specific directory:
1. Create `src/components/SystemStatus/index.tsx`
2. Create `src/components/SystemStatus/SystemStatus.tsx`
3. Create `src/components/SystemStatus/SystemStatus.test.tsx`
4. Create `src/components/SystemStatus/SystemStatus.styles.ts` (if needed)

### 4.2 EnvTest Component
Move to component-specific directory:
1. Create `src/components/EnvTest/index.tsx`
2. Create `src/components/EnvTest/EnvTest.tsx`
3. Create `src/components/EnvTest/EnvTest.test.tsx`

### 4.3 AgentMetrics Page
Move to page-specific directory:
1. Create `src/pages/AgentMetrics/index.tsx`
2. Create `src/pages/AgentMetrics/AgentMetrics.tsx`
3. Create `src/pages/AgentMetrics/AgentMetrics.test.tsx`
4. Create `src/pages/AgentMetrics/components/` (for page-specific components)

## Phase 5: Hook Extraction

### 5.1 Create Custom Hooks
Extract reusable logic into custom hooks:

1. Metrics Hook:
   ```typescript
   // src/hooks/useMetrics.ts
   export const useMetrics = () => {
     // Extract metrics logic from AgentMetrics
   };
   ```

2. WebSocket Hook:
   ```typescript
   // src/hooks/useWebSocket.ts
   export const useWebSocket = () => {
     // Extract WebSocket logic
   };
   ```

3. System Status Hook:
   ```typescript
   // src/hooks/useSystemStatus.ts
   export const useSystemStatus = () => {
     // Extract system status logic
   };
   ```

## Phase 6: Constants Extraction

### 6.1 Create Constants Files
1. Create `src/constants/metrics.ts`:
   ```typescript
   export const METRICS_UPDATE_INTERVAL = 5000;
   export const METRICS_ENDPOINT = '/api/metrics';
   ```

2. Create `src/constants/websocket.ts`:
   ```typescript
   export const WS_EVENTS = {
     CONNECT: 'connect',
     DISCONNECT: 'disconnect',
     // ... other events
   };
   ```

3. Create `src/constants/system.ts`:
   ```typescript
   export const SYSTEM_STATUS = {
     HEALTHY: 'healthy',
     WARNING: 'warning',
     ERROR: 'error'
   };
   ```

## Phase 7: Service Layer Enhancement

### 7.1 Create API Services
1. Create `src/services/api.ts`:
   ```typescript
   export const api = {
     metrics: {
       fetch: () => // ... implementation
     },
     system: {
       status: () => // ... implementation
     }
   };
   ```

2. Create `src/services/websocket.ts`:
   ```typescript
   export const websocketService = {
     connect: () => // ... implementation
     disconnect: () => // ... implementation
   };
   ```

## Phase 8: Testing Setup

### 8.1 Create Test Utils
1. Create `src/utils/test-utils.ts`:
   ```typescript
   export const renderWithProviders = () => {
     // Test utility implementation
   };
   ```

### 8.2 Update Test Files
1. Move component tests to their respective directories
2. Update imports in test files
3. Add new test utilities to existing tests

## Phase 9: Style Organization

### 9.1 Create Style Files
1. Create `src/styles/theme.ts`:
   ```typescript
   export const theme = {
     colors: {
       // ... color definitions
     },
     spacing: {
       // ... spacing system
     }
   };
   ```

2. Create `src/styles/global.ts`:
   ```typescript
   export const globalStyles = {
     // ... global styles
   };
   ```

## Phase 10: Documentation

### 10.1 Update Documentation
1. Update README.md with new structure
2. Add component documentation
3. Add API documentation
4. Update coding standards

## Phase 11: Implementation Steps

1. Create new branch:
   ```bash
   git checkout -b feat/frontend-restructure
   ```

2. Execute changes in order:
   - Create directories
   - Move and update files
   - Update imports
   - Run tests
   - Fix any broken imports or tests
   - Commit changes in logical groups

3. Testing:
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. Create PR:
   - Detailed description of changes
   - Before/after structure comparison
   - Testing steps
   - Migration notes for team

## Phase 12: Validation

### 12.1 Checklist
- [ ] All files are in correct directories
- [ ] All imports are updated
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Documentation is updated
- [ ] PR is created and reviewed

### 12.2 Review
- Team review of changes
- Performance impact assessment
- Bundle size impact check
- Developer experience feedback

## Phase 13: Deployment

### 13.1 Deployment Steps
1. Merge PR
2. Monitor build pipeline
3. Verify staging deployment
4. Monitor for any issues
5. Document any necessary changes for other developers

## Next Steps

After completing this restructuring:

1. **Update Development Practices**
   - Share new structure with team
   - Update PR templates
   - Update CI/CD checks

2. **Monitor and Adjust**
   - Gather feedback
   - Make adjustments as needed
   - Document lessons learned

3. **Future Improvements**
   - Consider adding storybook
   - Add component documentation
   - Improve test coverage
