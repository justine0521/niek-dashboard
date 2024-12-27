import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import AddProductModal from "../modal/AddProductModal";
import DeleteModal from "../modal/DeleteModal";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

function Products({ isOpen }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3004/api/products/${productId}`);
      fetchProducts(); // Refresh products after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId); // Ensure productId is just the ObjectId
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error confirming delete:", error);
    }
  };

  return (
    <section className={`main-content h-screen mt-14 py-7 overflow-auto scrollnone relative transition-all ${isOpen ? 'w-screen' : ''}`}>
      <div className='bg-gray-100 mx-5'>
        <div className="bg-gray-800 flex justify-between items-center h-16 px-5 w-full text-orange-400 font-semibold">
          <p>PRODUCT</p>
          <button
            onClick={openAddModal}
            className="bg-orange-400 text-white py-1 px-2 rounded flex items-center gap-1 hover:bg-orange-500"
          >
            <FaPlus />
            Product
          </button>
        </div>

        {products.map(product => (
          <div key={product._id} className="flex justify-between items-center py-4 px-5 border-b border-gray-800">
            <p className="font-semibold">{product.name}</p>

            <div className="flex ">
              <NavLink to={`/edit-product/${product._id}`}>
                <button title="Edit Product" className="mr-2 flex items-center gap-2 py-1 px-2 text-white bg-orange-400 rounded-md">
                  <FaPencilAlt />
                </button>
              </NavLink>

              <button title="Delete Product" className="flex items-center gap-2 py-1 px-2 text-red-600 bg-red-200 rounded-md" onClick={() => openDeleteModal(product._id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        <DeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={confirmDeleteProduct} // Pass the confirmation function
        />
      </div>
    </section>
  );
}

export default Products;
