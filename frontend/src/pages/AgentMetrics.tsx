import React, { useEffect, useState } from 'react';

import { SystemMetrics } from '../shared/types';
import { logger, createLogMetadata } from '../utils/logger';
import { WebSocketTest } from '../utils/websocket-test';

const AgentMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');

  useEffect(() => {
    const websocketTest = new WebSocketTest();

    const testWebSocketConnection = async (): Promise<() => void> => {
      try {
        await websocketTest.connect();
        setConnectionStatus('Connected');
        
        websocketTest.sendTestMessage('Frontend WebSocket Test');
      } catch (error) {
        setConnectionStatus('Connection Failed');
        const errorObj = error instanceof Error ? error : new Error(String(error));
        logger.error('WebSocket Connection Test Failed', 
          createLogMetadata('agent-metrics', errorObj, {
            component: 'agent-metrics'
          })
        );
        return () => {
          websocketTest.disconnect();
        };
      }

      const socket = websocketTest.getSocket();
      
      if (socket === null) {
        setConnectionStatus('Socket Initialization Failed');
        return () => {
          websocketTest.disconnect();
        };
      }

      socket.on('connect', () => {
        logger.info('Socket.IO Connected', 
          createLogMetadata('agent-metrics', undefined, {
            component: 'agent-metrics'
          })
        );
        setConnectionStatus('Connected');
      });

      socket.on('metrics', (data: SystemMetrics) => {
        setMetrics(data);
      });

      socket.on('connect_error', (error: Error) => {
        logger.error('Socket.IO Connection Error', 
          createLogMetadata('agent-metrics', error, {
            component: 'agent-metrics'
          })
        );
        setConnectionStatus('Connection Error');
      });

      socket.on('disconnect', () => {
        logger.warn('Socket.IO Disconnected', 
          createLogMetadata('agent-metrics', undefined, {
            component: 'agent-metrics'
          })
        );
        setConnectionStatus('Disconnected');
      });

      return () => {
        socket.disconnect();
        websocketTest.disconnect();
      };
    };

    const cleanup = testWebSocketConnection();
    return () => {
      const cleanupPromise = async (): Promise<void> => {
        const cleanupFn = await cleanup;
        cleanupFn();
      };
      void cleanupPromise(); // Explicitly mark as void to satisfy ESLint
    };
  }, []);

  if (metrics === null) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
        <p>Connection Status: {connectionStatus}</p>
        <p>Waiting for metrics...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Metrics</h1>
      <p>Connection Status: {connectionStatus}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">System Info</h2>
          <div>
            <p><span className="font-medium">Hostname:</span> {metrics.hostname}</p>
            <p><span className="font-medium">IP Address:</span> {metrics.ipAddress}</p>
            <p><span className="font-medium">Platform:</span> {metrics.osInfo.platform}</p>
            <p><span className="font-medium">OS:</span> {metrics.osInfo.os}</p>
            <p><span className="font-medium">Architecture:</span> {metrics.osInfo.arch}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Resource Usage</h2>
          <div>
            <p>
              <span className="font-medium">CPU Usage:</span>{' '}
              {metrics.cpuUsage.toFixed(1)}%
            </p>
            <p>
              <span className="font-medium">Memory Usage:</span>{' '}
              {metrics.memoryUsage.toFixed(1)}%
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
