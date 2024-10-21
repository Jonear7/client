// /src/graphql/client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';


// Create a new Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4004/graphql', // Replace with your server URL
  cache: new InMemoryCache(),
});


export default client;
