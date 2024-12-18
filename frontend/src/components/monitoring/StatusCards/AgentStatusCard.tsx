import { formatBytes, formatUptime } from '@dsh/shared/utils/format.js';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import React from 'react';

import type { AgentStatusCardProps } from '../../../types/components.types.js';

export const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ 
  agentStatus, 
  metrics, 
  onRefresh,
  className 
}) => {
  return (
    <Card className={className}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">
            {agentStatus.hostname}
          </Typography>
          {onRefresh && (
            <IconButton onClick={onRefresh} size="small">
              <RefreshIcon />
            </IconButton>
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Status: {agentStatus.status}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Uptime: {formatUptime(metrics.uptime)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Memory: {formatBytes(metrics.memory.used)} / {formatBytes(metrics.memory.total)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            CPU Load: {metrics.cpu.loadAvg[0].toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 