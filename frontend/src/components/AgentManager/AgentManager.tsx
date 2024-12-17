import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  LinkOff as DisconnectIcon,
  Refresh as RefreshIcon,
  Speed as TestIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';

import { testAgentConnection } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  connectAgent,
  disconnectAgent,
  refreshAgents,
  selectAgentConnections,
  selectAgentError,
  selectAgentLoading,
  selectSelectedAgentId,
  setSelectedAgent,
} from '../../store/slices/agentSlice';
import {
  fetchMetrics,
  selectMetricsForAgent,
  selectMetricsLoading,
  selectMetricsError,
} from '../../store/slices/metricsSlice';
import {
  selectAddAgentDialogOpen,
  setAddAgentDialogOpen,
} from '../../store/slices/uiSlice';

import { getStyles } from './styles';
import type { AgentFormData, TestResult, AgentConnection } from './types';
import { formatPercentage, formatBytes } from './utils';

const initialFormData: AgentFormData = {
  name: '',
  host: '',
  port: '22',
  apiKey: '',
  sshKey: '',
};

export function AgentManager(): JSX.Element {
  const theme = useTheme();
  const styles = getStyles(theme);
  const dispatch = useAppDispatch();

  // Redux state
  const connections = useAppSelector(selectAgentConnections);
  const selectedAgentId = useAppSelector(selectSelectedAgentId);
  const loading = useAppSelector(selectAgentLoading);
  const error = useAppSelector(selectAgentError);
  const addDialogOpen = useAppSelector(selectAddAgentDialogOpen);
  const metricsLoading = useAppSelector(selectMetricsLoading);
  const metricsError = useAppSelector(selectMetricsError);

  // Local state
  const [formData, setFormData] = useState<AgentFormData>(initialFormData);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Load initial data
  useEffect(() => {
    void dispatch(refreshAgents());
  }, [dispatch]);

  const handleFormChange =
    (field: keyof AgentFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleTestConnection = async (): Promise<void> => {
    try {
      const agent: AgentConnection = {
        id: '',
        name: formData.name,
        host: formData.host,
        port: parseInt(formData.port, 10),
        connected: false,
      };

      const result = await testAgentConnection(agent);
      setTestResult(result);
    } catch (err) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Connection test failed',
      });
    }
  };

  const handleConnect = async (): Promise<void> => {
    const agent: AgentConnection = {
      id: '',
      name: formData.name,
      host: formData.host,
      port: parseInt(formData.port, 10),
      connected: false,
    };

    await dispatch(connectAgent(agent));
    dispatch(setAddAgentDialogOpen(false));
    setFormData(initialFormData);
    setTestResult(null);
  };

  const handleDisconnect = async (agentId: string, event?: MouseEvent): Promise<void> => {
    if (event) {
      event.stopPropagation();
    }
    await dispatch(disconnectAgent(agentId));
  };

  const handleAccordionChange = (agentId: string) => {
    const newSelectedId = selectedAgentId === agentId ? null : agentId;
    dispatch(setSelectedAgent(newSelectedId));
    if (newSelectedId) {
      void dispatch(fetchMetrics(newSelectedId));
    }
  };

  const handleRefresh = () => {
    void dispatch(refreshAgents());
  };

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.host.trim() !== '' &&
      !isNaN(parseInt(formData.port, 10))
    );
  };

  if (error !== null) {
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

  const renderMetrics = (agentId: string): JSX.Element | null => {
    if (selectedAgentId !== agentId) return null;

    const metrics = useAppSelector(state => selectMetricsForAgent(agentId)(state));

    if (metricsLoading) return <Box sx={styles.loading}>Loading metrics...</Box>;
    if (metricsError) return <Box sx={styles.error}>Error loading metrics</Box>;
    if (!metrics) return null;

    const { cpu, memory, disk } = metrics;

    return (
      <Box sx={styles.metricsContainer}>
        <Box sx={styles.metricsSection}>
          <Typography variant="subtitle1">CPU</Typography>
          <Typography variant="body2">Usage: {formatPercentage(cpu.usage)}</Typography>
          <Typography variant="body2">Load Average: {cpu.loadAverage}</Typography>
        </Box>

        <Box sx={styles.metricsSection}>
          <Typography variant="subtitle1">Memory</Typography>
          <Typography variant="body2">Usage: {formatPercentage(memory.usage)}</Typography>
          <Typography variant="body2">Available: {formatBytes(memory.available)}</Typography>
          <Typography variant="body2">Total: {formatBytes(memory.total)}</Typography>
        </Box>

        <Box sx={styles.metricsSection}>
          <Typography variant="subtitle1">Disk</Typography>
          <Typography variant="body2">Usage: {formatPercentage(disk.usage)}</Typography>
          <Typography variant="body2">Available: {formatBytes(disk.available)}</Typography>
          <Typography variant="body2">Total: {formatBytes(disk.total)}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Paper sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h6">Agent Management</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => dispatch(setAddAgentDialogOpen(true))}
          >
            Add Agent
          </Button>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={styles.content}>
        {connections.map((agent: AgentConnection) => (
          <Accordion
            key={agent.id}
            expanded={selectedAgentId === agent.id}
            onChange={() => handleAccordionChange(agent.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={styles.agentHeader}>
                <Box sx={styles.agentInfo}>
                  <Typography>{agent.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {agent.host}:{agent.port}
                  </Typography>
                </Box>
                <Box sx={styles.agentStatus}>
                  <Chip
                    label={agent.connected === true ? 'Connected' : 'Disconnected'}
                    color={agent.connected === true ? 'success' : 'error'}
                    size="small"
                  />
                  <IconButton
                    onClick={e => void handleDisconnect(agent.id, e)}
                    disabled={agent.connected !== true}
                  >
                    <DisconnectIcon />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>{renderMetrics(agent.id)}</AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Dialog
        open={addDialogOpen}
        onClose={() => {
          dispatch(setAddAgentDialogOpen(false));
          setFormData(initialFormData);
          setTestResult(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Agent Connection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Agent Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleFormChange('name')}
          />
          <TextField
            margin="dense"
            label="Host"
            fullWidth
            variant="outlined"
            value={formData.host}
            onChange={handleFormChange('host')}
          />
          <TextField
            margin="dense"
            label="Port"
            fullWidth
            variant="outlined"
            value={formData.port}
            onChange={handleFormChange('port')}
            type="number"
          />
          <TextField
            margin="dense"
            label="API Key (optional)"
            fullWidth
            variant="outlined"
            value={formData.apiKey}
            onChange={handleFormChange('apiKey')}
          />
          <TextField
            margin="dense"
            label="SSH Key (optional)"
            fullWidth
            variant="outlined"
            value={formData.sshKey}
            onChange={handleFormChange('sshKey')}
            multiline
            rows={4}
          />
          {testResult !== null && (
            <Alert severity={testResult.success ? 'success' : 'error'} sx={{ mt: 2 }}>
              {testResult.message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<TestIcon />}
            onClick={() => void handleTestConnection()}
            disabled={!isFormValid()}
          >
            Test Connection
          </Button>
          <Button onClick={() => dispatch(setAddAgentDialogOpen(false))}>Cancel</Button>
          <Button
            onClick={() => void handleConnect()}
            variant="contained"
            disabled={!isFormValid()}
          >
            Add Agent
          </Button>
        </DialogActions>
      </Dialog>

      {loading === true && (
        <Fade in>
          <Box sx={styles.loadingOverlay}>
            <CircularProgress />
          </Box>
        </Fade>
      )}
    </Paper>
  );
}
