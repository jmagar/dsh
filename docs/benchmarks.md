# Performance Benchmarking Guide

This document outlines our performance benchmarking strategy and tools.

## Frontend Performance

### Bundle Size Analysis
We use `bundlesize` to monitor and enforce size limits on our frontend assets:

```json
{
  "files": [
    {
      "path": "build/static/js/main.*.js",
      "maxSize": "200 kB"
    },
    {
      "path": "build/static/js/chunk.*.js",
      "maxSize": "100 kB"
    },
    {
      "path": "build/static/css/main.*.css",
      "maxSize": "50 kB"
    }
  ]
}
```

Run bundle analysis:
```bash
npm run build:frontend
npx bundlesize
```

### Lighthouse Performance
We use Google Lighthouse to measure:
- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)

Run Lighthouse tests:
```bash
npm run benchmark:frontend
```

Target metrics:
- Performance score: ≥90
- FCP: <2s
- LCP: <2.5s
- TTI: <3.8s
- TBT: <300ms

## Backend Performance

### Load Testing
We use `autocannon` for HTTP load testing:

```bash
npm run benchmark:backend
```

Configuration:
- Concurrent connections: 100
- Duration: 30 seconds
- Pipelining: 10 requests
- Endpoints tested: `/api/health`, `/api/servers`

Target metrics:
- Requests/sec: >1000
- Latency p95: <100ms
- Errors: 0%

### Memory Usage
We monitor memory usage with `memwatch-next`:
- Heap size growth
- Memory leaks
- Garbage collection stats

Run memory tests:
```bash
npm run test:memory-leaks
```

Thresholds:
- Max heap growth: 10MB
- No memory leaks
- GC frequency: Monitor for anomalies

## Database Performance

### Query Performance
Monitor query performance using Prisma metrics:
- Query execution time
- Number of queries
- Connection pool usage

Tools:
- Prisma Studio for query analysis
- Custom metrics collection
- Postgres EXPLAIN ANALYZE

### Connection Pool
Configuration in `backend/src/config/index.ts`:
```typescript
const config = {
  database: {
    poolMin: 2,
    poolMax: 10,
    poolIdle: 10000
  }
};
```

## Continuous Monitoring

### CI Pipeline Metrics
Our CI workflow collects and archives:
- Bundle size reports
- Lighthouse scores
- Load test results
- Memory profiles

### Production Monitoring
We monitor:
1. Real User Metrics (RUM)
   - Page load times
   - Time to first byte
   - Client-side errors

2. Server Metrics
   - Request latency
   - Error rates
   - Resource utilization

3. Database Metrics
   - Query performance
   - Connection pool stats
   - Index usage

## Benchmarking Best Practices

1. **Consistency**
   - Use consistent test environments
   - Run benchmarks multiple times
   - Account for variance

2. **Realistic Data**
   - Use production-like datasets
   - Simulate real user behavior
   - Test with varying load patterns

3. **Regular Testing**
   - Run benchmarks on PRs
   - Monitor trends over time
   - Alert on regressions

4. **Documentation**
   - Record test conditions
   - Document anomalies
   - Keep historical data

5. **Action Items**
   - Set clear performance budgets
   - Define action thresholds
   - Plan optimization strategies
