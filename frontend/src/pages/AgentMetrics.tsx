import { SystemMetrics } from '@dsh/shared/types/metrics';
import { LogMetadata } from '@dsh/shared/utils/logger';
import React, { useEffect, useState } from 'react';

import { logger, createLogMetadata } from '../utils/logger';
import { WebSocketTest } from '../utils/websocket-test';

interface MetricsState {
  data: SystemMetrics | null;
  status: string;
}

interface OSInfo {
  platform: string;
  os: string;
  arch: string;
  release?: string;
}

// Type guard for Record<string, unknown>
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Type guard for OSInfo
function isOSInfo(value: unknown): value is OSInfo {
  if (!isRecord(value)) {
    return false;
  }

  const hasRequiredFields = 
    typeof value.platform === 'string' &&
    typeof value.os === 'string' &&
    typeof value.arch === 'string';

  if (!hasRequiredFields) {
    return false;
  }

  // Check optional field
  if ('release' in value && value.release !== undefined && typeof value.release !== 'string') {
    return false;
  }

  return true;
}

// Helper function to safely handle nullable strings
function getDisplayValue(value: string | null | undefined): string {
  if (value === null || value === undefined || value.trim() === '') {
    return 'N/A';
  }
  return value;
}

// Helper function to safely handle OS info properties
function getOSInfoValue(osInfo: unknown, key: keyof OSInfo): string {
  if (!isOSInfo(osInfo)) {
    return 'N/A';
  }
  const value = osInfo[key];
  return typeof value === 'string' ? value : 'N/A';
}

// Helper function to format percentage
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
      <p>Connection Status: {state.status}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">System Info</h2>
          <div>
            <p><span className="font-medium">Hostname:</span> {getDisplayValue(metrics.hostname)}</p>
            <p><span className="font-medium">IP Address:</span> {getDisplayValue(metrics.ipAddress)}</p>
            <p>
              <span className="font-medium">Platform:</span>{' '}
              {getOSInfoValue(metrics.osInfo, 'platform')}
            </p>
            <p>
              <span className="font-medium">OS:</span>{' '}
              {getOSInfoValue(metrics.osInfo, 'os')}
            </p>
            <p>
              <span className="font-medium">Architecture:</span>{' '}
              {getOSInfoValue(metrics.osInfo, 'arch')}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Resource Usage</h2>
          <div>
            <p>
              <span className="font-medium">CPU Usage:</span>{' '}
              {formatPercentage(metrics.cpu?.total)}
            </p>
            <p>
              <span className="font-medium">Memory Usage:</span>{' '}
              {formatPercentage(metrics.memory?.usage)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Last updated: {new Date(metrics.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default AgentMetrics;
