import {
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  CloudDownload as PullIcon,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { getStyles } from './styles';

import { useDockerImages } from '@/client/hooks/useDockerImages';


interface DockerImagesProps {
  hostIds: string[];
}

export function DockerImages({ hostIds }: DockerImagesProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [pullDialogOpen, setPullDialogOpen] = useState(false);
  const [imageNameToPull, setImageNameToPull] = useState('');
  const [selectedHostId, setSelectedHostId] = useState<string>('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{ hostId: string; imageId: string } | null>(null);

  const {
    images,
    loading,
    error,
    fetchImages,
    pullImage,
    removeImage,
  } = useDockerImages({ hostIds });

  useEffect(() => {
    void fetchImages();
  }, [fetchImages]);

  const handlePullImage = async () => {
    if (!selectedHostId || !imageNameToPull) return;
    await pullImage(selectedHostId, imageNameToPull);
    setPullDialogOpen(false);
    setImageNameToPull('');
    setSelectedHostId('');
  };

  const handleDeleteImage = async () => {
    if (!imageToDelete) return;
    await removeImage(imageToDelete.hostId, imageToDelete.imageId);
    setConfirmDeleteOpen(false);
    setImageToDelete(null);
  };

  const formatSize = (size: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = size;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    return `${value.toFixed(2)} ${units[unitIndex]}`;
  };

  if (error) {
    return (
      <Alert
        severity="error"
        sx={styles.errorAlert}
        action={
          <IconButton color="inherit" size="small" onClick={() => void fetchImages()}>
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
        <Typography variant="h6">Docker Images</Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<PullIcon />}
            onClick={() => setPullDialogOpen(true)}
          >
            Pull Image
          </Button>
          <Tooltip title="Refresh">
            <IconButton onClick={() => void fetchImages()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Repository</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Image ID</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id}>
                <TableCell>{image.repository}</TableCell>
                <TableCell>{image.tag}</TableCell>
                <TableCell>{image.id.substring(0, 12)}</TableCell>
                <TableCell>{formatSize(image.size)}</TableCell>
                <TableCell>{new Date(image.created).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Image">
                    <IconButton
                      onClick={() => {
                        setImageToDelete({ hostId: image.hostId, imageId: image.id });
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

      {/* Pull Image Dialog */}
      <Dialog open={pullDialogOpen} onClose={() => setPullDialogOpen(false)}>
        <DialogTitle>Pull Docker Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image Name"
            fullWidth
            variant="outlined"
            value={imageNameToPull}
            onChange={(e) => setImageNameToPull(e.target.value)}
            placeholder="e.g., nginx:latest"
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
          <Button onClick={() => setPullDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handlePullImage()}
            variant="contained"
            disabled={!imageNameToPull || !selectedHostId}
          >
            Pull
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this image? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handleDeleteImage()}
            color="error"
            variant="contained"
          >
            Delete
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
