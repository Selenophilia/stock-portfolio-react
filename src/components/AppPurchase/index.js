import React, { useContext, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { purchase } from '../../api/mutation';
import PropTypes from 'prop-types';
import './index.scss';

const AppPurchase = ({ rows }) => {
  const symbolRef = useRef();
  const quantiyRef = useRef();

  const [purchaseFunc, { data }] = useMutation(purchase, {
    variables: {
      symbol: symbolRef.current ? `${symbolRef.current.value}` : '',
      price: 150.23,
      openPrice: 50.12,
      purchasePrice: 142.2,
      purchaseQuantity: quantiyRef.current ? `${quantiyRef.current.value}` : ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    purchaseFunc();
    console.log('[mutation]', data);
    rows.push({
      symbol: `${symbolRef.current.value}`,
      change: '-0.24%',
      quantity: `${quantiyRef.current.value} share`,
      price: '150.99',
      cost: '25.00'
    });
  };

  return (
    <div className="container">
      <form className="purchase-form" onSubmit={handleSubmit}>
        <span className="title">Buy Stock</span>
        <label className="form-label">Ticker Symbol:</label>
        <input className="ticker" type="text" ref={symbolRef} />
        <label className="form-label">Quantity:</label>
        <input className="quantiy" type="number" ref={quantiyRef} />
        <button className="buy-btn">Buy</button>
      </form>
    </div>
  );
};
AppPurchase.propTypes = {
  rows: PropTypes.array.isRequired
};
export default AppPurchase;
