import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { DELETE_PRODUCT } from '../graphql/mutations';
import UpdateProduct from './UpdateProduct';
import Modal from './Modal';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = (id) => {
    deleteProduct({ variables: { id } })
      .then(() => {
        console.log('Product deleted successfully');
        setIsDeleteOpen(false); // Close the modal if deletion was successful
        setSelectedProduct(null); // Clear the selected product
      })
      .catch((error) => {
        console.error('Error deleting product:', error.message);
        alert('Failed to delete the product: ' + error.message); // Optionally alert the user
      });
  };
  

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsUpdateOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 underline">Product List</h2>
      <ul>
        {data.products.map((product) => (
          <li key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
              <p className="text-gray-700">Stock: {product.stock}</p>
              <p className="text-gray-700">Description: {product.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleUpdateClick(product)}
                className="mr-4 text-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setIsDeleteOpen(true);
                }}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          isOpen={isUpdateOpen}
          onClose={() => {
            setIsUpdateOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
        <p className="text-center mb-6">
          Are you sure you want to delete "{selectedProduct?.name}"?
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              handleDelete(selectedProduct.id);
              setIsDeleteOpen(false);
              setSelectedProduct(null);
            }}
            className="p-2 bg-red-600 text-white rounded-md mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="p-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
