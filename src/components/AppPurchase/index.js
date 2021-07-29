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
        <input className="ticker" type="text" placeholder="enter symbol" />
        <input className="quantiy" type="number" placeholder="enter quantity" />
        <button className="buy-btn">Buy</button>
      </form>
    </div>
  );
};

export default AppPurchase;
