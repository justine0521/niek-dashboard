import React from 'react';
import { MdDashboard } from "react-icons/md";
import { IoLogoBitbucket } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`fixed left-0 top-0 bg-gray-900 h-screen text-white ${isOpen ? 'w-56' : 'w-18'} mt-14 z-10 transition-all delay-150 duration-1000`}>
      <ul className="py-4 px-2 text-lg">
        <NavLink to="/">
          {({ isActive }) => (
            <li className={`${isActive ? 'text-orange-400' : 'hover:text-orange-400'} py-2 px-2 hover:bg-gray-800 cursor-pointer flex items-center gap-3 rounded-xl`}>
              <MdDashboard />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Dashboard</span>
            </li>
          )}
        </NavLink>
        
        <NavLink to="/products">
          {({ isActive }) => (
            <li className={`${isActive ? 'text-orange-400' : 'hover:text-orange-400'} py-2 px-2 hover:bg-gray-800 cursor-pointer flex items-center gap-3 rounded-xl`}>
              <IoLogoBitbucket />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Products</span>
            </li>
          )}
        </NavLink>
        
        <NavLink to="/orders">
          {({ isActive }) => (
            <li className={`${isActive ? 'text-orange-400' : 'hover:text-orange-400'} py-2 px-2 hover:bg-gray-800 cursor-pointer flex items-center gap-3 rounded-xl`}>
              <BsCart4 />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>Orders</span>
            </li>
          )}
        </NavLink>

        {/* <NavLink to="/history">
          {({ isActive }) => (
            <li className={`${isActive ? 'text-orange-400' : 'hover:text-orange-400'} py-2 px-2 hover:bg-gray-800 cursor-pointer flex items-center gap-3 rounded-xl`}>
              <FaHistory />
              <span className={`${isOpen ? 'inline' : 'hidden'}`}>History</span>
            </li>
          )}
        </NavLink> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
