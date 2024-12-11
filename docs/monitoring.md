# Monitoring and Logging Guide

This document outlines our monitoring and logging strategy for the DSH project.

## Logging Architecture

### Log Levels

We use the following log levels:
- **ERROR**: Application errors that need immediate attention
- **WARN**: Warning conditions that should be reviewed
- **INFO**: General operational information
- **DEBUG**: Detailed information for debugging

### Logger Implementation

We use Winston for backend logging and a custom browser logger for frontend:

```typescript
// Backend Logger (Winston)
import winston from 'winston';

const logger = new BackendLogger('dsh-backend', process.env.NODE_ENV);

logger.error('Operation failed', {
  error,
  context: { userId, operation }
});

// Frontend Logger (Browser)
import { logger } from '@dsh/frontend/utils/logger';

logger.info('Component mounted', {
  component: 'UserDashboard',
  renderTime: performance.now()
});
```

### Log Format

All logs follow this structure:
```json
{
  "timestamp": "2024-01-20T12:00:00.000Z",
  "level": "info",
  "message": "Operation completed",
  "metadata": {
    "service": "backend",
    "environment": "production",
    "operation": "backup",
    "duration": 1500
  }
}
```

## Metrics Collection

### System Metrics

1. **CPU & Memory**
```typescript
// Backend metrics
metrics.gauge('cpu_usage_percent').set(cpuUsage);
metrics.gauge('memory_usage_bytes').set(memoryUsage);

// Process metrics
metrics.gauge('process_heap_bytes').set(process.memoryUsage().heapUsed);
metrics.gauge('process_cpu_percent').set(process.cpuUsage().user);
```

2. **Database Metrics**
```typescript
// Query performance
metrics.histogram('db_query_duration_seconds', {
  operation: 'select',
  table: 'users'
}).observe(duration);

// Connection pool
metrics.gauge('db_connections_active').set(poolStats.active);
metrics.gauge('db_connections_idle').set(poolStats.idle);
```

3. **Redis Metrics**
```typescript
// Operation latency
metrics.histogram('redis_operation_duration_seconds', {
  command: 'get'
}).observe(duration);

// Memory usage
metrics.gauge('redis_memory_bytes').set(memoryUsage);
```

### Application Metrics

1. **HTTP Metrics**
```typescript
// Request duration
metrics.histogram('http_request_duration_seconds', {
  method: req.method,
  path: req.path,
  status: res.statusCode
}).observe(duration);

// Request rate
metrics.counter('http_requests_total', {
  method: req.method,
  path: req.path
}).inc();
```

2. **WebSocket Metrics**
```typescript
// Connection count
metrics.gauge('ws_connections_active').set(io.engine.clientsCount);

// Message rate
metrics.counter('ws_messages_total', {
  type: messageType
}).inc();
```

3. **Business Metrics**
```typescript
// Active servers
metrics.gauge('active_servers_total').set(serverCount);

// Alert frequency
metrics.counter('alerts_triggered_total', {
  severity: alert.severity,
  type: alert.type
}).inc();
```

### Frontend Performance

1. **Component Metrics**
```typescript
// Render time
metrics.histogram('component_render_duration_seconds', {
  component: 'UserDashboard'
}).observe(duration);

// Route changes
metrics.histogram('route_change_duration_seconds', {
  from: '/dashboard',
  to: '/servers'
}).observe(duration);
```

2. **API Client Metrics**
```typescript
// API call duration
metrics.histogram('api_call_duration_seconds', {
  endpoint: '/api/servers',
  method: 'GET'
}).observe(duration);

// Error rate
metrics.counter('api_errors_total', {
  endpoint: '/api/servers',
  code: error.code
}).inc();
```

## Monitoring Setup

### Prometheus Configuration

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'dsh-backend'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'

  - job_name: 'dsh-node'
    static_configs:
      - targets: ['localhost:9100']
```

### Grafana Dashboards

1. **System Overview**
```typescript
// CPU Usage Query
rate(process_cpu_seconds_total[5m]) * 100

// Memory Usage Query
process_resident_memory_bytes / 1024 / 1024

// Network Traffic Query
rate(network_transmit_bytes_total[5m])
```

2. **Application Performance**
```typescript
// Request Latency Query
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket[5m])
)

// Error Rate Query
sum(rate(http_requests_total{status=~"5.."}[5m])) /
sum(rate(http_requests_total[5m])) * 100
```

## Alerting

### Alert Rules

```yaml
groups:
  - name: dsh_alerts
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) /
              sum(rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: High error rate detected
          description: Error rate is above 5% for 5 minutes

      - alert: HighLatency
        expr: histogram_quantile(0.95,
                rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: High latency detected
          description: 95th percentile latency is above 1s
```

### Alert Channels

1. **Email Notifications**
```typescript
const notifyByEmail = async (alert: Alert) => {
  await sendEmail({
    to: config.alerts.email,
    subject: `[${alert.severity}] ${alert.summary}`,
    body: alert.description
  });
};
```

2. **Slack Integration**
```typescript
const notifySlack = async (alert: Alert) => {
  await fetch(config.alerts.slackWebhook, {
    method: 'POST',
    body: JSON.stringify({
      text: `[${alert.severity}] ${alert.summary}\n${alert.description}`
    })
  });
};
```

## Best Practices

1. **Logging**
   - Use structured logging
   - Include relevant context
   - Avoid sensitive information
   - Implement log rotation
   - Use appropriate log levels

2. **Metrics**
   - Use meaningful metric names
   - Add relevant labels
   - Keep cardinality under control
   - Document metric meanings
   - Monitor metric growth

3. **Alerting**
   - Define clear thresholds
   - Avoid alert fatigue
   - Include runbooks
   - Test alert rules
   - Regular review of alerts

4. **Performance**
   - Monitor key indicators
   - Set up baselines
   - Track trends
   - Regular benchmarking
   - Performance budgets

5. **Maintenance**
   - Regular metric cleanup
   - Log retention policy
   - Dashboard updates
   - Alert rule review
   - Documentation updates
```
