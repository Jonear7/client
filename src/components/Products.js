// /src/components/Products.js

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md h-screen">
      <h2 className="text-2xl font-bold mb-6">Products List</h2>
      <ul className="space-y-4">
        {data.products.map((product) => (
          <li key={product.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
