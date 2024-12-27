import React, { useState } from 'react';
import axios from 'axios';
import { BiImageAdd } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

function AddProductModal({ isOpen, onClose }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);

    photos.forEach((photo, index) => {
      formData.append('photos', photo);
    });

    try {
      const response = await axios.post('http://localhost:3004/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
      onClose(); // Close the modal on successful addition
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (display message or retry logic)
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 pt-16 overflow-auto">
      <div className="bg-white px-3 py-5 w-4/5 h-fit rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4 pb-3 px-5 border-b-2 border-gray-400">
          <p className="text-lg font-semibold">Add Product</p>

          <button onClick={onClose} className="text-gray-600 text-xl hover:text-gray-900">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleAddProduct}>
          <div className='flex flex-col gap-2 mx-5'>
            <label htmlFor="product-name" className='font-semibold'>
              Product name
            </label>
            <input type="text" name='product-name' id='product-name' value={productName} onChange={(e) => setProductName(e.target.value)} className='p-2 border-2 border-gray-400 rounded'/>
          </div>

          <div className='flex flex-col gap-2 mx-5 mt-2'>
            <label htmlFor="category" className='font-semibold'>
              Category
            </label>
            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className='p-2 border-2 border-gray-400 rounded'>
              <option value="">Select Category</option>
              <option value="men">Men's</option>
              <option value="women">Women's</option>
              <option value="kids">Kid's</option>
            </select>
          </div>

          <div className='flex flex-col gap-2 mx-5 mt-2'>
            <label className='font-semibold'>Photos</label>
            <div className='flex flex-wrap gap-3'>
              {photos.map((photo, index) => (
                <div key={index} className='relative'>
                  <img src={URL.createObjectURL(photo)} alt={`image-${index}`} className='h-24 w-24 bg-gray-400 rounded' />

                  <button type="button" onClick={() => removePhoto(index)} className="absolute top-1 right-1 text-gray-900">
                    <FaTimes />
                  </button>
                </div>
              ))}

              <input type="file" className="hidden" id="photo-upload" accept="image/*" multiple onChange={handlePhotoChange}/>
              <label htmlFor="photo-upload" className='h-24 w-24 text-sm text-gray-800 bg-gray-400 flex flex-col items-center justify-center rounded cursor-pointer'>
                <BiImageAdd className="text-4xl" />
                Add image
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 mx-5 mt-2">
            <label htmlFor="description" className='font-semibold'>
              Description
            </label>

            <textarea name="description" id="description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className='p-2 border-2 border-gray-400 rounded'/>
          </div>

          <div className="flex flex-col gap-2 mx-5 mt-2">
            <label htmlFor="price" className='font-semibold'>
              Price
            </label>

            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border-2 border-gray-400 rounded"/>
          </div>

          <div className="flex justify-start mx-5 mt-3">
            <button type="submit" className="bg-gray-800 text-white py-1 px-3 rounded transition-all delay-75 hover:bg-orange-400">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddProductModal;
