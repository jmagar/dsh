import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { EnvTest } from './components/EnvTest';
import { SystemStatus } from './components/SystemStatus';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>DSH - Server Monitoring Dashboard</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SystemStatus />} />
            <Route path="/servers" element={<div>Servers List</div>} />
            <Route path="/metrics" element={<div>Metrics Overview</div>} />
            <Route path="/env-test" element={<EnvTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;