import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_URL, // It is bublic because it is used in the client side
  cache: new InMemoryCache(),
});

export default apolloClient;
