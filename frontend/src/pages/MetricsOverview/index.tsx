import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MetricsOverview: React.FC = () => {
  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Metrics Overview
        </Typography>
        <Typography>
          Metrics overview functionality coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default MetricsOverview;
