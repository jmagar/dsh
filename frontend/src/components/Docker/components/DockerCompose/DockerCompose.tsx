import Editor from '@monaco-editor/react';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  CircularProgress,
  Fade,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { getStyles } from './styles';
import type { DockerComposeConfig } from '../../types';

import { useDockerCompose } from '@/hooks/useDockerCompose';

interface DockerComposeProps {
  hostId: string;
}

export function DockerCompose({ hostId }: DockerComposeProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    composeContent,
    status: loading,
    handleComposeContentChange,
    validateCompose,
    applyCompose,
  } = useDockerCompose();

  const [editMode, setEditMode] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'up' | 'down' | 'remove'>('up');
  const [error, setError] = useState<string | null>(null);
  const [currentConfig, setCurrentConfig] = useState<DockerComposeConfig | null>(null);

  const handleEditModeChange = (mode: boolean) => {
    setEditMode(mode);
  };

  const handleContentChange = (value: string | undefined) => {
    if (value !== undefined) {
      handleComposeContentChange(value);
    }
  };

  const handleAction = async (action: 'up' | 'down' | 'remove') => {
    try {
      if (action === 'up') {
        const isValid = await validateCompose();
        if (!isValid) {
          setError('Invalid Docker Compose configuration');
          return;
        }
        await applyCompose();
      }
      // TODO: Implement down and remove actions
      setShowConfirmDialog(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSave = async () => {
    try {
      const isValid = await validateCompose();
      if (!isValid) {
        setError('Invalid Docker Compose configuration');
        return;
      }
      setEditMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return theme.palette.success.main;
      case 'stopped':
        return theme.palette.error.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.warning.main;
    }
  };

  const handleConfirmAction = () => {
    void handleAction(dialogAction);
  };

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.header}>
        <Box sx={styles.headerContent}>
          <Typography variant="h6" sx={styles.title}>
            Docker Compose
          </Typography>
          <Box display="flex" gap={1}>
            {currentConfig?.status && (
              <Chip
                label={currentConfig.status}
                size="small"
                sx={{
                  ...styles.statusChip,
                  bgcolor: alpha(getStatusColor(currentConfig.status), 0.1),
                  color: getStatusColor(currentConfig.status),
                }}
              />
            )}
            {editMode ? (
              <>
                <Tooltip title="Save changes">
                  <IconButton onClick={() => void handleSave()} size="small" color="primary">
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel editing">
                  <IconButton onClick={() => handleEditModeChange(false)} size="small">
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Edit compose file">
                <IconButton
                  onClick={() => handleEditModeChange(true)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={styles.errorAlert}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <Box sx={styles.editor}>
        <Editor
          height="100%"
          defaultLanguage="yaml"
          value={composeContent}
          onChange={(value) => handleContentChange(value || '')}
          options={{
            readOnly: !editMode,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            theme: theme.palette.mode === 'dark' ? 'vs-dark' : 'vs-light',
          }}
        />
      </Box>

      <Box sx={styles.toolbar}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrowIcon />}
          onClick={() => {
            setDialogAction('up');
            setShowConfirmDialog(true);
          }}
          disabled={loading || !composeContent}
        >
          Start
        </Button>
        <Button
          variant="outlined"
          startIcon={<StopIcon />}
          onClick={() => {
            setDialogAction('down');
            setShowConfirmDialog(true);
          }}
          disabled={loading || !currentConfig}
        >
          Stop
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => {
            setDialogAction('remove');
            setShowConfirmDialog(true);
          }}
          disabled={loading || !currentConfig}
        >
          Remove
        </Button>
      </Box>

      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>
          Confirm {dialogAction.charAt(0).toUpperCase() + dialogAction.slice(1)}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {dialogAction} the Docker Compose configuration?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            color={dialogAction === 'remove' ? 'error' : 'primary'}
          >
            Confirm
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
    </Box>
  );
}
