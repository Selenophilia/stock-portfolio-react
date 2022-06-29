import React from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './app.scss';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
