//TODO: refactor URL

const getPrice = (symbol, quantity) => {
  const url = `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=pk_ff8cf7c0efac491195e571580aa32df3`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let getPrice = data[data.length - 1].open;
      let calcPrce = getPrice * quantity;
      return calcPrce;
    });
};
//TODO: get most active in market
const getMostActive = () => {
  let url =
    "https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_ff8cf7c0efac491195e571580aa32df3";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export { getPrice, getMostActive };
