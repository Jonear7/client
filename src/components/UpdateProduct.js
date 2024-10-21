// /src/components/UpdateProduct.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT } from '../graphql/mutations';
import Modal from './Modal';
import { GET_PRODUCTS } from '../graphql/queries';

const UpdateProduct = ({ product, isOpen, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      onClose(); // Close the modal after successful update
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({
      variables: {
        id: product.id,
        name,
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-center mb-6">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          type="number"
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
          Update Product
        </button>
      </form>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">Error: {error.message}</p>}
    </Modal>
  );
};

export default UpdateProduct;
