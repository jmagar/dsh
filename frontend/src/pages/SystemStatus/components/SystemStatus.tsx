import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';

import { useSystemStatus } from '../../hooks';
import { AgentStatusCard, ServiceStatusCard } from './components';
import { styles } from './styles';

export const SystemStatus: React.FC = () => {
  const state = useSystemStatus();

  if (state.error) {
    return (
      <Alert severity="error" sx={styles.errorAlert}>
        {state.error}
      </Alert>
    );
  }

  if (!state.data) {
    return (
      <Box sx={styles.loading}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        System Status
      </Typography>

      <Grid container spacing={2} sx={styles.grid}>
        <Grid item xs={12} md={6}>
          <ServiceStatusCard
            name="Database"
            isHealthy={state.data.details?.database ?? false}
            error={state.data.details?.error}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ServiceStatusCard
            name="Redis"
            isHealthy={state.data.details?.redis ?? false}
            error={state.data.details?.error}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={styles.agentsTitle}>
        Connected Agents
      </Typography>

      {state.data.agents.map((agent) => (
        <AgentStatusCard
          key={agent.id}
          agent={agent}
          metrics={state.data.agentMetrics[agent.id] ?? null}
        />
      ))}

      {state.data.agents.length === 0 && (
        <Typography variant="body1" sx={styles.noAgents}>
          No agents connected
        </Typography>
      )}
    </Box>
  );
};
