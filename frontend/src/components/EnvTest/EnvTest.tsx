import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import { EnvTestProps, EnvVars } from './types';

export const EnvTest: React.FC<EnvTestProps> = ({ className, style }) => {
  const envVars: EnvVars = {
    API_URL: process.env.REACT_APP_API_URL,
    FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
    NODE_ENV: process.env.REACT_APP_NODE_ENV,
    CORS_ORIGIN: process.env.REACT_APP_CORS_ORIGIN,
    WS_URL: process.env.REACT_APP_WS_URL,
  };

  return (
    <Box sx={styles.container} className={className} style={style}>
      <Typography variant="h4" gutterBottom>
        Environment Variables Test
      </Typography>
      <pre style={styles.pre}>{JSON.stringify(envVars, null, 2)}</pre>
    </Box>
  );
};
