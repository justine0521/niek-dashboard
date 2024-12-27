import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Ensure the confirmDeleteProduct function is called
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
