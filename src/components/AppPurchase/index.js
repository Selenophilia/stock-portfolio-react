import React from 'react';
import './index.scss';

const AppPurchase = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container">
      <form className="purchase-form" onSubmit={handleSubmit}>
        <span className="title">Buy Stock</span>
        <label className="form-label">Ticker Symbol:</label>
        <input className="ticker" type="text" />
        <label className="form-label">Quantity:</label>
        <input className="quantiy" type="number" />
        <button className="buy-btn">Buy</button>
      </form>
    </div>
  );
};

export default AppPurchase;
