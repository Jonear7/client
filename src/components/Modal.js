// /src/components/Modal.js

import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96 relative"> {/* Add relative positioning */}
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-150" 
          onClick={onClose} 
          aria-label="Close Modal"
        >
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
