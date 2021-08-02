import React from 'react';
import AppHeader from '../../components/AppHeader';
import AppPurchase from '../../components/AppPurchase';
import TabControl from '../../components/NavigationTabs/TabControl';
import Tab from '../../components/NavigationTabs/Tab';
import './index.scss';

const Home = () => {
  return (
    <div className="stock-container">
      <AppHeader />
      <div className="stock-content">
        <AppPurchase />
        <div className="tabs">
          <TabControl>
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
