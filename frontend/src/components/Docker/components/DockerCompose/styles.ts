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
    bgcolor: alpha(theme.palette.primary.main, 0.04),
    borderRadius: 1,
    mb: 2,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  title: {
    flexGrow: 1,
  },
  statusChip: {
    fontWeight: 'medium',
  },
  editor: {
    flexGrow: 1,
    '& .monaco-editor': {
      borderRadius: 1,
      overflow: 'hidden',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    mt: 2,
  },
  errorAlert: {
    borderRadius: 1,
    mb: 2,
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
