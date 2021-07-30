import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/AppHeader';
import AppPurchase from '../../components/AppPurchase';
import MarketSummary from '../../components/MarketSummary';
import { getMarketSummary } from '../../api';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const results = await getMarketSummary();
    setData(results);
  }, []);

  return (
    <>
      <AppHeader />
      <AppPurchase />
      <MarketSummary stocks={data} />
    </>
  );
};

export default Home;
