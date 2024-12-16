import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Fade,
  Chip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Link as ConnectIcon,
  LinkOff as DisconnectIcon,
  Speed as TestIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAgentConnections } from '@/client/hooks/useAgentConnections';
import { Agent } from '@/client/types/agent.types';
import { AgentFormData } from './types';
import { getStyles } from './styles';

const initialFormData: AgentFormData = {
  name: '',
  host: '',
  port: '22',
  apiKey: '',
  sshKey: '',
};

export function AgentConnectionManager() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<AgentFormData>(initialFormData);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    connections,
    loading,
    error,
    connectAgent,
    disconnectAgent,
    testConnection,
    refreshConnections,
  } = useAgentConnections();

  const handleFormChange = (field: keyof AgentFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleTestConnection = async () => {
    try {
      const agent: Agent = {
        name: formData.name,
        host: formData.host,
        port: parseInt(formData.port, 10),
        apiKey: formData.apiKey,
        sshKey: formData.sshKey,
      };

      const result = await testConnection(agent);
      setTestResult({ success: true, message: 'Connection test successful' });
    } catch (err) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Connection test failed',
      });
    }
  };

  const handleConnect = async () => {
    try {
      const agent: Agent = {
        name: formData.name,
        host: formData.host,
        port: parseInt(formData.port, 10),
        apiKey: formData.apiKey,
        sshKey: formData.sshKey,
      };

      await connectAgent(agent);
      setAddDialogOpen(false);
      setFormData(initialFormData);
      setTestResult(null);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDisconnect = async (agentId: string) => {
    try {
      await disconnectAgent(agentId);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.host.trim() !== '' &&
      !isNaN(parseInt(formData.port, 10))
    );
  };

  if (error) {
    return (
      <Alert
        severity="error"
        sx={styles.errorAlert}
        action={
          <IconButton color="inherit" size="small" onClick={() => void refreshConnections()}>
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
        <Typography variant="h6">Agent Connections</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add Agent
          </Button>
          <Tooltip title="Refresh">
            <IconButton onClick={() => void refreshConnections()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Connected</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {connections.map((connection) => (
              <TableRow key={connection.id}>
                <TableCell>{connection.name}</TableCell>
                <TableCell>{connection.host}</TableCell>
                <TableCell>{connection.port}</TableCell>
                <TableCell>
                  <Chip
                    label={connection.status}
                    color={connection.status === 'connected' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {connection.lastConnected
                    ? new Date(connection.lastConnected).toLocaleString()
                    : 'Never'}
                </TableCell>
                <TableCell align="right">
                  <Tooltip
                    title={
                      connection.status === 'connected' ? 'Disconnect' : 'Connect'
                    }
                  >
                    <IconButton
                      onClick={() =>
                        connection.status === 'connected'
                          ? void handleDisconnect(connection.id)
                          : void handleConnect()
                      }
                    >
                      {connection.status === 'connected' ? (
                        <DisconnectIcon />
                      ) : (
                        <ConnectIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Agent Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
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
          {testResult && (
            <Alert
              severity={testResult.success ? 'success' : 'error'}
              sx={{ mt: 2 }}
            >
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
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handleConnect()}
            variant="contained"
            disabled={!isFormValid()}
          >
            Add Agent
          </Button>
        </DialogActions>
      </Dialog>

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
