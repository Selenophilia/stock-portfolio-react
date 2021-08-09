import React from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext.js';

import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloClient
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
