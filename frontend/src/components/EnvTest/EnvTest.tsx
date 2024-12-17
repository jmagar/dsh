import { Box, Typography } from '@mui/material';
import type { FC } from 'react';

import type { EnvTestProps } from './types';

const preStyle = {
  whiteSpace: 'pre-wrap' as const,
  wordBreak: 'break-word' as const,
  backgroundColor: '#f5f5f5',
  padding: 16,
  borderRadius: 4,
} as const;

const EnvTest: FC<EnvTestProps> = ({ envVars }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Environment Variables
      </Typography>
      <pre style={preStyle}>
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </Box>
  );
};

export default EnvTest;
