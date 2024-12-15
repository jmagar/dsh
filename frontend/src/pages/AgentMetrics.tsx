import { SystemMetrics, getSystemMetrics } from '@dsh/shared/types/metrics';
import { LogMetadata } from '@dsh/shared/utils/logger';
import React, { useEffect, useState } from 'react';

import { logger, createLogMetadata } from '../utils/logger';
import { WebSocketTest } from '../utils/websocket-test';

interface MetricsState {
  data: SystemMetrics | null;
  status: string;
}

function formatPercentage(value: number | undefined): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A';
  }
  return `${(value * 100).toFixed(1)}%`;
}

const AgentMetrics: React.FC = () => {
  const [state, setState] = useState<MetricsState>({
    data: null,
    status: 'Connecting...',
  });

  useEffect(() => {
    const websocketTest = new WebSocketTest();
    let isActive = true;

    const testWebSocketConnection = async (): Promise<() => void> => {
      try {
        await websocketTest.connect();
        if (!isActive) return () => websocketTest.disconnect();

        setState(prev => ({ ...prev, status: 'Connected' }));
        websocketTest.sendTestMessage('Frontend WebSocket Test');
      } catch (error) {
        if (!isActive) return () => websocketTest.disconnect();

        setState(prev => ({ ...prev, status: 'Connection Failed' }));
        const errorObj = error instanceof Error ? error : new Error(String(error));
        const metadata: Partial<LogMetadata> = {
          component: 'agent-metrics',
          error: errorObj,
        };
        logger.error('WebSocket Connection Test Failed', createLogMetadata('agent-metrics', errorObj, metadata));
        return () => {
          websocketTest.disconnect();
        };
      }

      const socket = websocketTest.getSocket();
      
      if (socket === null) {
        setState(prev => ({ ...prev, status: 'Socket Initialization Failed' }));
        return () => {
          websocketTest.disconnect();
        };
      }

      socket.on('connect', () => {
        if (!isActive) return;
        const metadata: Partial<LogMetadata> = {
          component: 'agent-metrics',
        };
        logger.info('Socket.IO Connected', createLogMetadata('agent-metrics', undefined, metadata));
        setState(prev => ({ ...prev, status: 'Connected' }));
      });

      socket.on('metrics', (data: SystemMetrics) => {
        if (!isActive) return;
        setState(prev => ({ ...prev, data }));
      });

      socket.on('connect_error', (error: Error) => {
        if (!isActive) return;
        const metadata: Partial<LogMetadata> = {
          component: 'agent-metrics',
          error,
        };
        logger.error('Socket.IO Connection Error', createLogMetadata('agent-metrics', error, metadata));
        setState(prev => ({ ...prev, status: 'Connection Error' }));
      });

      socket.on('disconnect', () => {
        if (!isActive) return;
        const metadata: Partial<LogMetadata> = {
          component: 'agent-metrics',
        };
        logger.warn('Socket.IO Disconnected', createLogMetadata('agent-metrics', undefined, metadata));
        setState(prev => ({ ...prev, status: 'Disconnected' }));
      });

      return () => {
        socket.disconnect();
        websocketTest.disconnect();
      };
    };

    const cleanupPromise = testWebSocketConnection();
    
    return () => {
      isActive = false;
      void cleanupPromise.then(cleanup => cleanup());
    };
  }, []);

  if (state.data === null) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
        <p>Connection Status: {state.status}</p>
        <p>Waiting for metrics...</p>
      </div>
    );
  }

  const { data: metrics } = state;
  const safeMetrics = getSystemMetrics(metrics);

  if (!safeMetrics || !safeMetrics.metrics) {
    return <div>No metrics available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
      <p>Connection Status: {state.status}</p>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">System Info</h2>
        <div>
          <p><span className="font-medium">Hostname:</span> {safeMetrics.hostname}</p>
          <p><span className="font-medium">IP Address:</span> {safeMetrics.ipAddress}</p>
          <p>
            <span className="font-medium">Platform:</span>{' '}
            {safeMetrics.osInfo?.platform ?? 'N/A'}
          </p>
          <p>
            <span className="font-medium">OS:</span>{' '}
            {safeMetrics.osInfo?.os ?? 'N/A'}
          </p>
          <p>
            <span className="font-medium">Architecture:</span>{' '}
            {safeMetrics.osInfo?.arch ?? 'N/A'}
          </p>
        </div>
      </div>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Performance Metrics</h2>
        <div>
          <p>
            <span className="font-medium">CPU Usage:</span>{' '}
            {formatPercentage(safeMetrics.metrics.cpuUsage)}
          </p>
          <p>
            <span className="font-medium">Memory Usage:</span>{' '}
            {formatPercentage(safeMetrics.metrics.memoryUsage)}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Last updated: {new Date(safeMetrics.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default AgentMetrics;
