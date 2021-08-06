import React from 'react';
import AppHeader from '../../components/AppHeader';
import AppPurchase from '../../components/AppPurchase';
import TabControl from '../../components/NavigationTabs/TabControl';
import Tab from '../../components/NavigationTabs/Tab';
import './index.scss';

const Home = () => {
  function createData(symbol, change, quantity, price, cost) {
    return { symbol, change, quantity, price, cost };
  }

  const rows = [
    createData('AAPL', '-0.24%', '1 share', '150.99', '25.00'),
    createData('MSFT', '-0.24%', '1 share', '150.99', '25.00'),
    createData('GOOG', '-0.24%', '1 share', '150.99', '25.00'),
    createData('AAPL', '-0.24%', '1 share', '150.99', '25.00'),
    createData('AAPL', '-0.24%', '1 share', '150.99', '25.00')
  ];

  return (
    <div className="stock-container">
      <AppHeader />
      <div className="stock-content">
        <AppPurchase rows={rows} createData={createData} />
        <div className="tabs">
          <TabControl rows={rows} createData={createData}>
            <Tab label="Portfolio" />
            <Tab label="Transactions" />
            <Tab label="Market Summary" />
          </TabControl>
        </div>
      </div>
    </div>
  );
};

export default Home;
