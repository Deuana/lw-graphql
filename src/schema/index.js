import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { UserType } from './user';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: UserType,
      resolve: () => ({
        id: 1,
        name: 'Primeiro Usuário',
        username: 'user1',
        email: 'primeiro@email.com',
      }),
    },
  }),
});

export default new GraphQLSchema({ query: QueryType });
