import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';

import { AgentStatus, AgentMetrics } from '../../../components/AgentManager/types';
import { AgentStatusCard, ServiceStatusCard } from '../../../components/StatusCards';
import { useSystemStatus } from '../../../hooks/useSystemStatus';

import { styles } from './styles';

interface SystemStatusData {
  details: {
    database: boolean;
    redis: boolean;
    error?: string;
  };
  agents: AgentStatus[];
  agentMetrics: Record<string, AgentMetrics>;
}

interface SystemStatusState {
  data: SystemStatusData | null;
  error: string | null;
}

export const SystemStatus: React.FC = () => {
  const state = useSystemStatus() as SystemStatusState;

  if (state.error !== null) {
    return (
      <Alert severity="error" sx={styles.errorAlert}>
        {state.error}
      </Alert>
    );
  }

  if (state.data === null) {
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

      {state.data.agents.map((agent: AgentStatus) => (
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
