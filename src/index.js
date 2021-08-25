import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import reportWebVitals from './reportWebVitals';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloClient
} from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';
import LanguageProvider from './contexts/LangContext';
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LanguageProvider>
        <AuthProvider>
          <CssBaseline />
          <App />
        </AuthProvider>
      </LanguageProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
