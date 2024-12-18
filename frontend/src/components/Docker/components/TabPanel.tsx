import { Box } from '@mui/material';

import { TabPanelProps } from '../types';

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`docker-tabpanel-${index}`}
      aria-labelledby={`docker-tab-${index}`}
      {...other}
      sx={{
        height: 'calc(100% - 49px)',
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      {value === index && (
        <Box sx={{ height: '100%', p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}
