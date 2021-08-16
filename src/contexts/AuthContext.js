import React, { useReducer, createContext } from 'react';
import Proptypes from 'prop-types';
import { SIGN_IN, SIGN_OUT } from './constants';

const initialState = {
  accessToken: '',
  user: {}
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SIGN_IN:
        return {
          ...state,
          accessToken: action.payload.accessToken,
          user: {
            ...action.payload.user
          }
        };
      case SIGN_OUT:
        return { ...state, accessToken: action.payload.accessToken, user: {} };
      default:
        return state;
    }
  }, initialState);

  const setAuth = (auth) => {
    const accessToken = auth.token;
    localStorage.setItem(
      'accessToken',
      JSON.stringify(accessToken).replace(/^"(.*)"$/, '$1')
    );
    localStorage.setItem('user', JSON.stringify(auth.user));
    dispatch({
      type: SIGN_IN,
      payload: {
        accessToken,
        user: {
          ...auth.user
        }
      }
    });
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({
      type: SIGN_OUT,
      payload: {
        accessToken: '',
        user: {}
      }
    });
  };

  return (
    <AuthContext.Provider value={{ state, setAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: Proptypes.node.isRequired
};

export default AuthContext;
