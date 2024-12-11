import { MetricType, MetricNames, LabelNames, createLabels, MetricLabels } from '@dsh/shared/utils/metrics';
import { logger } from './logger';

class BrowserMetrics {
  private metrics: Map<string, any> = new Map();
  private readonly service: string;
  private readonly environment: string;

  constructor(service: string, environment: string) {
    this.service = service;
    this.environment = environment;
    this.initializeMetrics();
    this.setupPerformanceObserver();
  }

  private initializeMetrics() {
    // Component render times
    this.metrics.set('component_render_time', {
      type: MetricType.HISTOGRAM,
      values: new Map<string, number[]>()
    });

    // Route change times
    this.metrics.set('route_change_time', {
      type: MetricType.HISTOGRAM,
      values: new Map<string, number[]>()
    });

    // API call latencies
    this.metrics.set('api_call_duration', {
      type: MetricType.HISTOGRAM,
      values: new Map<string, number[]>()
    });

    // Error counts
    this.metrics.set('error_count', {
      type: MetricType.COUNTER,
      value: 0
    });

    // Resource load times
    this.metrics.set('resource_load_time', {
      type: MetricType.HISTOGRAM,
      values: new Map<string, number[]>()
    });
  }

  private setupPerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observe paint timing
      const paintObserver = new PerformanceObserver(entries => {
        entries.getEntries().forEach(entry => {
          this.recordPerformanceMetric('paint', entry);
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Observe resource timing
      const resourceObserver = new PerformanceObserver(entries => {
        entries.getEntries().forEach(entry => {
          this.recordPerformanceMetric('resource', entry);
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

      // Observe navigation timing
      const navigationObserver = new PerformanceObserver(entries => {
        entries.getEntries().forEach(entry => {
          this.recordPerformanceMetric('navigation', entry);
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    }
  }

  private recordPerformanceMetric(type: string, entry: PerformanceEntry) {
    const labels = createLabels(this.service, this.environment, {
      type,
      name: entry.name,
      entryType: entry.entryType
    });

    if (entry instanceof PerformanceResourceTiming) {
      this.observe('resource_load_time', entry.duration, this.convertLabels(labels));
    } else {
      this.observe(`${type}_time`, entry.duration, this.convertLabels(labels));
    }
  }

  // Record component render time
  recordRenderTime(componentName: string, duration: number) {
    const labels = createLabels(this.service, this.environment, {
      component: componentName
    });
    this.observe('component_render_time', duration, this.convertLabels(labels));
  }

  // Record route change time
  recordRouteChange(from: string, to: string, duration: number) {
    const labels = createLabels(this.service, this.environment, {
      from,
      to
    });
    this.observe('route_change_time', duration, this.convertLabels(labels));
  }

  // Record API call duration
  recordApiCall(endpoint: string, method: string, duration: number, status: number) {
    const labels = createLabels(this.service, this.environment, {
      endpoint,
      method,
      status: status.toString()
    });
    this.observe('api_call_duration', duration, this.convertLabels(labels));
  }

  // Record error
  recordError(type: string, message: string) {
    const labels = createLabels(this.service, this.environment, {
      type,
      message
    });
    this.increment('error_count', this.convertLabels(labels));
  }

  // Convert MetricLabels to Record<string, string>
  private convertLabels(labels: MetricLabels): Record<string, string> {
    const result: Record<string, string> = {};
    Object.entries(labels).forEach(([key, value]) => {
      result[key] = String(value);
    });
    return result;
  }

  // Generic observe method for histograms
  private observe(name: string, value: number, labels: Record<string, string>) {
    const metric = this.metrics.get(name);
    if (metric && metric.type === MetricType.HISTOGRAM) {
      const key = JSON.stringify(labels);
      const values = metric.values.get(key) || [];
      values.push(value);
      metric.values.set(key, values);

      // Send to backend in production
      if (process.env.NODE_ENV === 'production') {
        this.sendToBackend({
          name,
          type: MetricType.HISTOGRAM,
          value,
          labels
        });
      }
    }
  }

  // Generic increment method for counters
  private increment(name: string, labels: Record<string, string>) {
    const metric = this.metrics.get(name);
    if (metric && metric.type === MetricType.COUNTER) {
      metric.value++;

      // Send to backend in production
      if (process.env.NODE_ENV === 'production') {
        this.sendToBackend({
          name,
          type: MetricType.COUNTER,
          value: 1,
          labels
        });
      }
    }
  }

  // Send metrics to backend
  private async sendToBackend(metric: any) {
    try {
      await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metric)
      });
    } catch (error) {
      logger.error('Failed to send metric to backend:', { error });
    }
  }

  // Get current metrics (for debugging)
  getMetrics() {
    const result: Record<string, any> = {};
    this.metrics.forEach((value, key) => {
      if (value.type === MetricType.HISTOGRAM) {
        const entries = Array.from(value.values.entries());
        result[key] = entries.map((entry) => {
          const [labels, values] = entry as [string, number[]];
          return {
            labels: JSON.parse(labels),
            values
          };
        });
      } else {
        result[key] = value.value;
      }
    });
    return result;
  }
}

// Create singleton instance
export const metrics = new BrowserMetrics('dsh-frontend', process.env.NODE_ENV || 'development');
