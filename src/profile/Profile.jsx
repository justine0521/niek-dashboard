import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../images/defaultProfile.png';

function Profile() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [imageUrl, setImageUrl] = useState(Icon);
  const fileInput = React.useRef(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Fetch admin data from the API
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
  
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
  
        const response = await axios.get('/api/admin/profile', config);
        console.log('Admin Data:', response.data);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Handle error (e.g., show error message)
      }
    };
  
    fetchAdminData();
  }, []);
  

  function handleEditProfileClick() {
    fileInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(Icon);
    }
  }

  return (
    <section className='mt-16 h-96 flex justify-between px-5 gap-5'>
      <div className="flex flex-col w-64 mt-5">
        <header className="flex flex-wrap items-center justify-between px-3 py-5 h-fit border-b border-gray-300">
          <img src={imageUrl} alt="Profile" className="w-14 h-14 rounded-full border" />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInput}
          />

          <button
            onClick={handleEditProfileClick}
            className="flex items-center bg-gray-800 text-sm text-white py-2 px-2 rounded-md mt-2"
          >
            Edit Profile
          </button>
        </header>

        <nav>
          <ul className="flex flex-col justify-center gap-3 mt-8 px-5">
            <p className="font-semibold">My Account</p>

            <button
              className={`${activeTab === 'Profile' ? 'text-orange-400' : 'hover:text-orange-400'} text-left`}
              onClick={() => setActiveTab('Profile')}
            >
              Profile
            </button>
            <button
              className={`${activeTab === 'Password' ? 'text-orange-400' : 'hover:text-orange-400'} text-left`}
              onClick={() => setActiveTab('Password')}
            >
              Change Password
            </button>
          </ul>
        </nav>
      </div>

      {activeTab === 'Profile' && adminData && (
        <div className="bg-gray-100 w-11/12 mt-5 px-8 mx-5">
          <header className="h-24 py-5 border-b">
            <p className="font-semibold text-lg">My Profile</p>
            <p className="text-sm text-gray-400">Manage your account</p>
          </header>

          <div className="py-8 text-gray-400 flex flex-col gap-5">
            <div className="flex items-center gap-x-[15%]">
              <p>Name</p>
              <input
                type="text"
                className="w-1/2 p-2 px-3 border border-gray-300 outline-none"
                defaultValue={adminData.name}
              />
            </div>

            <div className="flex items-center gap-x-[15%]">
              <p>Email</p>
              <input
                type="email"
                className="w-1/2 p-2 px-3 border border-gray-300 outline-none"
                defaultValue={adminData.email}
              />
            </div>

            <div className="flex items-center gap-x-[15%]">
              <p>Phone Number</p>
              <input
                type="text"
                className="w-1/2 p-2 px-3 border border-gray-300 outline-none"
                defaultValue={adminData.phoneNumber}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-gray-800 p-1 px-3 rounded text-white">Save</button>
          </div>
        </div>
      )}

      {activeTab === 'Password' && (
        <div className="bg-gray-100 w-11/12 mt-5 px-8 mx-5">
          <header className="h-24 py-5 border-b">
            <p className="font-semibold text-lg">Change Password</p>
            <p className="text-sm text-gray-400">Manage your account</p>
          </header>

          <form>
            <div className='flex justify-between p-3 mt-5'>
              <label className='font-semibold'>Current Password</label>
              <input
                type="password"
                className='w-2/4 border border-gray-300 outline-gray-800'
              />
            </div>

            <div className='flex justify-between p-3'>
              <label className='font-semibold'>New Password</label>
              <input
                type="password"
                className='w-2/4 border border-gray-300 outline-gray-800'
              />
            </div>

            <div className='flex justify-between p-3'>
              <label className='font-semibold'>Confirm New Password</label>
              <input
                type="password"
                className='w-2/4 border border-gray-300 outline-gray-800'
              />
            </div>

            <div className='flex justify-end p-3'>
              <button type="submit" className='bg-gray-800 px-2 py-1 rounded text-white'>Update Password</button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default Profile;
