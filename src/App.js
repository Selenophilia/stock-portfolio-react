import React from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
