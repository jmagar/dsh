import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';

interface DialogState {
  addAgent: boolean;
}

export interface UiState {
  dialogs: DialogState;
}

const initialState: UiState = {
  dialogs: {
    addAgent: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAddAgentDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.dialogs.addAgent = action.payload;
    },
  },
});

// Selectors
export const selectUiState = (state: RootState) => state.ui;

export const selectDialogs = (state: RootState) => selectUiState(state).dialogs;

export const selectAddAgentDialogOpen = (state: RootState) => selectDialogs(state).addAgent;

export const { setAddAgentDialogOpen } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
export default uiSlice.reducer; 