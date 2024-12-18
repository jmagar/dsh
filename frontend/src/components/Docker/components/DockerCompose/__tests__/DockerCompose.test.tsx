import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { DockerCompose } from '../DockerCompose';

import { useDockerCompose } from '@/client/hooks/useDockerCompose';

jest.mock('@/client/hooks/useDockerCompose');
jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: () => <div data-testid="monaco-editor">Monaco Editor</div>,
}));

const mockUseDockerCompose = {
  loading: false,
  error: null,
  composeContent: '',
  currentConfig: null,
  editMode: false,
  showConfirmDialog: false,
  dialogAction: 'up' as const,
  handleEditModeChange: jest.fn(),
  handleContentChange: jest.fn(),
  handleAction: jest.fn(),
  handleSave: jest.fn(),
  setShowConfirmDialog: jest.fn(),
  setDialogAction: jest.fn(),
  loadConfig: jest.fn(),
};

describe('DockerCompose', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDockerCompose as jest.Mock).mockReturnValue(mockUseDockerCompose);
  });

  const theme = createTheme();
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <DockerCompose hostId="test-host" />
      </ThemeProvider>
    );

  it('should render the component', () => {
    renderComponent();

    expect(screen.getByText('Docker Compose')).toBeInTheDocument();
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('should handle edit mode', () => {
    (useDockerCompose as jest.Mock).mockReturnValue({
      ...mockUseDockerCompose,
      editMode: true,
    });

    renderComponent();

    expect(screen.getByTitle('Save changes')).toBeInTheDocument();
    expect(screen.getByTitle('Cancel editing')).toBeInTheDocument();
  });

  it('should show error alert', () => {
    (useDockerCompose as jest.Mock).mockReturnValue({
      ...mockUseDockerCompose,
      error: 'Test error',
    });

    renderComponent();

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('should handle action buttons', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Start'));
    expect(mockUseDockerCompose.setDialogAction).toHaveBeenCalledWith('up');
    expect(mockUseDockerCompose.setShowConfirmDialog).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Stop'));
    expect(mockUseDockerCompose.setDialogAction).toHaveBeenCalledWith('down');
    expect(mockUseDockerCompose.setShowConfirmDialog).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Remove'));
    expect(mockUseDockerCompose.setDialogAction).toHaveBeenCalledWith('remove');
    expect(mockUseDockerCompose.setShowConfirmDialog).toHaveBeenCalledWith(true);
  });

  it('should show confirmation dialog', () => {
    (useDockerCompose as jest.Mock).mockReturnValue({
      ...mockUseDockerCompose,
      showConfirmDialog: true,
      dialogAction: 'up',
    });

    renderComponent();

    expect(screen.getByText('Confirm Up')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to up the Docker Compose configuration/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Confirm'));
    expect(mockUseDockerCompose.handleAction).toHaveBeenCalledWith('up');
  });

  it('should show loading overlay', () => {
    (useDockerCompose as jest.Mock).mockReturnValue({
      ...mockUseDockerCompose,
      loading: true,
    });

    renderComponent();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show status chip when config exists', () => {
    (useDockerCompose as jest.Mock).mockReturnValue({
      ...mockUseDockerCompose,
      currentConfig: {
        content: 'test',
        status: 'running',
      },
    });

    renderComponent();

    expect(screen.getByText('running')).toBeInTheDocument();
  });
});
