// /src/graphql/mutations.js

import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Float!, $description: String!, $stock: Int!) {
    createProduct(name: $name, price: $price, description: $description, stock: $stock) {
      id
      name
      price
      description
      stock
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $name: String!, $price: Float!, $description: String!, $stock: Int!) {
    updateProduct(id: $id, name: $name, price: $price, description: $description, stock: $stock) {
      id
      name
      price
      description
      stock
    }
  }
`;



export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;


