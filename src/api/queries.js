import { gql } from '@apollo/client';

const transactions = gql`
  query {
    getTransactions {
      id
      quantity
      purchasePrice
    }
  }
`;

export { transactions };
