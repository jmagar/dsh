import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';
import {
  dockerReducer,
  fetchContainers,
  startContainer,
  stopContainer,
  setSelectedContainer,
  clearError,
} from '../dockerSlice';
import type { RootState } from '../../types';

describe('dockerSlice', () => {
  let store: ReturnType<typeof configureStore> & {
    dispatch: ThunkDispatch<RootState, unknown, Action>;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        docker: dockerReducer,
      },
    }) as typeof store;
  });

  describe('reducers', () => {
    it('should handle setSelectedContainer', () => {
      const containerId = 'test-container-1';
      
      // Initial state should be null
      const initialState = store.getState() as RootState;
      expect(initialState.docker.selectedContainerId).toBeNull();

      // Set selected container
      store.dispatch(setSelectedContainer(containerId));
      const selectedState = store.getState() as RootState;
      expect(selectedState.docker.selectedContainerId).toBe(containerId);

      // Clear selected container
      store.dispatch(setSelectedContainer(null));
      const clearedState = store.getState() as RootState;
      expect(clearedState.docker.selectedContainerId).toBeNull();
    });

    it('should handle clearError', () => {
      // First set an error using a rejected action
      store.dispatch(fetchContainers.rejected(new Error('Test error'), 'fetchContainers'));
      const errorState = store.getState() as RootState;
      expect(errorState.docker.error).toBeTruthy();

      // Clear the error
      store.dispatch(clearError());
      const clearedState = store.getState() as RootState;
      expect(clearedState.docker.error).toBeNull();
    });
  });

  describe('async actions', () => {
    describe('fetchContainers', () => {
      it('should handle pending state', () => {
        store.dispatch(fetchContainers.pending('fetchContainers'));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(true);
        expect(state.docker.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        const mockContainers = [
          {
            id: 'container-1',
            name: 'test-container',
            status: 'running',
            image: 'test-image',
            ports: ['8080:80'],
            created: new Date().toISOString(),
          },
        ];

        store.dispatch(fetchContainers.fulfilled(mockContainers, 'fetchContainers'));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(false);
        expect(state.docker.error).toBeNull();
        expect(state.docker.containers).toEqual(mockContainers);
      });

      it('should handle rejected state', () => {
        const error = 'Failed to fetch containers';
        store.dispatch(fetchContainers.rejected(new Error(error), 'fetchContainers'));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(false);
        expect(state.docker.error).toBe(error);
      });
    });

    describe('startContainer', () => {
      const containerId = 'test-container-1';

      beforeEach(() => {
        // Set up initial state with a stopped container
        const mockContainers = [{
          id: containerId,
          name: 'test-container',
          status: 'stopped',
          image: 'test-image',
          ports: ['8080:80'],
          created: new Date().toISOString(),
        }];
        store.dispatch(fetchContainers.fulfilled(mockContainers, 'fetchContainers'));
      });

      it('should handle pending state', () => {
        store.dispatch(startContainer.pending('startContainer', containerId));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(true);
        expect(state.docker.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        store.dispatch(startContainer.fulfilled(containerId, 'startContainer', containerId));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(false);
        expect(state.docker.error).toBeNull();
        expect(state.docker.containers[0].status).toBe('running');
      });

      it('should handle rejected state', () => {
        const error = 'Failed to start container';
        store.dispatch(startContainer.rejected(new Error(error), 'startContainer', containerId));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(false);
        expect(state.docker.error).toBe(error);
      });
    });

    describe('stopContainer', () => {
      const containerId = 'test-container-1';

      beforeEach(() => {
        // Set up initial state with a running container
        const mockContainers = [{
          id: containerId,
          name: 'test-container',
          status: 'running',
          image: 'test-image',
          ports: ['8080:80'],
          created: new Date().toISOString(),
        }];
        store.dispatch(fetchContainers.fulfilled(mockContainers, 'fetchContainers'));
      });

      it('should handle pending state', () => {
        store.dispatch(stopContainer.pending('stopContainer', containerId));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(true);
        expect(state.docker.error).toBeNull();
      });

      it('should handle fulfilled state', () => {
        store.dispatch(stopContainer.fulfilled(containerId, 'stopContainer', containerId));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(false);
        expect(state.docker.error).toBeNull();
        expect(state.docker.containers[0].status).toBe('stopped');
      });

      it('should handle rejected state', () => {
        const error = 'Failed to stop container';
        store.dispatch(stopContainer.rejected(new Error(error), 'stopContainer', containerId));
        const state = store.getState() as RootState;
        expect(state.docker.loading).toBe(false);
        expect(state.docker.error).toBe(error);
      });
    });
  });
}); 