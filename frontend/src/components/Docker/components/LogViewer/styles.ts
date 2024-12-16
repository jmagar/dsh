import { Theme, alpha } from '@mui/material';

export const getStyles = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filters: {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  },
  logContainer: {
    flex: 1,
    overflow: 'hidden',
    bgcolor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.default, 0.5)
      : alpha(theme.palette.background.paper, 0.5),
  },
  logRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 1,
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    '&:hover': {
      bgcolor: alpha(theme.palette.action.hover, 0.1),
    },
  },
  timestamp: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    minWidth: 180,
  },
  level: {
    minWidth: 80,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  source: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    minWidth: 120,
  },
  message: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  errorMessage: {
    color: theme.palette.error.main,
  },
  warnMessage: {
    color: theme.palette.warning.main,
  },
  infoMessage: {
    color: theme.palette.info.main,
  },
  debugMessage: {
    color: theme.palette.text.secondary,
  },
  errorAlert: {
    borderRadius: 1,
    m: 2,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
});
