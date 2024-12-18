import { configureStore } from '@reduxjs/toolkit';

import agentReducer from './slices/agentSlice';
import chatReducer from './slices/chatSlice';
import dockerReducer from './slices/dockerSlice';
import metricsReducer from './slices/metricsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    agents: agentReducer,
    chat: chatReducer,
    docker: dockerReducer,
    metrics: metricsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 