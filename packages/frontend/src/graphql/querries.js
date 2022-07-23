import { gql } from '@apollo/client';

export const GET_REDEEMABLE_VOUCHERS = gql`
query RedeemableVouchers {
  redeemableVouchers {
    id
    signerAddress
    redeemerAddress
    name
    signature
    isExecuted
    error
  }
}
`;

