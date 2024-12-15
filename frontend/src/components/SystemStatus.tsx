import { AgentStatus } from '@dsh/shared/types/agent';
import { SystemMetrics } from '@dsh/shared/types/metrics';
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
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

interface SystemStatus {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
  agents?: AgentStatus[];
  agentMetrics?: Record<string, SystemMetrics>;
}

interface ServiceStatusCardProps {
  name: string;
  isHealthy: boolean;
  error?: string | undefined;
}

interface AgentStatusCardProps {
  agent: AgentStatus;
  metrics: SystemMetrics | null;
}

// Helper function to handle nullable strings
function getErrorMessage(error: string | null | undefined): string | null {
  if (error === null || error === undefined) {
    return null;
  }
  const trimmed = error.trim();
  return trimmed === '' ? null : trimmed;
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ name, isHealthy, error }) => {
  const errorMessage = getErrorMessage(error);
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          {isHealthy ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Stack>
        {errorMessage !== null && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ agent, metrics }) => {
  if (!metrics) {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center">
            <ComputerIcon color={agent.connected ? 'success' : 'error'} />
            <Typography variant="h6" component="div">
              {agent.id}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            No metrics available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const cpuUsage = metrics.cpu?.total ?? 0;
  const memoryUsage = metrics.memory?.usage ?? 0;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <ComputerIcon color={agent.connected ? 'success' : 'error'} />
          <Typography variant="h6" component="div">
            {agent.id}
          </Typography>
        </Stack>
        <Box>
          <Typography variant="body2">
            CPU: {(cpuUsage * 100).toFixed(2)}%
          </Typography>
          <Typography variant="body2">
            Memory: {(memoryUsage * 100).toFixed(2)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const SystemStatus: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSystemStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<SystemStatus>('/api/health');
      setSystemStatus(response.data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch system status';
      setError(errorMessage);
      setSystemStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchSystemStatus().catch(() => {
        // Error already handled in fetchSystemStatus
      });
    };

    void fetchData();

    const intervalId = setInterval(() => {
      void fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchSystemStatus]);

  if (loading) {
    return <CircularProgress />;
  }

  const errorMessage = getErrorMessage(error);
  if (errorMessage !== null) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  const isDatabaseHealthy = systemStatus?.details?.database ?? false;
  const isRedisHealthy = systemStatus?.details?.redis ?? false;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            System Services
          </Typography>
          <ServiceStatusCard 
            name="Database" 
            isHealthy={isDatabaseHealthy} 
            error={systemStatus?.details?.error} 
          />
          <ServiceStatusCard 
            name="Redis" 
            isHealthy={isRedisHealthy} 
            error={systemStatus?.details?.error} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Agents
          </Typography>
          {systemStatus?.agents?.map((agent) => (
            <AgentStatusCard 
              key={agent.id} 
              agent={agent} 
              metrics={systemStatus.agentMetrics?.[agent.id] ?? null} 
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemStatus;
