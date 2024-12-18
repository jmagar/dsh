import {
  ViewList as ContainersIcon,
  Storage as ComposeIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  RestartAlt as RestartIcon,
  MoreVert as MoreVertIcon,
  Memory as MemoryIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  NetworkCheck as NetworkIcon,
  Article as LogsIcon,
} from '@mui/icons-material';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import React, { useState } from 'react';

import DockerCompose from '../DockerCompose';
import { DockerContainers } from '../DockerContainers';
import { LogViewer } from '../LogViewer';

import { TabPanel } from './components/TabPanel';
import { getStyles } from './styles';
import { DockerManagerProps } from './types';

import { useDockerManager } from '@/client/hooks/useDockerManager';

export function DockerManager({ hostId, userId }: DockerManagerProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  const {
    containers,
    loading,
    error,
    refreshing,
    handleRefresh,
    formatPercentage,
    clampValue,
    getStatsValue,
  } = useDockerManager({ hostId });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={styles.root}>
      {/* Header */}
      <Paper elevation={0} sx={styles.header}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5" sx={styles.title}>
            Docker Management
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Refresh">
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={styles.iconButton}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              onClick={handleMenuOpen}
              sx={styles.iconButton}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Stats Overview */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={styles.statCard}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <MemoryIcon color="primary" />
              <Typography variant="subtitle2" color="primary">Memory Usage</Typography>
            </Box>
            <Typography variant="h6">
              {formatPercentage(getStatsValue('memoryUsage'))}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={clampValue(getStatsValue('memoryUsage'))}
              sx={styles.progressBar}
            />
          </Paper>

          <Paper elevation={0} sx={styles.statCard}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SpeedIcon color="primary" />
              <Typography variant="subtitle2" color="primary">CPU Usage</Typography>
            </Box>
            <Typography variant="h6">
              {formatPercentage(getStatsValue('cpuUsage'))}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={clampValue(getStatsValue('cpuUsage'))}
              sx={styles.progressBar}
            />
          </Paper>

          <Paper elevation={0} sx={styles.statCard}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <StorageIcon color="primary" />
              <Typography variant="subtitle2" color="primary">Storage</Typography>
            </Box>
            <Typography variant="h6">
              {formatPercentage(getStatsValue('diskUsage'))}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={clampValue(getStatsValue('diskUsage'))}
              sx={styles.progressBar}
            />
          </Paper>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="docker management tabs"
          sx={styles.tabs}
        >
          <Tab
            icon={
              <Badge
                badgeContent={getStatsValue('containers')}
                color="primary"
                sx={styles.badge}
              >
                <ContainersIcon />
              </Badge>
            }
            label="Containers"
            sx={styles.tabIcon}
          />
          <Tab
            icon={<ComposeIcon />}
            label="Compose"
            sx={styles.tabIcon}
          />
          <Tab
            icon={<LogsIcon />}
            label="Logs"
            sx={styles.tabIcon}
          />
        </Tabs>
      </Paper>

      {/* Content */}
      <Paper elevation={0} sx={styles.content}>
        <TabPanel value={activeTab} index={0}>
          <DockerContainers
            containers={containers}
            hostId={hostId}
            onRefresh={handleRefresh}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DockerCompose hostId={hostId} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <LogViewer hostIds={[hostId]} userId={userId} />
        </TabPanel>
      </Paper>

      {/* Settings Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: styles.menu,
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <RestartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restart Docker</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
