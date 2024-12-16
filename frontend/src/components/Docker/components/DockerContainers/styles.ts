import { Theme, alpha } from '@mui/material';

export const getStyles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  searchBar: {
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  searchField: {
    flexGrow: 1,
  },
  tableContainer: {
    maxHeight: 'calc(100vh - 300px)',
    overflowY: 'auto',
  },
  runningRow: {
    backgroundColor: alpha(theme.palette.success.main, 0.1),
  },
  portChip: {
    mr: 0.5,
    mb: 0.5,
  },
  loadingOverlay: {
    position: 'fixed',
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
