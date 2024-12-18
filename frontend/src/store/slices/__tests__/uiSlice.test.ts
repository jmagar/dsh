import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';

import type { RootState } from '../../types';
import { uiReducer, setAddAgentDialogOpen } from '../uiSlice';

describe('uiSlice', () => {
  let store: ReturnType<typeof configureStore> & {
    dispatch: ThunkDispatch<RootState, unknown, Action>;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ui: uiReducer,
      },
    }) as typeof store;
  });

  describe('reducers', () => {
    it('should handle setAddAgentDialogOpen', () => {
      // Initial state should be false
      const initialState = store.getState() as RootState;
      expect(initialState.ui.dialogs.addAgent).toBe(false);

      // Open dialog
      store.dispatch(setAddAgentDialogOpen(true));
      const openState = store.getState() as RootState;
      expect(openState.ui.dialogs.addAgent).toBe(true);

      // Close dialog
      store.dispatch(setAddAgentDialogOpen(false));
      const closedState = store.getState() as RootState;
      expect(closedState.ui.dialogs.addAgent).toBe(false);
    });
  });
}); 