import { gql } from '@apollo/client';

const purchase = gql`
  mutation (
    $symbol: String!
    $price: Decimal!
    $openPrice: Decimal!
    $purchasePrice: Decimal!
    $purchaseQuantity: Int!
  ) {
    purchase(
      symbol: $symbol
      price: $price
      openPrice: $openPrice
      quantity: $purchaseQuantity
      purchasePrice: $purchasePrice
    ) {
      id
      purchasePrice
      quantity
      purchaseBy {
        email
        balance
      }
    }
  }
`;

const login = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      token
      user {
        email
        id
      }
    }
  }
`;

const register = gql`
  mutation (
    $signupUsername: String!
    $signupEmail: String!
    $signupPassword: String!
  ) {
    signup(
      username: $signupUsername
      email: $signupEmail
      password: $signupPassword
    ) {
      token
      user {
        email
      }
    }
  }
`;

export { purchase, login, register };
