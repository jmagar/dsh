import React from 'react';
import { createRoot } from 'react-dom/client';
import { VERSION } from '@dsh/shared';

const App = () => {
  return (
    <div>
      <h1>DSH - Server Monitoring Dashboard</h1>
      <p>Version: {VERSION}</p>
    </div>
  );
};

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 