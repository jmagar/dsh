import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

interface SystemStatus {
  status: 'healthy' | 'unhealthy';
  details?: {
    database?: boolean;
    redis?: boolean;
    error?: string;
  };
}

interface ServiceStatusCardProps {
  name: string;
  isHealthy: boolean;
  error?: string | undefined;
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ name, isHealthy, error }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        {isHealthy ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
        <Typography variant="h6" component="div">
          {name}
        </Typography>
      </Stack>
      <Typography color="text.secondary">Status: {isHealthy ? 'Healthy' : 'Unhealthy'}</Typography>
      {typeof error === 'string' && error.length > 0 && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
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
      const response = await axios.get<SystemStatus>(`${process.env.REACT_APP_API_URL}/health`);
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
      <ServiceStatusCard
        name="PostgreSQL"
        isHealthy={status.details?.database ?? false}
        error={status.details?.error}
      />
      <ServiceStatusCard
        name="Redis"
        isHealthy={status.details?.redis ?? false}
        error={status.details?.error}
      />
    </Box>
  );
};
