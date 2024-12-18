import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { DockerVolumes } from '../DockerVolumes';

import { useDockerVolumes } from '@/client/hooks/useDockerVolumes';

jest.mock('@/client/hooks/useDockerVolumes');

const mockVolumes = [
  {
    name: 'test-volume-1',
    driver: 'local',
    mountpoint: '/var/lib/docker/volumes/test-volume-1/_data',
    labels: { env: 'dev', app: 'test' },
    hostId: 'host1',
  },
  {
    name: 'test-volume-2',
    driver: 'local',
    mountpoint: '/var/lib/docker/volumes/test-volume-2/_data',
    labels: {},
    hostId: 'host1',
  },
];

const mockUseDockerVolumes = useDockerVolumes as jest.MockedFunction<typeof useDockerVolumes>;

describe('DockerVolumes', () => {
  const theme = createTheme();

  beforeEach(() => {
    mockUseDockerVolumes.mockReturnValue({
      volumes: mockVolumes,
      loading: false,
      error: null,
      fetchVolumes: jest.fn(),
      createVolume: jest.fn(),
      removeVolume: jest.fn(),
      pruneVolumes: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );
    expect(screen.getByText('Docker Volumes')).toBeInTheDocument();
  });

  it('displays volume list correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('test-volume-1')).toBeInTheDocument();
    expect(screen.getByText('test-volume-2')).toBeInTheDocument();
    expect(screen.getByText('env=dev')).toBeInTheDocument();
    expect(screen.getByText('app=test')).toBeInTheDocument();
  });

  it('handles create volume dialog', async () => {
    const mockCreateVolume = jest.fn();
    mockUseDockerVolumes.mockReturnValue({
      volumes: mockVolumes,
      loading: false,
      error: null,
      fetchVolumes: jest.fn(),
      createVolume: mockCreateVolume,
      removeVolume: jest.fn(),
      pruneVolumes: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );

    // Open create dialog
    fireEvent.click(screen.getByText('Create Volume'));
    expect(screen.getByText('Create Docker Volume')).toBeInTheDocument();

    // Fill form
    fireEvent.change(screen.getByLabelText('Volume Name'), {
      target: { value: 'new-volume' },
    });
    fireEvent.change(screen.getByLabelText('Driver'), {
      target: { value: 'local' },
    });
    fireEvent.change(screen.getByLabelText('Labels (key=value,key2=value2)'), {
      target: { value: 'env=prod,app=test' },
    });
    fireEvent.change(screen.getByLabelText('Host'), {
      target: { value: 'host1' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockCreateVolume).toHaveBeenCalledWith('host1', {
        name: 'new-volume',
        driver: 'local',
        labels: { env: 'prod', app: 'test' },
      });
    });
  });

  it('handles delete volume confirmation', async () => {
    const mockRemoveVolume = jest.fn();
    mockUseDockerVolumes.mockReturnValue({
      volumes: mockVolumes,
      loading: false,
      error: null,
      fetchVolumes: jest.fn(),
      createVolume: jest.fn(),
      removeVolume: mockRemoveVolume,
      pruneVolumes: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );

    // Click delete button
    const deleteButtons = screen.getAllByTitle('Delete Volume');
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockRemoveVolume).toHaveBeenCalledWith('host1', 'test-volume-1');
    });
  });

  it('handles prune volumes confirmation', async () => {
    const mockPruneVolumes = jest.fn();
    mockUseDockerVolumes.mockReturnValue({
      volumes: mockVolumes,
      loading: false,
      error: null,
      fetchVolumes: jest.fn(),
      createVolume: jest.fn(),
      removeVolume: jest.fn(),
      pruneVolumes: mockPruneVolumes,
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );

    // Click prune button
    fireEvent.click(screen.getByText('Prune Volumes'));

    // Confirm prune
    fireEvent.click(screen.getByText('Prune'));

    await waitFor(() => {
      expect(mockPruneVolumes).toHaveBeenCalledWith('host1');
    });
  });

  it('handles error state', () => {
    mockUseDockerVolumes.mockReturnValue({
      volumes: [],
      loading: false,
      error: 'Failed to fetch volumes',
      fetchVolumes: jest.fn(),
      createVolume: jest.fn(),
      removeVolume: jest.fn(),
      pruneVolumes: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('Failed to fetch volumes')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseDockerVolumes.mockReturnValue({
      volumes: [],
      loading: true,
      error: null,
      fetchVolumes: jest.fn(),
      createVolume: jest.fn(),
      removeVolume: jest.fn(),
      pruneVolumes: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerVolumes hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
