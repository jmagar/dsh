import { render, screen } from '@testing-library/react';
import React from 'react';

import { EnvTest } from './EnvTest';

describe('EnvTest', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      REACT_APP_API_URL: 'http://api.example.com',
      REACT_APP_FRONTEND_URL: 'http://frontend.example.com',
      REACT_APP_NODE_ENV: 'test',
      REACT_APP_CORS_ORIGIN: 'http://localhost:3000',
      REACT_APP_WS_URL: 'ws://websocket.example.com',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders the component title', () => {
    render(<EnvTest />);
    expect(screen.getByText('Environment Variables Test')).toBeInTheDocument();
  });

  it('displays all environment variables', () => {
    render(<EnvTest />);
    const preElement = screen.getByText(/http:\/\/api\.example\.com/);
    expect(preElement).toBeInTheDocument();
    expect(preElement).toHaveTextContent('http://frontend.example.com');
    expect(preElement).toHaveTextContent('test');
    expect(preElement).toHaveTextContent('http://localhost:3000');
    expect(preElement).toHaveTextContent('ws://websocket.example.com');
  });

  it('handles undefined environment variables', () => {
    process.env = {
      ...originalEnv,
      REACT_APP_API_URL: undefined,
    };

    render(<EnvTest />);
    const preElement = screen.getByText(/"API_URL": undefined/);
    expect(preElement).toBeInTheDocument();
  });

  it('applies custom className and style', () => {
    const className = 'custom-class';
    const style = { backgroundColor: 'red' };
    render(<EnvTest className={className} style={style} />);
    
    const container = screen.getByText('Environment Variables Test').closest('div');
    expect(container).toHaveClass(className);
    expect(container).toHaveStyle({ backgroundColor: 'red' });
  });
});
