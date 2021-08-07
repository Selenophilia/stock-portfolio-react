import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/main.scss';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
