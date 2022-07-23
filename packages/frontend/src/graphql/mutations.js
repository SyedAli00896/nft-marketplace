import { gql } from '@apollo/client';

export const CREATE_VOUCHER = gql`
  mutation CreateVoucher($input: VoucherInput!) {
    createVoucher(input: $input) 
  }
`;
