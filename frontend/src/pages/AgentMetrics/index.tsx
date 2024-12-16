import React from 'react';
import { Box } from '@mui/material';
import { useSocket } from '../../hooks/useSocket';
import { AgentConnectionManager } from './components/AgentConnectionManager';
import { AgentMetrics as AgentMetricsComponent } from './components/AgentMetrics';

const AgentMetrics: React.FC = () => {
  const socket = useSocket();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AgentConnectionManager />
      <AgentMetricsComponent socket={socket} />
    </Box>
  );
};

export default AgentMetrics;
