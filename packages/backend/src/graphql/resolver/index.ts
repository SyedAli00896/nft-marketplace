import { mergeResolvers } from '@graphql-tools/merge'
import scalarResolver from './scalar.resolver'
import voucherResolvers from './voucher.resolver'

export const resolvers = mergeResolvers([
  voucherResolvers,
  scalarResolver
])
