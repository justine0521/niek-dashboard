import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/check-logo-orange.png';
import Profile from '../images/defaultProfile.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/logout');
        break;
      default:
        break;
    }
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 px-10 h-16 flex justify-between items-center z-20">
      <div className='flex items-center gap-x-12'>
        <img src={Logo} alt="Niek" className='h-10' />
        <button onClick={onToggleSidebar}>
          <RxHamburgerMenu className='text-2xl text-orange-400' />
        </button>
      </div>

      <button onClick={() => toggleDropdown(1)}>
        <img src={Profile} alt="Profile" className='h-11 w-11 text-white rounded-full' />
      </button>

      {dropdownIndex === 1 && (
        <div className="absolute top-0 right-2 mt-14 w-48 bg-gray-800 border border-gray-300 rounded-md shadow-lg z-10">
          <button onClick={() => handleDropdown('profile')} className="flex items-center px-4 py-2 text-md text-orange-400 hover:bg-gray-100 w-full">
            <FaUserAlt className="mr-2" /> Profile
          </button>
          <button onClick={() => handleDropdown('settings')} className="flex items-center px-4 py-2 text-md text-blue-600 hover:bg-gray-100 w-full">
            <IoMdSettings className="mr-2" /> Settings
          </button>
          <button onClick={() => handleDropdown('logout')} className="flex items-center px-4 py-2 text-md text-red-600 hover:bg-gray-100 w-full">
            <BiLogOut className="mr-2" /> Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
