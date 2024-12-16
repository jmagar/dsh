import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
  Alert,
  Paper,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { useDockerStats } from '@/client/hooks/useDockerStats';
import { getStyles } from './styles';

interface DockerStatsProps {
  hostIds: string[];
  pollInterval?: number;
  maxDataPoints?: number;
}

interface ChartData {
  name: string;
  value: number;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export function DockerStats({
  hostIds,
  pollInterval = 1000,
  maxDataPoints = 60,
}: DockerStatsProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { stats, loading, error, clearStats } = useDockerStats({
    hostIds,
    pollInterval,
    maxDataPoints,
  });

  const handleRefresh = () => {
    clearStats();
  };

  if (error) {
    return (
      <Alert
        severity="error"
        sx={styles.errorAlert}
        action={
          <IconButton color="inherit" size="small" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <Paper sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h6">Container Stats</Typography>
        <Box display="flex" gap={1}>
          <Tooltip title="Clear stats">
            <IconButton onClick={clearStats}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={styles.content}>
        <Box sx={styles.grid}>
          {Object.entries(stats).map(([containerId, containerStats]) => (
            <Card key={containerId} sx={styles.card}>
              <CardHeader
                sx={styles.cardHeader}
                title={containerId.substring(0, 12)}
                subheader="Resource Usage"
              />
              <CardContent sx={styles.cardContent}>
                {/* CPU Usage Chart */}
                <Box sx={styles.chartContainer}>
                  <ResponsiveContainer>
                    <LineChart data={containerStats.cpuUsage.map((value, index) => ({
                      name: new Date(containerStats.timestamp[index]).toLocaleTimeString(),
                      value,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={theme.palette.primary.main}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={styles.statsGrid}>
                  <Box sx={styles.statItem}>
                    <Typography variant="subtitle2" color="textSecondary">
                      CPU Usage
                    </Typography>
                    <Typography variant="h6">
                      {formatPercentage(containerStats.cpuUsage[containerStats.cpuUsage.length - 1] || 0)}
                    </Typography>
                  </Box>
                  <Box sx={styles.statItem}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Memory Usage
                    </Typography>
                    <Typography variant="h6">
                      {formatBytes(containerStats.memoryUsage[containerStats.memoryUsage.length - 1] || 0)}
                    </Typography>
                  </Box>
                  <Box sx={styles.statItem}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Network RX
                    </Typography>
                    <Typography variant="h6">
                      {formatBytes(containerStats.networkRx[containerStats.networkRx.length - 1] || 0)}
                    </Typography>
                  </Box>
                  <Box sx={styles.statItem}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Network TX
                    </Typography>
                    <Typography variant="h6">
                      {formatBytes(containerStats.networkTx[containerStats.networkTx.length - 1] || 0)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {loading && (
        <Fade in>
          <Box sx={styles.loadingOverlay}>
            <CircularProgress />
          </Box>
        </Fade>
      )}
    </Paper>
  );
}
