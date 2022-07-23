import { ApolloServer } from 'apollo-server'

import { typeDefs } from '@src/graphql/schema'
import { resolvers } from '@src/graphql/resolver'

let server: ApolloServer

export const start = async (port: number): Promise<void> => {
  if (server) {
    return
  }

  server = new ApolloServer({
    cors: true,
    resolvers,
    typeDefs,
  })
  const { url } = await server.listen(port)
  console.log(`🚀  Server ready at ${url}`)
}

export const stop = (): Promise<void> => {
  if (!server) {
    return
  }
  return server.stop()
}
