import type { AgentMetadata } from '@dsh/shared/utils/logger';
import { createLogMetadata } from '@dsh/shared/utils/logger';
import { Counter, Gauge } from 'prom-client';

interface AgentMetrics {
  taskCount: Counter<string>;
  taskDuration: Gauge<string>;
  resourceUsage: Gauge<string>;
  messageCount: Counter<string>;
  errorCount: Counter<string>;
}

export class AgentMonitor {
  private metrics: AgentMetrics;

  constructor() {
    this.metrics = {
      taskCount: new Counter({
        name: 'agent_task_total',
        help: 'Total number of agent tasks',
        labelNames: ['status'],
      }),
      taskDuration: new Gauge({
        name: 'agent_task_duration_seconds',
        help: 'Duration of agent tasks',
        labelNames: ['type'],
      }),
      resourceUsage: new Gauge({
        name: 'agent_resource_usage',
        help: 'Agent resource usage',
        labelNames: ['resource'],
      }),
      messageCount: new Counter({
        name: 'agent_message_total',
        help: 'Total number of agent messages',
        labelNames: ['type'],
      }),
      errorCount: new Counter({
        name: 'agent_error_total',
        help: 'Total number of agent errors',
        labelNames: ['type'],
      }),
    };
  }

  logTaskStart(taskId: string): void {
    const metadata = createLogMetadata('agent', undefined, {
      agentId: taskId,
      taskId,
      state: 'started',
    } as Partial<AgentMetadata>);
    console.info('Agent task started', metadata);
    this.metrics.taskCount.inc({ status: 'started' });
  }

  logTaskComplete(taskId: string, duration: number): void {
    const metadata = createLogMetadata('agent', undefined, {
      agentId: taskId,
      taskId,
      state: 'completed',
      duration,
    } as Partial<AgentMetadata>);
    console.info('Agent task completed', metadata);
    this.metrics.taskCount.inc({ status: 'completed' });
    this.metrics.taskDuration.set({ type: 'task' }, duration);
  }

  logTaskFailure(taskId: string, error: Error): void {
    const metadata = createLogMetadata('agent', error, {
      agentId: taskId,
      taskId,
      state: 'failed',
    } as Partial<AgentMetadata>);
    console.error('Agent task failed', metadata);
    this.metrics.taskCount.inc({ status: 'failed' });
    this.metrics.errorCount.inc({ type: 'task' });
  }

  logStateChange(agentId: string, newState: string): void {
    const metadata = createLogMetadata('agent', undefined, {
      agentId,
      state: newState,
    } as Partial<AgentMetadata>);
    console.info('Agent state changed', metadata);
  }

  logResourceUsage(agentId: string, cpu: number, memory: number): void {
    const metadata = createLogMetadata('agent', undefined, {
      agentId,
      metrics: {
        cpu,
        memory,
      },
    } as Partial<AgentMetadata>);
    console.debug('Agent resource usage', metadata);
    this.metrics.resourceUsage.set({ resource: 'cpu' }, cpu);
    this.metrics.resourceUsage.set({ resource: 'memory' }, memory);
  }

  logMessageSent(agentId: string, messageType: string): void {
    const metadata = createLogMetadata('agent', undefined, {
      agentId,
      metrics: {
        messageType: 1,
      },
    } as Partial<AgentMetadata>);
    console.debug('Agent message sent', metadata);
    this.metrics.messageCount.inc({ type: 'sent' });
  }

  logMessageReceived(agentId: string, messageType: string): void {
    const metadata = createLogMetadata('agent', undefined, {
      agentId,
      metrics: {
        messageType: 1,
      },
    } as Partial<AgentMetadata>);
    console.debug('Agent message received', metadata);
    this.metrics.messageCount.inc({ type: 'received' });
  }
}
