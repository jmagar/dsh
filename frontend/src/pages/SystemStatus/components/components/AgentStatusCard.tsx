import ComputerIcon from '@mui/icons-material/Computer';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { getSystemMetrics } from '@dsh/shared/types/metrics';
import React from 'react';

import { AgentStatusCardProps } from '../types';
import { styles } from '../styles';
import { formatPercentage } from '../utils';

export const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ agent, metrics }) => {
  const safeMetrics = getSystemMetrics(metrics ?? undefined);

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={styles.cardHeader}>
          <ComputerIcon color={agent.connected ? 'success' : 'error'} />
          <Typography variant="h6" component="div">
            {agent.id}
          </Typography>
        </Stack>
        <div>
          <Typography variant="body2">
            CPU Usage: {formatPercentage(safeMetrics.metrics.cpuUsage)}
          </Typography>
          <Typography variant="body2">
            Memory Usage: {formatPercentage(safeMetrics.metrics.memoryUsage)}
          </Typography>
          <Typography variant="body2">
            Disk Usage: {formatPercentage(safeMetrics.metrics.diskUsage)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            OS: {agent.osInfo.os} ({agent.osInfo.platform} {agent.osInfo.arch})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last seen: {new Date(agent.lastSeen).toLocaleString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
