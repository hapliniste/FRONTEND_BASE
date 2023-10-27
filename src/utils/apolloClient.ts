import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_URL, 
});

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const session = await getSession();

  //console.log('APOLLO CLIENT');

  // If there's no session, we won't send the authorization header
  if (!session?.accessToken) return { headers };

  //console.log('APOLLO CLIENT HAS ACCESS TOKEN');

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${session.accessToken}`,
    },
  };
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
