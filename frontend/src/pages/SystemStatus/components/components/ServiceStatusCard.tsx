import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';

import { ServiceStatusCardProps } from '../types';
import { styles } from '../styles';
import { getErrorMessage } from '../utils';

export const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ name, isHealthy, error }) => {
  const errorMessage = getErrorMessage(error);
  const hasError = errorMessage !== null && errorMessage !== '';

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          {isHealthy ? (
            <CheckCircleIcon color="success" />
          ) : (
            <ErrorIcon color="error" />
          )}
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Stack>
        {hasError && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
