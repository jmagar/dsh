// External dependencies
import { MetricType, MetricLabels, createLabels } from '@dsh/shared';

// Internal dependencies
import { logger } from './logger';
import { BaseMetric, MetricPayload, BrowserMetricData } from '../types/metrics.types';

interface BaseMetric {
  name: string;
  value: number;
  labels?: MetricLabels;
}

interface MetricPayload {
  name: string;
  value: number;
  type: MetricType;
  labels: MetricLabels;
}

class BrowserMetrics {
  private metrics: Map<string, BrowserMetricData> = new Map();

  constructor(
    private readonly namespace: string,
    private readonly environment: string
  ) {}

  private createMetricKey(name: string, labels: MetricLabels = {}): string {
    const labelStr = Object.entries(labels)
      .map(([k, v]) => `${k}=${v}`)
      .join(',');
    return `${name}${labelStr ? `:${labelStr}` : ''}`;
  }

  increment(name: string, labels: MetricLabels = {}): void {
    const key = this.createMetricKey(name, labels);
    const existing = this.metrics.get(key);

    if (existing) {
      existing.value += 1;
    } else {
      this.metrics.set(key, {
        type: MetricType.COUNTER,
        value: 1,
        labels,
      });
    }
  }

  gauge(name: string, value: number, labels: MetricLabels = {}): void {
    const key = this.createMetricKey(name, labels);
    this.metrics.set(key, {
      type: MetricType.GAUGE,
      value,
      labels,
    });
  }

  histogram(name: string, value: number, labels: MetricLabels = {}): void {
    const key = this.createMetricKey(name, labels);
    this.metrics.set(key, {
      type: MetricType.HISTOGRAM,
      value,
      labels,
    });
  }

  sendToBackend(): void {
    if (this.metrics.size === 0) return;

    try {
      const metricsPayload: MetricPayload[] = Array.from(this.metrics.entries()).map(
        ([key, metric]) => {
          const [name] = key.split(':');
          return {
            name: name ?? 'unknown',
            value: metric.value,
            type: metric.type,
            labels: createLabels(this.namespace, this.environment, metric.labels),
          };
        }
      );

      void fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricsPayload),
      }).catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error : new Error(String(error));

        const metricsRecord = metricsPayload.reduce<Record<string, number>>((acc, metric) => {
          acc[metric.name] = metric.value;
          return acc;
        }, {});

        logger.error('Failed to send metrics', {
          error: errorMessage,
          metrics: metricsRecord,
        });
      });

      // Clear metrics after sending
      this.metrics.clear();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error : new Error(String(error));

      logger.error('Error preparing metrics payload', {
        error: errorMessage,
      });
    }
  }
}

class FrontendMetrics {
  private metrics: BaseMetric[] = [];

  increment(name: string, labels: MetricLabels = {}): void {
    const existingMetric = this.metrics.find(
      m => m.name === name && this.labelsMatch(m.labels, labels)
    );

    if (existingMetric) {
      existingMetric.value += 1;
    } else {
      this.metrics.push({
        name,
        value: 1,
        labels,
      });
    }
  }

  private labelsMatch(labels1?: MetricLabels, labels2?: MetricLabels): boolean {
    if (!labels1 && !labels2) return true;
    if (!labels1 || !labels2) return false;

    return (
      Object.keys(labels1).every(key => labels1[key] === labels2[key]) &&
      Object.keys(labels2).every(key => labels2[key] === labels1[key])
    );
  }

  sendToBackend(): void {
    if (this.metrics.length === 0) return;

    try {
      const env = process.env.NODE_ENV;
      const environment = env !== null && env !== undefined ? env : 'development';

      const metricsPayload: MetricPayload[] = this.metrics.map(metric => ({
        name: metric.name,
        value: metric.value,
        type: MetricType.COUNTER,
        labels: createLabels('frontend', environment, metric.labels ?? {}),
      }));

      void fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricsPayload),
      }).catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error : new Error(String(error));

        const metricsRecord = metricsPayload.reduce<Record<string, number>>((acc, metric) => {
          acc[metric.name] = metric.value;
          return acc;
        }, {});

        logger.error('Failed to send metrics', {
          error: errorMessage,
          metrics: metricsRecord,
        });
      });

      // Clear metrics after sending
      this.metrics = [];
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error : new Error(String(error));

      logger.error('Error preparing metrics payload', {
        error: errorMessage,
      });
    }
  }
}

// Create singleton instances
const env = process.env.NODE_ENV;
const environment = env !== null && env !== undefined ? env : 'development';
export const metrics = new BrowserMetrics('dsh-frontend', environment);
export const frontendMetrics = new FrontendMetrics();
