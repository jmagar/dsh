import { render, screen } from '@testing-library/react';
import React from 'react';

import { ServiceStatusCard } from './ServiceStatusCard';

describe('ServiceStatusCard', () => {
  it('renders service name and success icon when healthy', () => {
    render(<ServiceStatusCard name="Test Service" isHealthy={true} />);
    
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(document.querySelector('svg[data-testid="CheckCircleIcon"]')).toBeInTheDocument();
  });

  it('renders service name and error icon when not healthy', () => {
    render(<ServiceStatusCard name="Test Service" isHealthy={false} />);
    
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(document.querySelector('svg[data-testid="ErrorIcon"]')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Connection failed';
    render(
      <ServiceStatusCard name="Test Service" isHealthy={false} error={errorMessage} />
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not display error message when empty or null', () => {
    const { rerender } = render(
      <ServiceStatusCard name="Test Service" isHealthy={true} error="" />
    );
    
    expect(screen.queryByText('')).not.toBeInTheDocument();
    
    rerender(<ServiceStatusCard name="Test Service" isHealthy={true} error={null} />);
    expect(screen.queryByText('')).not.toBeInTheDocument();
  });
});
