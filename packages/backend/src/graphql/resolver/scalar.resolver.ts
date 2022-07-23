import { GraphQLScalarType, Kind } from 'graphql'
import { appError } from '../error'


const invalidSignatureError = appError.buildInvalid(
    'Value is not a signature',
    'INVALID_SIGNATURE',
)

const validateSignature = (value: string): string => {
    // 1) first two characters are '0x'
    // 2) the last character should be c or b(it is derive from chainId)
    // 3) the length should be 132 digits
    // 4) has lowercase characters
    if (/^0x[a-z0-9]{129}[cb]$/.test(value)) {
        return value
    }
    throw invalidSignatureError
}

const Signature = new GraphQLScalarType({
    description: 'Ethereum signed transaction signature',
    name: 'Signature',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            return invalidSignatureError
        }
        return validateSignature(ast.value)
    },
    parseValue: validateSignature,
    serialize: validateSignature,
})

const invalidAddressError = appError.buildInvalid(
    'Value is not a address',
    'INVALID_ADDRESS',
)

const validateAddress = (value: string): string => {
    if (/^0x[a-fA-F0-9]{40}$/.test(value)) {
        return value
    }
    throw invalidAddressError
}

const Address = new GraphQLScalarType({
    description: 'Ethereum address',
    name: 'Address',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            return invalidAddressError
        }
        return validateAddress(ast.value)
    },
    parseValue: validateAddress,
    serialize: validateAddress,
})


export default {
    Signature,
    Address
}
