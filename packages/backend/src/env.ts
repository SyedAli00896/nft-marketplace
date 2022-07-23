import * as _ from 'lodash'

const lookupEnvKeyOrThrow = (key: string): string => {
  const value = process.env[key]
  if (_.isString(value)) {
    return value
  }
  const errMessage = `Environment variable ${key} is required`
  throw new Error(errMessage)
}

export const serverPort = +process.env.PORT || 9080

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 27017,
  username: process.env.DB_USERNAME || 'mongo',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'app',
}

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: +process.env.REDIS_PORT || 6379,
}

export const blockchainConfig = {
  networksURI: lookupEnvKeyOrThrow('NETWORKS_URI'),
  contractAccount: lookupEnvKeyOrThrow('CONTRACT_ACCOUNT'),
  contractAccountPK: lookupEnvKeyOrThrow('CONTRACT_ACCOUNT_PK'),
  signingDomainName: lookupEnvKeyOrThrow('SIGNING_DOMAIN_NAME'),
  signingDomainVersion: lookupEnvKeyOrThrow('SIGNING_DOMAIN_VERSION'),
  chainId: lookupEnvKeyOrThrow('CHAIN_ID'),
}