import { ApolloError } from 'apollo-server'

enum ErrorType {
  InvalidSignatue = 'SIGNATURE_NOT_MATCHED',
  SignatureAlreadyExists = 'SIGNATURE_ALREADY_EXISTS',
  VoucherNotFound = 'VOUCHER_NOT_FOUND',
  VoucherAlreadyExists = 'VOUCHER_ALREADY_EXISTS',
  InvalidRedemer = 'INVALID_REDEMER',
}


export const buildVoucherNotFound = (): ApolloError => new ApolloError(
  'Voucher not found',
  ErrorType.VoucherNotFound,
)

export const buildVoucherAlreadyExistsError = (): ApolloError => new ApolloError(
  'Voucher already exists',
  ErrorType.VoucherAlreadyExists,
)

export const buildSignatureAlreadyExistsError = (): ApolloError => new ApolloError(
  'Signature already exists',
  ErrorType.SignatureAlreadyExists,
)
export const buildInvalidSignatureError = (): ApolloError => new ApolloError(
  'Signature not mached',
  ErrorType.InvalidSignatue,
)

export const buildInvalidRedemerError = (): ApolloError => new ApolloError(
  'Signer cant be redemer',
  ErrorType.InvalidRedemer,
)
