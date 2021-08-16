//TODO: refactor URL

const fetchSymbols = async () => {
  const url = `https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_ff8cf7c0efac491195e571580aa32df3`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchQuote = async (symbol) => {
  const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_ff8cf7c0efac491195e571580aa32df3`;
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
export { fetchQuote, fetchSymbols, getMarketSummary };
