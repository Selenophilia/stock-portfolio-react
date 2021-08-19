import { gql } from '@apollo/client';

const transactions = gql`
  query {
    getTransactions {
      id
      quantity
      createdAt
      purchasePrice
      purchaseBy {
        email
        username
      }
    }
  }
`;

const stocks = gql`
  query {
    getStocks {
      symbol
      createdAt
      price
      openPrice
      change
      quantity
      owner {
        email
        username
        balance
      }
    }
  }
`;

const getUser = gql`
  query {
    getUser {
      id
      username
      balance
    }
  }
`;

export { transactions, stocks, getUser };
