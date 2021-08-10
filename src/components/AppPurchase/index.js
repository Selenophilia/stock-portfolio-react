import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { purchase } from '../../api/mutation';
import PropTypes from 'prop-types';
import './index.scss';

const AppPurchase = ({}) => {
  const symbolRef = useRef();
  const quantiyRef = useRef();

  //get transactionid
  const [purchaseFunc] = useMutation(purchase, {
    onCompleted: (data) => {
      console.log('data', data);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    purchaseFunc({
      variables: {
        symbol: symbolRef.current.value,
        price: 150.23,
        openPrice: 50.12,
        purchasePrice: 142.2,
        purchaseQuantity: Number(quantiyRef.current.value)
      }
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
