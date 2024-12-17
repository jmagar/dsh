import { Card, CardContent, Stack, Typography, type SxProps, type Theme } from '@mui/material';
import React, { type ReactNode } from 'react';

export interface StatusCardProps {
  icon?: ReactNode;
  title: string;
  content?: ReactNode;
  sx?: SxProps<Theme>;
}

const styles = {
  card: {
    minWidth: 275,
    height: '100%',
  },
  cardHeader: {
    marginBottom: 1,
  },
} as const;

export const StatusCard: React.FC<StatusCardProps> = ({ icon, title, content, sx }) => {
  return (
    <Card sx={{ ...styles.card, ...sx }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={styles.cardHeader}>
          {icon}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Stack>
        {content}
      </CardContent>
    </Card>
  );
}; 