import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { UIState } from '../types';
import type { RootState } from '../store';

const initialState: UIState = {
  dialogs: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<string>) => {
      state.dialogs[action.payload] = true;
    },
    closeDialog: (state, action: PayloadAction<string>) => {
      state.dialogs[action.payload] = false;
    },
    toggleDialog: (state, action: PayloadAction<string>) => {
      state.dialogs[action.payload] = !state.dialogs[action.payload];
    },
    closeAllDialogs: (state) => {
      Object.keys(state.dialogs).forEach(key => {
        state.dialogs[key] = false;
      });
    },
  },
});

export const { openDialog, closeDialog, toggleDialog, closeAllDialogs } = uiSlice.actions;
export default uiSlice.reducer;

// Selectors
export const selectDialogState = (dialogId: string) => 
  (state: RootState): boolean => state.ui.dialogs[dialogId] ?? false;

export const selectAllDialogStates = (state: RootState): Record<string, boolean> => 
  state.ui.dialogs; 