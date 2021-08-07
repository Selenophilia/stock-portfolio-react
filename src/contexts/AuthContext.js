import React, { useReducer, createContext } from 'react';
import Proptypes from 'prop-types';
import { SET_AUTH } from './constants';

const initialState = {
  accessToken: '',
  loading: true
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_AUTH:
        return [{ ...state, ...action.payload }];
      default:
        return state;
    }
  }, initialState);

  const setAuth = (auth) => {
    dispatch({
      type: SET_AUTH,
      payload: [{ ...state, ...auth }]
    });
  };

  return (
    <AuthContext.Provider value={{ state, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: Proptypes.node.isRequired
};

export default AuthContext;
