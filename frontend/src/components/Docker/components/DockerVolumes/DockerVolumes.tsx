import {
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CleaningServices as PruneIcon,
} from '@mui/icons-material';
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
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { getStyles } from './styles';

import { useDockerVolumes } from '@/client/hooks/useDockerVolumes';


interface DockerVolumesProps {
  hostIds: string[];
}

interface CreateVolumeFormData {
  name: string;
  driver: string;
  labels: string;
}

export function DockerVolumes({ hostIds }: DockerVolumesProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedHostId, setSelectedHostId] = useState<string>('');
  const [formData, setFormData] = useState<CreateVolumeFormData>({
    name: '',
    driver: 'local',
    labels: '',
  });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [volumeToDelete, setVolumeToDelete] = useState<{ hostId: string; name: string } | null>(null);
  const [confirmPruneOpen, setConfirmPruneOpen] = useState(false);
  const [pruneHostId, setPruneHostId] = useState<string>('');

  const {
    volumes,
    loading,
    error,
    fetchVolumes,
    createVolume,
    removeVolume,
    pruneVolumes,
  } = useDockerVolumes({ hostIds });

  useEffect(() => {
    void fetchVolumes();
  }, [fetchVolumes]);

  const handleCreateVolume = async () => {
    if (!selectedHostId || !formData.name) return;

    try {
      const labels = formData.labels
        ? Object.fromEntries(
            formData.labels.split(',').map((label) => {
              const [key, value] = label.split('=').map((s) => s.trim());
              return [key, value];
            })
          )
        : {};

      await createVolume(selectedHostId, {
        name: formData.name,
        driver: formData.driver,
        labels,
      });

      setCreateDialogOpen(false);
      setFormData({ name: '', driver: 'local', labels: '' });
      setSelectedHostId('');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDeleteVolume = async () => {
    if (!volumeToDelete) return;
    try {
      await removeVolume(volumeToDelete.hostId, volumeToDelete.name);
      setConfirmDeleteOpen(false);
      setVolumeToDelete(null);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handlePruneVolumes = async () => {
    if (!pruneHostId) return;
    try {
      await pruneVolumes(pruneHostId);
      setConfirmPruneOpen(false);
      setPruneHostId('');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (error) {
    return (
      <Alert
        severity="error"
        sx={styles.errorAlert}
        action={
          <IconButton color="inherit" size="small" onClick={() => void fetchVolumes()}>
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
        <Typography variant="h6">Docker Volumes</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Create Volume
          </Button>
          <Button
            variant="outlined"
            startIcon={<PruneIcon />}
            onClick={() => {
              setPruneHostId(hostIds[0]);
              setConfirmPruneOpen(true);
            }}
          >
            Prune Volumes
          </Button>
          <Tooltip title="Refresh">
            <IconButton onClick={() => void fetchVolumes()}>
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
              <TableCell>Driver</TableCell>
              <TableCell>Mountpoint</TableCell>
              <TableCell>Labels</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumes.map((volume) => (
              <TableRow key={`${volume.hostId}-${volume.name}`}>
                <TableCell>{volume.name}</TableCell>
                <TableCell>{volume.driver}</TableCell>
                <TableCell sx={styles.mountpoint}>{volume.mountpoint}</TableCell>
                <TableCell>
                  {Object.entries(volume.labels || {}).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key}=${value}`}
                      size="small"
                      sx={styles.label}
                    />
                  ))}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Volume">
                    <IconButton
                      onClick={() => {
                        setVolumeToDelete({ hostId: volume.hostId, name: volume.name });
                        setConfirmDeleteOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Volume Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create Docker Volume</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Volume Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Driver"
            fullWidth
            variant="outlined"
            value={formData.driver}
            onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Labels (key=value,key2=value2)"
            fullWidth
            variant="outlined"
            value={formData.labels}
            onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
            helperText="Comma-separated key=value pairs"
          />
          <TextField
            select
            margin="dense"
            label="Host"
            fullWidth
            variant="outlined"
            value={selectedHostId}
            onChange={(e) => setSelectedHostId(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="">Select a host</option>
            {hostIds.map((hostId) => (
              <option key={hostId} value={hostId}>
                {hostId}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handleCreateVolume()}
            variant="contained"
            disabled={!formData.name || !selectedHostId}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this volume? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handleDeleteVolume()}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Prune Dialog */}
      <Dialog open={confirmPruneOpen} onClose={() => setConfirmPruneOpen(false)}>
        <DialogTitle>Confirm Prune Volumes</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove all unused volumes? This action cannot be undone.
          </Typography>
          <TextField
            select
            margin="dense"
            label="Host"
            fullWidth
            variant="outlined"
            value={pruneHostId}
            onChange={(e) => setPruneHostId(e.target.value)}
            SelectProps={{ native: true }}
          >
            {hostIds.map((hostId) => (
              <option key={hostId} value={hostId}>
                {hostId}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmPruneOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handlePruneVolumes()}
            color="error"
            variant="contained"
          >
            Prune
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
