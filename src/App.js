import React from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext.js';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloClient
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
