import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Header from './components/Header';
import EditProduct from './edit/EditProduct';
import Profile from './profile/Profile';
import Settings from './profile/Settings';
import History from './components/History';
import Logout from './auth/Logout';
import Login from './auth/Login';
import Signup from './auth/Signup'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <main>
        {isLoggedIn ? (
          <>
            <Header onToggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />

            <div className={`main-content ${isSidebarOpen ? 'ml-56' : 'ml-20'} transition-all duration-300`}>
              <Routes>
                {/* Signup */}
                <Route path="/sign-up" element={<Signup />} />

                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/history" element={<History />} />

                {/* Edit Product */}
                <Route path="/edit-product/:id" element={<EditProduct isOpen={true} />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

              </Routes>
            </div>
          </>
        ) : (
          <Login onLogin={handleLogin}/>
        )}
      </main>
    </BrowserRouter>
  );
};

export default App;
