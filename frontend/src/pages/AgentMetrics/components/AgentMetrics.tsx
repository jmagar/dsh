import { Box } from '@mui/material';
import React from 'react';
import { Socket } from 'socket.io-client';

import { useMetrics } from '../../hooks';
import { WebSocketTest } from '../../utils/websocket-test';
import { styles } from './styles';
import { formatPercentage } from './utils';

export function AgentMetrics({ socket }: { socket: Socket | null }): JSX.Element {
  const metricsState = useMetrics();

  return (
    <Box sx={styles.container}>
      <h2>System Metrics</h2>
      {metricsState.status === 'loading' && (
        <Box sx={styles.loading}>Loading...</Box>
      )}
      {metricsState.status === 'error' && (
        <Box sx={styles.error}>Error loading metrics</Box>
      )}
      {metricsState.status === 'success' && metricsState.data && (
        <Box>
          <Box sx={styles.metricsSection}>
            <h3>CPU</h3>
            <p>Usage: {formatPercentage(metricsState.data.cpu.usage)}</p>
            <p>Load Average: {metricsState.data.cpu.loadAverage}</p>
          </Box>

          <Box sx={styles.metricsSection}>
            <h3>Memory</h3>
            <p>Usage: {formatPercentage(metricsState.data.memory.usage)}</p>
            <p>
              Available: {Math.round(metricsState.data.memory.available / 1024 / 1024)}{' '}
              MB
            </p>
            <p>Total: {Math.round(metricsState.data.memory.total / 1024 / 1024)} MB</p>
          </Box>

          <Box sx={styles.metricsSection}>
            <h3>Disk</h3>
            <p>Usage: {formatPercentage(metricsState.data.disk.usage)}</p>
            <p>
              Available: {Math.round(metricsState.data.disk.available / 1024 / 1024)}{' '}
              MB
            </p>
            <p>Total: {Math.round(metricsState.data.disk.total / 1024 / 1024)} MB</p>
          </Box>
        </Box>
      )}
      <WebSocketTest socket={socket} />
    </Box>
  );
}
