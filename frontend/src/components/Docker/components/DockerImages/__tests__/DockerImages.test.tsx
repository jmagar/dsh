import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { DockerImages } from '../DockerImages';

import { useDockerImages } from '@/client/hooks/useDockerImages';

jest.mock('@/client/hooks/useDockerImages');

const mockImages = [
  {
    id: 'sha256:123456789abc',
    repository: 'nginx',
    tag: 'latest',
    size: 1024 * 1024 * 50, // 50MB
    created: '2023-01-01T00:00:00Z',
    hostId: 'host1',
  },
  {
    id: 'sha256:987654321cba',
    repository: 'redis',
    tag: '6',
    size: 1024 * 1024 * 30, // 30MB
    created: '2023-01-02T00:00:00Z',
    hostId: 'host1',
  },
];

const mockUseDockerImages = useDockerImages as jest.MockedFunction<typeof useDockerImages>;

describe('DockerImages', () => {
  const theme = createTheme();

  beforeEach(() => {
    mockUseDockerImages.mockReturnValue({
      images: mockImages,
      loading: false,
      error: null,
      fetchImages: jest.fn(),
      pullImage: jest.fn(),
      removeImage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );
    expect(screen.getByText('Docker Images')).toBeInTheDocument();
  });

  it('displays image list correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('nginx')).toBeInTheDocument();
    expect(screen.getByText('latest')).toBeInTheDocument();
    expect(screen.getByText('123456789abc')).toBeInTheDocument();
    expect(screen.getByText('50.00 MB')).toBeInTheDocument();
  });

  it('handles pull image dialog', async () => {
    const mockPullImage = jest.fn();
    mockUseDockerImages.mockReturnValue({
      images: mockImages,
      loading: false,
      error: null,
      fetchImages: jest.fn(),
      pullImage: mockPullImage,
      removeImage: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );

    // Open pull dialog
    fireEvent.click(screen.getByText('Pull Image'));
    expect(screen.getByText('Pull Docker Image')).toBeInTheDocument();

    // Fill form
    fireEvent.change(screen.getByLabelText('Image Name'), {
      target: { value: 'nginx:latest' },
    });
    fireEvent.change(screen.getByLabelText('Host'), {
      target: { value: 'host1' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Pull'));

    await waitFor(() => {
      expect(mockPullImage).toHaveBeenCalledWith('host1', 'nginx:latest');
    });
  });

  it('handles delete image confirmation', async () => {
    const mockRemoveImage = jest.fn();
    mockUseDockerImages.mockReturnValue({
      images: mockImages,
      loading: false,
      error: null,
      fetchImages: jest.fn(),
      pullImage: jest.fn(),
      removeImage: mockRemoveImage,
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );

    // Click delete button
    const deleteButtons = screen.getAllByTitle('Delete Image');
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockRemoveImage).toHaveBeenCalledWith('host1', 'sha256:123456789abc');
    });
  });

  it('handles error state', () => {
    mockUseDockerImages.mockReturnValue({
      images: [],
      loading: false,
      error: 'Failed to fetch images',
      fetchImages: jest.fn(),
      pullImage: jest.fn(),
      removeImage: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('Failed to fetch images')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseDockerImages.mockReturnValue({
      images: [],
      loading: true,
      error: null,
      fetchImages: jest.fn(),
      pullImage: jest.fn(),
      removeImage: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('formats image sizes correctly', () => {
    const images = [
      {
        ...mockImages[0],
        size: 1024, // 1KB
      },
      {
        ...mockImages[1],
        size: 1024 * 1024 * 2, // 2MB
      },
    ];

    mockUseDockerImages.mockReturnValue({
      images,
      loading: false,
      error: null,
      fetchImages: jest.fn(),
      pullImage: jest.fn(),
      removeImage: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <DockerImages hostIds={['host1']} />
      </ThemeProvider>
    );

    expect(screen.getByText('1.00 KB')).toBeInTheDocument();
    expect(screen.getByText('2.00 MB')).toBeInTheDocument();
  });
});
