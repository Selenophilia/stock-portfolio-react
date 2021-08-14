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

export { transactions };
