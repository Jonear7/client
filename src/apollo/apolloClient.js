
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4004/',  // Change to your GraphQL API URL
  cache: new InMemoryCache(),
});

export default client;
