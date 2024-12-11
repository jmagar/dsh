import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="/" element={<div>Dashboard Home</div>} />
            <Route path="/servers" element={<div>Servers List</div>} />
            <Route path="/metrics" element={<div>Metrics Overview</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 