import { MetricType, MetricLabels } from '@dsh/shared';

export interface BaseMetric {
  name: string;
  value: number;
  labels?: MetricLabels;
}

export interface MetricPayload {
  name: string;
  value: number;
  type: MetricType;
  labels: MetricLabels;
}

export interface BrowserMetricData {
  type: MetricType;
  value: number;
  labels: MetricLabels;
}
