//TODO: refactor URL

const getStock = async (symbol) => {
  const url = `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_ff8cf7c0efac491195e571580aa32df3`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getMarketSummary = async () => {
  const url =
    'https://cloud.iexapis.com/stable/stock/market/list/iexvolume?token=pk_ff8cf7c0efac491195e571580aa32df3&listLimit=10';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
export { getStock, getMarketSummary };
