import { Theme } from '@mui/material';
import { SxProps } from '@mui/material/styles';

interface StylesType {
  root: SxProps<Theme>;
  header: SxProps<Theme>;
  content: SxProps<Theme>;
  agentHeader: SxProps<Theme>;
  agentInfo: SxProps<Theme>;
  agentStatus: SxProps<Theme>;
  metricsContainer: SxProps<Theme>;
  metricsSection: SxProps<Theme>;
  errorAlert: SxProps<Theme>;
  loading: SxProps<Theme>;
  error: SxProps<Theme>;
  loadingOverlay: SxProps<Theme>;
}

export const getStyles = (theme: Theme): StylesType => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    p: 2,
  },
  agentHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  agentStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  metricsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 2,
    mt: 1,
  },
  metricsSection: {
    p: 2,
    backgroundColor: theme.palette.background.default,
    borderRadius: 1,
    '& > *:not(:last-child)': {
      mb: 1,
    },
  },
  errorAlert: {
    borderRadius: 1,
    m: 2,
  },
  loading: {
    color: theme.palette.text.secondary,
    p: 2,
  },
  error: {
    color: theme.palette.error.main,
    p: 2,
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
