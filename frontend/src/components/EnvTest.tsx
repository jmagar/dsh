import { Box, Typography } from '@mui/material';
import React from 'react';

export const EnvTest: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Environment Variables Test</Typography>
      <pre>
        {JSON.stringify(
          {
            API_URL: process.env.REACT_APP_API_URL,
            FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
            NODE_ENV: process.env.REACT_APP_NODE_ENV,
            CORS_ORIGIN: process.env.REACT_APP_CORS_ORIGIN,
            WS_URL: process.env.REACT_APP_WS_URL,
          },
          null,
          2
        )}
      </pre>
    </Box>
  );
};
