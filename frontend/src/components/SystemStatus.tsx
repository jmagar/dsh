import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useMemo, useCallback } from 'react';

interface ServiceStatus {
  status: 'healthy' | 'error';
  timestamp?: string;
  value?: string;
  error?: string;
}

interface SystemStatus {
  timestamp: string;
  services: {
    postgres: ServiceStatus;
    redis: ServiceStatus;
  };
}

const ServiceStatusCard: React.FC<{ name: string; status: ServiceStatus }> = ({
  name,
  status,
}) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        {status.status === 'healthy' ? (
          <CheckCircleIcon color="success" />
        ) : (
          <ErrorIcon color="error" />
        )}
        <Typography variant="h6" component="div">
          {name}
        </Typography>
      </Stack>
      <Typography color="text.secondary">
        Status: {status.status}
      </Typography>
      {typeof status.timestamp === 'string' && status.timestamp.length > 0 && (
        <Typography color="text.secondary">
          Last Updated: {new Date(status.timestamp).toLocaleString()}
        </Typography>
      )}
      {typeof status.value === 'string' && status.value.length > 0 && (
        <Typography color="text.secondary">
          Test Value: {status.value}
        </Typography>
      )}
      {typeof status.error === 'string' && status.error.length > 0 && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {status.error}
        </Alert>
      )}
    </CardContent>
  </Card>
);

export const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<SystemStatus>('http://localhost:3000/health/status');
      setStatus(response.data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch system status';
      setError(errorMessage);
      void Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
    const interval = setInterval(() => {
      void fetchStatus();
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const formattedTimestamp = useMemo(() => {
    if (status == null) return null;
    try {
      return new Date(status.timestamp).toLocaleString();
    } catch {
      return null;
    }
  }, [status]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (typeof error === 'string' && error.length > 0) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (status == null) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        System Status
      </Typography>
      {typeof formattedTimestamp === 'string' && formattedTimestamp.length > 0 && (
        <Typography color="text.secondary" gutterBottom>
          Last checked: {formattedTimestamp}
        </Typography>
      )}
      <ServiceStatusCard name="PostgreSQL" status={status.services.postgres} />
      <ServiceStatusCard name="Redis" status={status.services.redis} />
    </Box>
  );
};
