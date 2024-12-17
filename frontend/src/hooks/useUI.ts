import { useState, useEffect, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

interface UseUIResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function useUI(): UseUIResult {
  const theme = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  useEffect(() => {
    setIsDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDarkMode,
    toggleDarkMode
  };
} 