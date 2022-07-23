import { gql } from "apollo-server";
export const typeDefs = gql`
  scalar Signature
  scalar Address
  type Voucher {
    id: ID
    signerAddress: Address!
    redeemerAddress: Address
    name: String!
    signature: Signature!
    isExecuted: Boolean
    minPrice: Int!
    error: String
  }
  input VoucherInput {
    signerAddress: Address!
    redeemerAddress: Address
    name: String!
    signature: Signature!
    minPrice: Int!
  }

  type Query {
    redeemableVouchers: [Voucher]
  }

  type Mutation {
    createVoucher(input: VoucherInput!): Boolean
  }
`;
