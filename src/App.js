// /src/App.js

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'; // Import your Apollo Client instance
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto p-4 bg-gray-100 rounded-2xl mt-28">
        <AddProduct />
        <ProductList />
      </div>
    </ApolloProvider>
  );
};

export default App;
