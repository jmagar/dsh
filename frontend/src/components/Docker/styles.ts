import { Theme, alpha } from '@mui/material';

export const getStyles = (theme: Theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    p: 2,
    mb: 2,
    bgcolor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.8)
      : theme.palette.background.paper,
    backdropFilter: 'blur(8px)',
  },
  title: {
    fontWeight: 600,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
      : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  iconButton: {
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.main, 0.1),
    },
  },
  statCard: {
    p: 2,
    flex: 1,
    bgcolor: alpha(theme.palette.primary.main, 0.05),
    borderRadius: 2,
  },
  progressBar: {
    mt: 1,
    height: 6,
    borderRadius: 3,
    bgcolor: alpha(theme.palette.primary.main, 0.1),
    '& .MuiLinearProgress-bar': {
      borderRadius: 3,
    },
  },
  tabs: {
    '& .MuiTab-root': {
      minHeight: 48,
      textTransform: 'none',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.palette.text.secondary,
      '&.Mui-selected': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiTabs-indicator': {
      height: 3,
      borderRadius: '3px 3px 0 0',
    },
  },
  tabIcon: {
    '& .MuiTab-iconWrapper': {
      marginBottom: 0.5,
    },
  },
  badge: {
    '& .MuiBadge-badge': {
      right: -3,
      top: 3,
    },
  },
  content: {
    flexGrow: 1,
    bgcolor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.8)
      : theme.palette.background.paper,
    backdropFilter: 'blur(8px)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  menu: {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
});
