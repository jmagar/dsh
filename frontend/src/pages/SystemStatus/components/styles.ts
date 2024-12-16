import { Theme } from '@mui/material';

export const styles = {
  container: {
    width: '100%',
  },
  title: {
    marginBottom: (theme: Theme) => theme.spacing(2),
  },
  card: {
    marginBottom: (theme: Theme) => theme.spacing(2),
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: (theme: Theme) => theme.shadows[4],
    },
  },
  cardHeader: {
    marginBottom: (theme: Theme) => theme.spacing(1),
  },
  grid: {
    marginBottom: (theme: Theme) => theme.spacing(4),
  },
  agentsTitle: {
    marginTop: (theme: Theme) => theme.spacing(4),
    marginBottom: (theme: Theme) => theme.spacing(2),
  },
  noAgents: {
    color: (theme: Theme) => theme.palette.text.secondary,
  },
  errorAlert: {
    marginBottom: (theme: Theme) => theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
};
