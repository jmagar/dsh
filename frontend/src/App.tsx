import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  AgentMetrics,
  EnvTest,
  MetricsOverview,
  Servers,
  SystemStatus,
} from './pages';
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
            <Route path="/servers" element={<Servers />} />
            <Route path="/metrics" element={<MetricsOverview />} />
            <Route path="/env-test" element={<EnvTest />} />
            <Route path="/agent" element={<AgentMetrics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;