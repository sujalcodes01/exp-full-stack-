import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 React Docker Multi-Stage Build</h1>
        <p>Experiment 3.2.1 - Production-Ready Deployment</p>
        
        <div className="info-container">
          <div className="info-card">
            <h2>✅ Build Features</h2>
            <ul>
              <li>Multi-Stage Docker Build</li>
              <li>Optimized Image Size (&lt;100MB)</li>
              <li>Nginx Server Configuration</li>
              <li>Gzip Compression Enabled</li>
              <li>Caching Headers for Static Assets</li>
              <li>Environment Variables Support</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>🚀 Deployment Details</h2>
            <ul>
              <li>Port: 8080</li>
              <li>Node Version: 18 LTS</li>
              <li>React Version: 18+</li>
              <li>Docker Version: 20.10+</li>
              <li>Build Stage: Node Build</li>
              <li>Runtime Stage: Nginx</li>
            </ul>
          </div>
        </div>

        <div className="environment-info">
          <h3>Environment Variables</h3>
          <p>REACT_APP_API_URL: {process.env.REACT_APP_API_URL || 'Not Set'}</p>
          <p>NODE_ENV: {process.env.NODE_ENV || 'Not Set'}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
