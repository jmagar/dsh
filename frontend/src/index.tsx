// React dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';

// Internal components
import App from './App';
// Internal utilities
import { logger } from './utils/logger';

function renderApp(): void {
  try {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
      throw new Error('Failed to find root element');
    }

    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    logger.info('Application initialized', {
      component: 'index',
      url: window.location.href,
      message: 'Application successfully rendered',
    });
  } catch (error: unknown) {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    logger.error('Failed to render application', {
      component: 'index',
      error: errorObj,
      message: 'Application failed to render',
    });

    // Optionally, show a user-friendly error message
    const errorContainer = document.createElement('div');
    errorContainer.textContent =
      'An error occurred while loading the application. Please try again later.';
    errorContainer.style.color = 'red';
    errorContainer.style.textAlign = 'center';
    errorContainer.style.padding = '20px';

    document.body.appendChild(errorContainer);
  }
}

// Ensure the DOM is fully loaded before rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
