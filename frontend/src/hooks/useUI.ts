import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeAllDialogs,
  closeDialog,
  openDialog,
  selectAllDialogStates,
  selectDialogState,
  toggleDialog,
} from '../store/slices/uiSlice';
import type { RootState } from '../store/store';

import { createLogMetadata } from '../utils/logger';

const logger = console; // TODO: Replace with actual logger implementation

export const useUI = () => {
  const dispatch = useAppDispatch();
  const allDialogStates = useAppSelector(selectAllDialogStates);

  const handleOpenDialog = useCallback((dialogId: string) => {
    dispatch(openDialog(dialogId));
    logger.info('Dialog opened', createLogMetadata('ui-hook', undefined, {
      message: `Opened dialog: ${dialogId}`
    }));
  }, [dispatch]);

  const handleCloseDialog = useCallback((dialogId: string) => {
    dispatch(closeDialog(dialogId));
    logger.info('Dialog closed', createLogMetadata('ui-hook', undefined, {
      message: `Closed dialog: ${dialogId}`
    }));
  }, [dispatch]);

  const handleToggleDialog = useCallback((dialogId: string) => {
    dispatch(toggleDialog(dialogId));
    logger.info('Dialog toggled', createLogMetadata('ui-hook', undefined, {
      message: `Toggled dialog: ${dialogId}`
    }));
  }, [dispatch]);

  const handleCloseAllDialogs = useCallback(() => {
    dispatch(closeAllDialogs());
    logger.info('All dialogs closed', createLogMetadata('ui-hook', undefined, {
      message: 'Closed all dialogs'
    }));
  }, [dispatch]);

  const dialogStates = useAppSelector((state: RootState) => 
    Object.keys(allDialogStates).reduce((acc, dialogId) => ({
      ...acc,
      [dialogId]: selectDialogState(dialogId)(state)
    }), {} as Record<string, boolean>)
  );

  const isDialogOpen = useCallback((dialogId: string) => 
    dialogStates[dialogId] ?? false, [dialogStates]);

  return {
    allDialogStates,
    isDialogOpen,
    openDialog: handleOpenDialog,
    closeDialog: handleCloseDialog,
    toggleDialog: handleToggleDialog,
    closeAllDialogs: handleCloseAllDialogs,
  } as const;
}; 