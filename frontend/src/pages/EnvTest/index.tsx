import React from 'react';
import { Box } from '@mui/material';
import { EnvTest as EnvTestComponent } from '../../components/EnvTest';

const EnvTestPage: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <EnvTestComponent />
    </Box>
  );
};

export default EnvTestPage;
