// External dependencies
import { AgentStatus } from '@dsh/shared/types/agent';
import { SystemMetrics, getSystemMetrics } from '@dsh/shared/types/metrics';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ComputerIcon from '@mui/icons-material/Computer';
import ErrorIcon from '@mui/icons-material/Error';
import { 
  Alert,
  Box, 
  Card, 
  CardContent, 
  CircularProgress, 
  Grid,
  Stack, 
  Tooltip as _Tooltip, 
  Typography 
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

// Internal dependencies
import { apiClient } from '../services/api';

interface SystemStatusData {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
  agents: AgentStatus[];
  agentMetrics: Record<string, SystemMetrics>;
}

interface ServiceStatusCardProps {
  name: string;
  isHealthy: boolean;
  error?: string | undefined;
}

interface AgentStatusCardProps {
  agent: AgentStatus & { osInfo: { platform: string; os: string; arch: string; release?: string } };
  metrics?: SystemMetrics | null;
}

// Helper function to handle nullable strings
function getErrorMessage(error: string | null | undefined): string | null {
  if (error === null || error === undefined) {
    return null;
  }
  const trimmed = error.trim();
  return trimmed === '' ? null : trimmed;
}

function formatPercentage(value: number = 0): string {
  return `${value.toFixed(2)}%`;
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ name, isHealthy, error }) => {
  const errorMessage = getErrorMessage(error);
  const hasError = errorMessage !== null && errorMessage !== '';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          {isHealthy ? (
            <CheckCircleIcon color="success" />
          ) : (
            <ErrorIcon color="error" />
          )}
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Stack>
        {hasError && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ agent, metrics }) => {
  const safeMetrics = getSystemMetrics(metrics ?? undefined);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
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

const SystemStatus: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatusData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSystemStatus = useCallback(async () => {
    try {
      const response = await apiClient.get<SystemStatusData>('/health');
      setSystemStatus(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch system status');
      console.error('Error fetching system status:', err);
    }
  }, []);

  useEffect(() => {
    void fetchSystemStatus();
    const interval = setInterval(() => void fetchSystemStatus(), 5000);
    return () => clearInterval(interval);
  }, [fetchSystemStatus]);

  const hasError = error !== null && error !== '';

  if (hasError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!systemStatus) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Status
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ServiceStatusCard
            name="Database"
            isHealthy={systemStatus.details?.database ?? false}
            error={systemStatus.details?.error}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ServiceStatusCard
            name="Redis"
            isHealthy={systemStatus.details?.redis ?? false}
            error={systemStatus.details?.error}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Connected Agents
      </Typography>

      {systemStatus.agents.map((agent) => (
        <AgentStatusCard
          key={agent.id}
          agent={agent as AgentStatusCardProps['agent']}
          metrics={systemStatus.agentMetrics[agent.id] ?? null}
        />
      ))}

      {systemStatus.agents.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No agents connected
        </Typography>
      )}
    </Box>
  );
};

export default SystemStatus;
