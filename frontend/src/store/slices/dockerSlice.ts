// External dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Internal dependencies
import type { DockerState, DockerContainer } from '../types';
import { dockerClient } from '../../services/docker.client';

const initialState: DockerState = {
  containers: {},
  selectedContainerId: null,
  loading: false,
  error: null,
};

export const fetchContainers = createAsyncThunk<
  DockerContainer[],
  void,
  { rejectValue: string }
>('docker/fetchContainers', async (_, { rejectWithValue }) => {
  try {
    const response = await dockerClient.getContainers();
    return response.data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch containers');
  }
});

export const startContainer = createAsyncThunk<
  DockerContainer,
  string,
  { rejectValue: string }
>('docker/startContainer', async (containerId, { rejectWithValue }) => {
  try {
    const response = await dockerClient.startContainer(containerId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to start container');
  }
});

export const stopContainer = createAsyncThunk<
  DockerContainer,
  string,
  { rejectValue: string }
>('docker/stopContainer', async (containerId, { rejectWithValue }) => {
  try {
    const response = await dockerClient.stopContainer(containerId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to stop container');
  }
});

const dockerSlice = createSlice({
  name: 'docker',
  initialState,
  reducers: {
    setSelectedContainer: (state, action: PayloadAction<string | null>) => {
      state.selectedContainerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainers.fulfilled, (state, action) => {
        state.loading = false;
        state.containers = action.payload.reduce<Record<string, DockerContainer>>((acc, container) => {
          acc[container.id] = container;
          return acc;
        }, {});
      })
      .addCase(fetchContainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch containers';
      })
      .addCase(startContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.containers[action.payload.id] = action.payload;
      })
      .addCase(startContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to start container';
      })
      .addCase(stopContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stopContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.containers[action.payload.id] = action.payload;
      })
      .addCase(stopContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to stop container';
      });
  },
});

export const { setSelectedContainer } = dockerSlice.actions;
export default dockerSlice.reducer;

// Selectors
export const selectContainers = (state: { docker: DockerState }): DockerContainer[] => 
  Object.values(state.docker.containers);

export const selectSelectedContainer = (state: { docker: DockerState }): DockerContainer | null => 
  state.docker.selectedContainerId ? state.docker.containers[state.docker.selectedContainerId] : null;

export const selectDockerLoading = (state: { docker: DockerState }): boolean => 
  state.docker.loading;

export const selectDockerError = (state: { docker: DockerState }): string | null => 
  state.docker.error;
 