import type { ThunkAction, Action } from '@reduxjs/toolkit';

import { store } from '../store';

// Redux store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Thunk types
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Common state patterns
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface FilterState {
  search: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters: Record<string, unknown>;
} 