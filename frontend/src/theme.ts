import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // Add your theme customizations here
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    // Add custom theme properties here if needed
  }
  interface ThemeOptions {
    // Add custom theme options here if needed
  }
} 