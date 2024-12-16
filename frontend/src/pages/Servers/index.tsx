import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Servers: React.FC = () => {
  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Servers
        </Typography>
        <Typography>
          Server list functionality coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default Servers;
