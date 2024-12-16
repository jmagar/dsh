import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { DockerContainers } from '../DockerContainers';
import { useDockerContainers } from '@/client/hooks/useDockerContainers';

jest.mock('@/client/hooks/useDockerContainers');

const mockContainer = {
  id: 'container-1',
  name: 'test-container',
  image: 'nginx:latest',
  status: 'running',
  state: 'running',
  created: 1234567890,
  ports: [{ privatePort: 80, publicPort: 8080 }],
};

const mockProps = {
  hostId: 'host-1',
  containers: [mockContainer],
  onRefresh: jest.fn(),
};

const mockUseDockerContainers = {
  filteredContainers: [mockContainer],
  loading: false,
  searchTerm: '',
  selectedContainer: null,
  showDeleteDialog: false,
  handleSearchChange: jest.fn(),
  handleClearSearch: jest.fn(),
  handleContainerAction: jest.fn(),
  handleConfirmDelete: jest.fn(),
  setShowDeleteDialog: jest.fn(),
};

describe('DockerContainers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDockerContainers as jest.Mock).mockReturnValue(mockUseDockerContainers);
  });

  const theme = createTheme();
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DockerContainers {...mockProps} />
      </ThemeProvider>
    );

  it('should render container list', () => {
    renderComponent();

    expect(screen.getByText('test-container')).toBeInTheDocument();
    expect(screen.getByText('nginx:latest')).toBeInTheDocument();
    expect(screen.getByText('running')).toBeInTheDocument();
  });

  it('should handle search input', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Search containers...');
    fireEvent.change(searchInput, { target: { value: 'nginx' } });

    expect(mockUseDockerContainers.handleSearchChange).toHaveBeenCalled();
  });

  it('should handle container actions', () => {
    renderComponent();

    const stopButton = screen.getByTitle('Stop');
    fireEvent.click(stopButton);

    expect(mockUseDockerContainers.handleContainerAction).toHaveBeenCalledWith(
      mockContainer,
      'stop'
    );
  });

  it('should handle delete confirmation dialog', async () => {
    const mockWithDialog = {
      ...mockUseDockerContainers,
      showDeleteDialog: true,
      selectedContainer: mockContainer,
    };
    (useDockerContainers as jest.Mock).mockReturnValue(mockWithDialog);

    renderComponent();

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to remove container/)).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockUseDockerContainers.handleConfirmDelete).toHaveBeenCalled();
  });

  it('should show loading overlay when loading', () => {
    const mockLoading = {
      ...mockUseDockerContainers,
      loading: true,
    };
    (useDockerContainers as jest.Mock).mockReturnValue(mockLoading);

    renderComponent();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should handle filter menu', () => {
    renderComponent();

    const filterButton = screen.getByTestId('FilterListIcon').parentElement;
    if (filterButton) {
      fireEvent.click(filterButton);
    }

    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();
  });
});
