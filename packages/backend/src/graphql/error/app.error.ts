import { ApolloError } from 'apollo-server'

enum ErrorType {
  InternalError = 'INTERNAL_ERROR',
  InvalidSchema = 'INVALID_SCHEMA',
  BadRequest = 'BAD_REQUEST'
}

export const buildCustomError = (message: string): ApolloError => new ApolloError(
  message,
  ErrorType.InternalError,
)

export const buildInvalidSchemaError = (message?: string): ApolloError => new ApolloError(
  message || 'Invalid schema provided',
  ErrorType.InvalidSchema,
)

export const buildInvalid = (message: string, errorKey: string): ApolloError =>
  new ApolloError(
    message,
    ErrorType.BadRequest,
    { errorKey },
  )

