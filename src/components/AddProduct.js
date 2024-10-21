// /src/components/AddProduct.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../graphql/mutations';
import Modal from './Modal';
import { GET_PRODUCTS } from '../graphql/queries';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // State for modal open/close

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    onCompleted: () => {
      setIsOpen(false); // Close modal after product is created
      setName(''); // Clear form fields
      setPrice('');
      setDescription('');
      setStock(0);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct({
      variables: { name, price: parseFloat(price), description, stock: parseInt(stock) },
    });
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="mb-4 p-2 bg-blue-600 text-white rounded-md">
        Add Product
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
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
            Add Product
          </button>
        </form>
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">Error: {error.message}</p>}
      </Modal>
    </div>
  );
};

export default AddProduct;
