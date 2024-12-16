import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabPanel } from '../TabPanel';

describe('TabPanel', () => {
  const defaultProps = {
    children: <div>Test Content</div>,
    index: 0,
    value: 0,
  };

  it('renders children when value matches index', () => {
    render(<TabPanel {...defaultProps} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render children when value does not match index', () => {
    render(<TabPanel {...defaultProps} value={1} />);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<TabPanel {...defaultProps} />);
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', 'simple-tab-0');
    expect(panel).toHaveAttribute('id', 'simple-tabpanel-0');
  });

  it('applies custom styles', () => {
    render(<TabPanel {...defaultProps} />);
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveStyle({ padding: '24px' });
  });
});
