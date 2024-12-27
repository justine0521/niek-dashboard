import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BiImageAdd } from 'react-icons/bi';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function EditProduct({ isOpen }) {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    photos: [],
    description: '',
    price: '',
  });
  const [newPhotos, setNewPhotos] = useState([]);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/products/${id}`);
        console.log('Fetched product data:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setNewPhotos([...newPhotos, ...files]);
  };

  const removePhoto = async (index, isExisting) => {
    try {
      if (isExisting) {
        const photoName = product.photos[index];
        await axios.delete(`http://localhost:3004/api/products/${id}/photo/${photoName}`);
        setProduct((prevProduct) => ({
          ...prevProduct,
          photos: prevProduct.photos.filter((_, i) => i !== index),
        }));
      } else {
        setNewPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('description', product.description);
      formData.append('price', product.price);
      newPhotos.forEach((photo) => formData.append('photos', photo));

      const response = await axios.put(`http://localhost:3004/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product updated:', response.data);
      setProduct(response.data);
      setNewPhotos([]); // Clear newPhotos state after successful save
      setEditSuccess(true); // Set edit success state
      setTimeout(() => {
        setEditSuccess(false); // Reset edit success state after a delay
      }, 3000); // Reset after 3 seconds
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className={`main-content h-screen mt-14 p-7 overflow-auto scrollnone relative transition-all ${isOpen ? '' : ''}`}>
      <div className="bg-gray-100">
        <div className="bg-gray-800 flex justify-between items-center h-16 px-5 w-full text-orange-400 font-semibold">
          <p>EDIT PRODUCT</p>
          <NavLink to="/products">
            <button className="flex items-center text-lg">
              <IoChevronBackOutline />
              Back
            </button>
          </NavLink>
        </div>

        <div className="flex flex-col gap-5 pt-5 pb-10">
          <div className="flex flex-col gap-2 mx-5">
            <label htmlFor="product-name" className="font-semibold">
              Product name
            </label>
            <input
              type="text"
              name="name"
              id="product-name"
              className="p-2"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2 mx-5">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="p-2"
              value={product.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="men">Men's</option>
              <option value="women">Women's</option>
              <option value="kids">Kid's</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 mx-5">
            <label className="font-semibold">Photos</label>

            <div className="flex flex-wrap gap-3">
              {product.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={`http://localhost:3004/uploads/${photo}`}
                    alt={`image-${index}`}
                    className="h-24 w-24 bg-gray-400 rounded"
                  />

                  <button
                    type="button"
                    onClick={() => removePhoto(index, true)}
                    className="absolute top-1 right-1 text-gray-900"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              {newPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`new-image-${index}`}
                    className="h-24 w-24 bg-gray-400 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index, false)}
                    className="absolute top-1 right-1 text-gray-900"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}

              <input
                type="file"
                className="hidden"
                id="photo-upload"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="photo-upload"
                className="h-24 w-24 text-sm text-gray-800 bg-gray-400 flex flex-col items-center justify-center rounded cursor-pointer"
              >
                <BiImageAdd className="text-4xl" />
                Add image
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 mx-5">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              className="p-2"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2 mx-5">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              className="p-2"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>

          {editSuccess && (
            <div className="flex justify-center mx-5">
              <p className="text-green-600 font-semibold">Product updated successfully!</p>
            </div>
          )}

          <div className="flex justify-start mx-5">
            <button
              className="bg-gray-800 text-white py-1 px-3 rounded transition-all delay-75 hover:bg-orange-400"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProduct;
