import { Plugin } from '@nestjs/graphql'
import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from 'apollo-server-plugin-base'

@Plugin()
export class GraphQLLoggingPlugin implements ApolloServerPlugin {
  requestDidStart(_rc: GraphQLRequestContext): GraphQLRequestListener {
    return {
      didEncounterErrors: (rc) => {
        rc.logger.info(rc.errors)
      },
    }
  }
}
