import { gql } from '@apollo/client';

const purchase = gql`
  mutation (
    $symbol: String!
    $price: Decimal!
    $openPrice: Decimal!
    $purchasePrice: Decimal!
    $purchaseQuantity: Int!
    $change: Decimal!
  ) {
    purchase(
      symbol: $symbol
      price: $price
      openPrice: $openPrice
      quantity: $purchaseQuantity
      purchasePrice: $purchasePrice
      change: $change
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
        username
      }
    }
  }
`;

const register = gql`
  mutation (
    $signupUsername: String!
    $signupEmail: String!
    $signupPassword: String!
    $lang: String!
  ) {
    signup(
      username: $signupUsername
      email: $signupEmail
      password: $signupPassword
      lang: $lang
    ) {
      token
      user {
        email
        id
        email
        lang
        username
      }
    }
  }
`;

export { purchase, login, register };
