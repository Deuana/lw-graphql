import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { UserType, UserDAO } from './user';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: UserType,
      resolve: async () => await UserDAO.findOne({ username: 'admin' }),
    },
  }),
});

export default new GraphQLSchema({ query: QueryType });
