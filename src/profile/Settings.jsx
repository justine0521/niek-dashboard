import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { IoSettingsSharp } from "react-icons/io5";

function Settings({ isOpen }) {
  const [shippingFee, setShippingFee] = useState('');
  const [popularShoes, setPopularShoes] = useState([]);

  useEffect(() => {
    fetchShippingFee();
    fetchPopularShoes();
  }, []);

  const fetchShippingFee = async () => {
    try {
      const response = await axios.get('http://localhost:3004/api/shipping-fee');
      setShippingFee(response.data.fee.toString());
    } catch (error) {
      console.error('Error fetching shipping fee:', error);
    }
  };

  const handleSaveShippingFee = async () => {
    try {
      await axios.put('http://localhost:3004/api/shipping-fee', { fee: parseFloat(shippingFee) });
      alert('Shipping fee updated successfully');
    } catch (error) {
      console.error('Error saving shipping fee:', error);
    }
  };

  const fetchPopularShoes = async () => {
    try {
      const response = await axios.get('http://localhost:3004/api/popular-shoes');
      console.log('Popular Shoes Response:', response.data);
      setPopularShoes(response.data);
    } catch (error) {
      console.error('Error fetching popular shoes:', error);
    }
  };  
  
  const handleAddShoes = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append('photo', files[0]);

    try {
      const response = await axios.post('http://localhost:3004/api/popular-shoes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPopularShoes([...popularShoes, response.data]);
    } catch (error) {
      console.error('Error adding popular shoe:', error);
    }
  };

  const handleDeleteShoes = async (shoeId) => {
    try {
      await axios.delete(`http://localhost:3004/api/popular-shoes/${shoeId}`);
      setPopularShoes(popularShoes.filter(shoe => shoe._id !== shoeId));
    } catch (error) {
      console.error('Error deleting popular shoe:', error);
    }
  };

  return (
    <section className={`h-screen mt-14 p-7 overflow-auto scrollnone relative transition-all ${isOpen ? 'w-screen' : ''}`}>
      <div className="bg-gray-100 p-5">
        <p className='font-semibold text-2xl mb-5 flex items-center gap-1'><IoSettingsSharp /> Settings</p>
        
        <div className='flex flex-col gap-2'>
          <label htmlFor="shippingFee" className='font-semibold'>Shipping Price</label>
          <input
            type="text"
            id="shippingFee"
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value)}
            className='p-1 border-2 border-gray-400 rounded'
          />
          <button onClick={handleSaveShippingFee} className='bg-blue-500 text-white p-2 rounded'>Save Shipping Fee</button>
        </div>

        <div className="flex flex-col gap-2 my-5">
          <label className="font-semibold">Popular Shoes</label>

          <div className="flex flex-wrap gap-3">
            {popularShoes.map((shoe) => (
              <div key={shoe._id} className="relative">
                <img src={`http://localhost:3004/uploads/${shoe.photoUrl}`} alt={shoe.photoUrl} className="h-24 w-24 bg-gray-400 rounded"/>

                <button type="button" className="absolute top-1 right-1 text-gray-900" onClick={() => handleDeleteShoes(shoe._id)}>
                  <FaTimes />
                </button>
              </div>
            ))}

            <input type="file" className="hidden" id="photo-upload" accept="image/*" onChange={handleAddShoes}/>

            <label htmlFor="photo-upload" className="h-24 w-24 text-sm text-gray-800 bg-gray-400 flex flex-col items-center justify-center rounded cursor-pointer">
              <BiImageAdd className="text-4xl" />
              Add image
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
