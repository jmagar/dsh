import { Theme } from '@mui/material';

export const styles = {
  container: {
    padding: (theme: Theme) => theme.spacing(2),
    '& h2': {
      marginBottom: (theme: Theme) => theme.spacing(2),
    },
    '& h3': {
      marginTop: (theme: Theme) => theme.spacing(2),
      marginBottom: (theme: Theme) => theme.spacing(1),
    },
  },
  metricsSection: {
    marginBottom: (theme: Theme) => theme.spacing(3),
  },
  error: {
    color: (theme: Theme) => theme.palette.error.main,
  },
  loading: {
    color: (theme: Theme) => theme.palette.text.secondary,
  },
};
