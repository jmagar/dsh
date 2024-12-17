import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';

interface DockerContainer {
  id: string;
  name: string;
  status: string;
  image: string;
  ports: string[];
  created: string;
}

export interface DockerState {
  containers: DockerContainer[];
  selectedContainerId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DockerState = {
  containers: [],
  selectedContainerId: null,
  loading: false,
  error: null,
};

export const fetchContainers = createAsyncThunk(
  'docker/fetchContainers',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Implement API call
      return [] as DockerContainer[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch containers');
    }
  }
);

export const startContainer = createAsyncThunk(
  'docker/startContainer',
  async (containerId: string, { rejectWithValue }) => {
    try {
      // TODO: Implement API call
      return containerId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to start container');
    }
  }
);

export const stopContainer = createAsyncThunk(
  'docker/stopContainer',
  async (containerId: string, { rejectWithValue }) => {
    try {
      // TODO: Implement API call
      return containerId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to stop container');
    }
  }
);

const dockerSlice = createSlice({
  name: 'docker',
  initialState,
  reducers: {
    setSelectedContainer: (state, action: PayloadAction<string | null>) => {
      state.selectedContainerId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch containers
      .addCase(fetchContainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainers.fulfilled, (state, action) => {
        state.containers = action.payload;
        state.loading = false;
      })
      .addCase(fetchContainers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Start container
      .addCase(startContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startContainer.fulfilled, (state, action) => {
        const container = state.containers.find(c => c.id === action.payload);
        if (container) {
          container.status = 'running';
        }
        state.loading = false;
      })
      .addCase(startContainer.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Stop container
      .addCase(stopContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stopContainer.fulfilled, (state, action) => {
        const container = state.containers.find(c => c.id === action.payload);
        if (container) {
          container.status = 'stopped';
        }
        state.loading = false;
      })
      .addCase(stopContainer.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Selectors
export const selectDockerState = (state: RootState) => state.docker;

export const selectContainers = (state: RootState) => selectDockerState(state).containers;

export const selectSelectedContainerId = (state: RootState) => 
  selectDockerState(state).selectedContainerId;

export const selectDockerLoading = (state: RootState) => selectDockerState(state).loading;

export const selectDockerError = (state: RootState) => selectDockerState(state).error;

export const { setSelectedContainer, clearError } = dockerSlice.actions;
export const dockerReducer = dockerSlice.reducer; 