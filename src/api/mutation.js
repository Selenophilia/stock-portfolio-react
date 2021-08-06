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

export { purchase };
