import React, { useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Alert,
  Paper,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useTheme } from '@mui/material/styles';
import { useLogViewer } from '@/client/hooks/useLogViewer';
import { DockerLog } from '@/client/types/docker.types';
import { getStyles } from './styles';

interface LogViewerProps {
  hostIds: string[];
  maxLogs?: number;
}

interface LogRowProps {
  data: {
    logs: DockerLog[];
    getLevelIcon: (level: string) => JSX.Element;
    getLevelColor: (level: string) => string;
  };
  index: number;
  style: React.CSSProperties;
}

const ROW_HEIGHT = 60;

const LogRow = React.memo(({ data, index, style }: LogRowProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const log = data.logs[index];
  if (!log) return null;

  return (
    <Box sx={{ ...styles.logRow, ...style }}>
      <Typography sx={styles.timestamp}>
        {new Date(log.timestamp).toLocaleString()}
      </Typography>
      <Box sx={styles.level}>
        {data.getLevelIcon(log.level)}
        <Typography sx={{ color: data.getLevelColor(log.level) }}>
          {log.level}
        </Typography>
      </Box>
      <Typography sx={styles.source}>{log.source}</Typography>
      <Typography
        sx={{
          ...styles.message,
          ...(log.level === 'error' && styles.errorMessage),
          ...(log.level === 'warn' && styles.warnMessage),
          ...(log.level === 'info' && styles.infoMessage),
          ...(log.level === 'debug' && styles.debugMessage),
        }}
      >
        {log.message}
      </Typography>
    </Box>
  );
});

LogRow.displayName = 'LogRow';

export function LogViewer({ hostIds, maxLogs = 1000 }: LogViewerProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [showFilters, setShowFilters] = React.useState(false);
  const [autoScroll, setAutoScroll] = React.useState(true);
  const listRef = useRef<List | null>(null);

  const {
    logs,
    loading,
    error,
    subscribe,
    unsubscribe,
    clearLogs,
    filterLogs,
  } = useLogViewer({
    maxLogs,
    autoScroll,
  });

  useEffect(() => {
    if (hostIds.length > 0) {
      void subscribe(hostIds, { level: 'info' });
    }

    return () => {
      if (hostIds.length > 0) {
        unsubscribe(hostIds);
      }
    };
  }, [hostIds, subscribe, unsubscribe]);

  useEffect(() => {
    if (autoScroll && listRef.current && logs.length > 0) {
      listRef.current.scrollToItem(logs.length - 1);
    }
  }, [logs, autoScroll]);

  const handleLevelChange = useCallback((level: 'debug' | 'info' | 'warn' | 'error') => {
    filterLogs({ level });
  }, [filterLogs]);

  const handleAutoScrollChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoScroll(event.target.checked);
  }, []);

  const handleRefresh = useCallback(() => {
    void subscribe(hostIds, { level: 'info' });
  }, [hostIds, subscribe]);

  const getLevelIcon = useCallback((level: string): JSX.Element => {
    switch (level) {
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warn':
        return <WarningIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon color="action" />;
    }
  }, []);

  const getLevelColor = useCallback((level: string): string => {
    switch (level) {
      case 'error':
        return theme.palette.error.main;
      case 'warn':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.text.secondary;
    }
  }, [theme]);

  if (error) {
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

  return (
    <Paper sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h6">Logs</Typography>
        <Box display="flex" gap={1} alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={autoScroll}
                onChange={handleAutoScrollChange}
                size="small"
              />
            }
            label="Auto-scroll"
          />
          <Tooltip title="Toggle filters">
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? 'primary' : 'default'}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear logs">
            <IconButton onClick={clearLogs}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {showFilters && (
        <Box sx={styles.filters}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleLevelChange('info')}
                  color="info"
                />
              }
              label="Info"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleLevelChange('warn')}
                  color="warning"
                />
              }
              label="Warning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleLevelChange('error')}
                  color="error"
                />
              }
              label="Error"
            />
          </FormGroup>
        </Box>
      )}

      <Box sx={styles.logContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              itemCount={logs.length}
              itemSize={ROW_HEIGHT}
              itemData={{
                logs,
                getLevelIcon,
                getLevelColor,
              }}
            >
              {LogRow}
            </List>
          )}
        </AutoSizer>
      </Box>

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
