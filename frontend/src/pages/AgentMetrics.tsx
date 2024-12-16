import { SystemMetrics, getSystemMetrics } from '@dsh/shared/types/metrics';
import { LogMetadata } from '@dsh/shared/utils/logger';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { logger, createLogMetadata } from '../utils/logger';
import { WebSocketTest } from '../utils/websocket-test';

// Custom error for metrics-related issues
class MetricsError extends Error {
  readonly component: string;

  constructor(message: string, component = 'agent-metrics') {
    super(message);
    this.name = 'MetricsError';
    this.component = component;
    Object.setPrototypeOf(this, MetricsError.prototype);
  }
}

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

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const AgentMetrics: React.FC = () => {
  const [state, setState] = useState<MetricsState>({
    data: null,
    status: 'Connecting...',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const websocketTest = new WebSocketTest();
    let isActive = true;

    const testWebSocketConnection = async (): Promise<() => void> => {
      try {
        await websocketTest.connect();
        if (!isActive) return () => websocketTest.disconnect();

        setState((prevState: MetricsState) => ({ ...prevState, status: 'Connected' }));
        websocketTest.sendTestMessage('Frontend WebSocket Test');
      } catch (err) {
        if (!isActive) return () => websocketTest.disconnect();

        const errorMessage = isError(err) ? err.message : 'Unknown connection error';
        const errorObj = isError(err) ? err : new MetricsError(errorMessage);

        setError(errorMessage);
        setState((prevState: MetricsState) => ({ ...prevState, status: 'Connection Failed' }));

        const metadata: Partial<LogMetadata> = {
          component: 'agent-metrics',
          error: errorObj,
          message: 'WebSocket Connection Test Failed'
        };
        
        logger.error(
          'WebSocket Connection Test Failed', 
          createLogMetadata('agent-metrics', errorObj, metadata)
        );
        
        return () => {
          websocketTest.disconnect();
        };
      }

      const socket = websocketTest.getSocket();
      
      if (socket === null) {
        const initError = new MetricsError('Socket Initialization Failed');
        setError(initError.message);
        setState((prevState: MetricsState) => ({ ...prevState, status: 'Socket Initialization Failed' }));

        return () => {
          websocketTest.disconnect();
        };
      }

      const setupSocketListeners = (socketInstance: Socket): void => {
        socketInstance.on('connect', () => {
          if (!isActive) return;
          
          const metadata: Partial<LogMetadata> = {
            component: 'agent-metrics',
            message: 'Socket.IO Connected'
          };
          
          logger.info(
            'Socket.IO Connected', 
            createLogMetadata('agent-metrics', undefined, metadata)
          );
          
          setState((prevState: MetricsState) => ({ ...prevState, status: 'Connected' }));
        });

        socketInstance.on('metrics', (data: unknown) => {
          if (!isActive) return;
          
          if (data === null || typeof data !== 'object') {
            const error = new MetricsError('Invalid metrics data');
            setError(error.message);
            setState((prevState: MetricsState) => ({ ...prevState, status: 'Invalid Metrics Data' }));
            return;
          }

          const typedData = data as SystemMetrics;
          setState((prevState: MetricsState) => ({ ...prevState, data: typedData }));
        });

        socketInstance.on('connect_error', (socketError: Error) => {
          if (!isActive) return;
          
          const errorMessage = socketError.message || 'Connection Error';
          setError(errorMessage);
          
          const metadata: Partial<LogMetadata> = {
            component: 'agent-metrics',
            error: socketError,
            message: 'Socket.IO Connection Error'
          };
          
          logger.error(
            'Socket.IO Connection Error', 
            createLogMetadata('agent-metrics', socketError, metadata)
          );
          
          setState((prevState: MetricsState) => ({ ...prevState, status: 'Connection Error' }));
        });

        socketInstance.on('disconnect', () => {
          if (!isActive) return;
          
          const metadata: Partial<LogMetadata> = {
            component: 'agent-metrics',
            message: 'Socket.IO Disconnected'
          };
          
          logger.warn(
            'Socket.IO Disconnected', 
            createLogMetadata('agent-metrics', undefined, metadata)
          );
          
          setState((prevState: MetricsState) => ({ ...prevState, status: 'Disconnected' }));
        });
      };

      setupSocketListeners(socket);

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

  // Error handling
  const hasError = typeof error === 'string' && error.trim().length > 0;
  if (hasError) {
    return (
      <div className="p-4 text-red-500">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Loading state
  if (state.data === null) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
        <p>Connection Status: {state.status}</p>
        <p>Waiting for metrics...</p>
      </div>
    );
  }

  // Metrics processing with safe type handling
  const safeMetrics = getSystemMetrics(state.data);

  if (typeof safeMetrics === 'undefined' || safeMetrics === null || typeof safeMetrics.metrics === 'undefined' || safeMetrics.metrics === null) {
    return <div>No metrics available</div>;
  }

  const {
    metrics: {
      cpuUsage,
      memoryUsage,
      diskUsage,
      memory,
      storage
    },
    hostname,
    ipAddress,
  } = safeMetrics;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
      <p>Connection Status: {state.status}</p>
      <p>Hostname: {hostname}</p>
      <p>IP Address: {ipAddress}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">System Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">CPU Usage</h3>
            <p>{formatPercentage(cpuUsage)}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">Memory Usage</h3>
            <p>{formatPercentage(memoryUsage)}</p>
            {typeof memory !== 'undefined' && memory !== null && (
              <div className="mt-2 text-sm">
                <p>Total: {(memory.total / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
                <p>Used: {(memory.used / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
                <p>Free: {(memory.free / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
                <p>Usage: {formatPercentage(memory.usage)}</p>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">Disk Usage</h3>
            <p>{formatPercentage(diskUsage)}</p>
            {typeof storage !== 'undefined' && storage !== null && (
              <div className="mt-2 text-sm">
                <p>Total: {(storage.total / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
                <p>Used: {(storage.used / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
                <p>Free: {(storage.free / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
                <p>Usage: {formatPercentage(storage.usage)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMetrics;
