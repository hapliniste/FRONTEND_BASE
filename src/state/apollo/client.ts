import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';
import { localTypeDefs, localResolvers } from './local';

// Create an HTTP link to Hasura
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_URL, // e.g., 'https://your-hasura-instance/v1/graphql'
});

// Create an authentication link
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  if (!session?.accessToken) return { headers };

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${session.accessToken}`,
    },
  };
});

// Initialize the Apollo cache
const cache = new InMemoryCache();

// Initialize Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache,
  typeDefs: localTypeDefs,
  resolvers: localResolvers,
  connectToDevTools: process.env.NODE_ENV !== 'production',
});

export default client;
