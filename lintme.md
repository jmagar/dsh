# ESLint Error Fixes

## Error Categories
1. Import Resolution (most common)
   - Unable to resolve path to module errors
   - Need to fix path aliases and module resolution

2. Multiple Exports
   - In shared/src/types/index.ts
   - In backend/src/types/index.ts

3. React Hooks
   - Rules of hooks violations
   - Missing dependencies

4. Unused Variables
   - Several components have unused imports/variables

5. Security Warnings
   - Object injection warnings in backend

## Action Plan

### 1. Import Resolution
- [ ] Fix path aliases (@dsh/shared)
- [ ] Fix node_modules imports (mui, express, etc)
- [ ] Fix relative imports

### 2. Multiple Exports
- [ ] Clean up shared/src/types/index.ts exports
- [ ] Clean up backend/src/types/index.ts exports
- [ ] Ensure no duplicate type exports

### 3. React Hooks
- [ ] Fix useAppSelector in AgentManager.tsx
- [ ] Fix useEffect dependencies in useAgent.ts

### 4. Unused Variables
- [ ] Clean up NetworkIcon in DockerManager.tsx
- [ ] Fix theme unused in multiple style files
- [ ] Fix other unused variables

### 5. Security Warnings
- [ ] Review object injection in backend/src/config.ts
- [ ] Review function call injection in backend/tests/memory-leaks.ts

## Progress
- [x] Initial ESLint setup
- [x] TypeScript version fixed
- [x] ESLint configs fixed
- [ ] Import resolution
- [ ] Multiple exports
- [ ] React hooks
- [ ] Unused variables
- [ ] Security warnings

## Next Steps
1. Start with import resolution as it's the most common issue
2. Then fix multiple exports as they affect type system
3. Fix React hooks issues
4. Clean up unused variables
5. Address security warnings last as they're mostly warnings not errors

