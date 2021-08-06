import React, { useReducer, createContext } from 'react';
import Proptypes from 'prop-types';
import { SET_STOCKS } from './constants';

const initialState = [{}];
const StockContext = createContext(initialState);

export const StockProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_STOCKS:
        return [{ ...state, ...action.payload }];
      default:
        return state;
    }
  }, initialState);

  const createStock = (stocks) => {
    dispatch({
      type: SET_STOCKS,
      payload: [{ ...state, ...stocks }]
    });
  };

  return (
    <StockContext.Provider value={{ state, createStock }}>
      {children}
    </StockContext.Provider>
  );
};

StockProvider.propTypes = {
  children: Proptypes.node.isRequired
};

export default StockContext;
