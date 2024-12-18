import { configureStore } from '@reduxjs/toolkit';

import {
  agentReducer,
  metricsReducer,
  uiReducer,
  dockerReducer,
  chatReducer,
} from './slices';
import type { RootState } from './types';

export const store = configureStore({
  reducer: {
    agents: agentReducer,
    metrics: metricsReducer,
    ui: uiReducer,
    docker: dockerReducer,
    chat: chatReducer,
  },
});

export type { RootState };
export type AppDispatch = typeof store.dispatch; 