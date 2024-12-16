import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Fade,
  CircularProgress,
  Chip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Refresh as RestartIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { DockerContainer } from '@/client/types/docker.types';
import { useDockerContainers } from '@/client/hooks/useDockerContainers';
import { getStyles } from './styles';

interface DockerContainersProps {
  hostId: string;
  containers: DockerContainer[];
  onRefresh: () => Promise<void>;
}

export function DockerContainers({ hostId, containers, onRefresh }: DockerContainersProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const {
    filteredContainers,
    loading,
    searchTerm,
    selectedContainer,
    showDeleteDialog,
    handleSearchChange,
    handleClearSearch,
    handleContainerAction,
    handleConfirmDelete,
    setShowDeleteDialog,
  } = useDockerContainers({ hostId, containers, onRefresh });

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.searchBar}>
        <TextField
          size="small"
          placeholder="Search containers..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={styles.searchField}
        />

        <IconButton onClick={handleFilterClick}>
          <FilterIcon />
        </IconButton>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText primary="Running" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <StopIcon />
            </ListItemIcon>
            <ListItemText primary="Stopped" />
          </MenuItem>
        </Menu>
      </Box>

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Ports</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContainers.map((container) => (
              <TableRow
                key={container.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  ...(container.state === 'running' && styles.runningRow),
                }}
              >
                <TableCell component="th" scope="row">
                  {container.name}
                </TableCell>
                <TableCell>{container.image}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={container.status}
                    color={container.state === 'running' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  {new Date(container.created * 1000).toLocaleString()}
                </TableCell>
                <TableCell>
                  {container.ports.map((port) => (
                    <Chip
                      key={`${port.privatePort}-${port.publicPort}`}
                      size="small"
                      label={`${port.publicPort}:${port.privatePort}`}
                      sx={styles.portChip}
                    />
                  ))}
                </TableCell>
                <TableCell align="right">
                  {container.state !== 'running' ? (
                    <Tooltip title="Start">
                      <IconButton
                        size="small"
                        onClick={() => handleContainerAction(container, 'start')}
                        disabled={loading}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Stop">
                      <IconButton
                        size="small"
                        onClick={() => handleContainerAction(container, 'stop')}
                        disabled={loading}
                      >
                        <StopIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Restart">
                    <IconButton
                      size="small"
                      onClick={() => handleContainerAction(container, 'restart')}
                      disabled={loading}
                    >
                      <RestartIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Remove">
                    <IconButton
                      size="small"
                      onClick={() => handleContainerAction(container, 'remove')}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Settings">
                    <IconButton size="small" disabled={loading}>
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove container{' '}
            <strong>{selectedContainer?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
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
    </Box>
  );
}
