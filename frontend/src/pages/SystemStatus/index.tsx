import React from 'react';
import { Box } from '@mui/material';
import { SystemStatus as SystemStatusComponent } from './components/SystemStatus';

const SystemStatus: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SystemStatusComponent />
    </Box>
  );
};

export default SystemStatus;
