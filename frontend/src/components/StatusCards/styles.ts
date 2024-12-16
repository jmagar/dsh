import { Theme } from '@mui/material';

export const styles = {
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
};
