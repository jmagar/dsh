import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Typography } from '@mui/material';
import React from 'react';

import { StatusCard } from '../../common/Card';

import type { ServiceStatusCardProps } from './types';
import { getErrorMessage } from './utils';

export const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ name, isHealthy, error }) => {
  const errorMessage = getErrorMessage(error);

  const content = errorMessage ? (
    <Typography variant="body2" color="error">
      {errorMessage}
    </Typography>
  ) : null;

  return (
    <StatusCard
      icon={isHealthy ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
      title={name}
      content={content}
    />
  );
}; 