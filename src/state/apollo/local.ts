import { typeDefs as todoTypeDefs, resolvers as todoResolvers } from './graphql/todos';
// Import other local states here as you add them
// import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user';

// Merge typeDefs by combining them into an array
const localTypeDefs = [
  todoTypeDefs,
  // userTypeDefs,
];

// Merge resolvers manually by combining their fields
const localResolvers = {
  Query: {
    ...todoResolvers.Query,
    // ...userResolvers.Query,
  },
  Mutation: {
    ...todoResolvers.Mutation,
    // ...userResolvers.Mutation,
  },
  // Add other resolver types if necessary (e.g., Subscription)
};

export { localTypeDefs, localResolvers };
