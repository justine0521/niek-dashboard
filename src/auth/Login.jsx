import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/');
      onLogin();
    }
  }, [navigate, onLogin]);

  const handleLogin = () => {
    axios.post('http://localhost:3004/api/admin/login', { email, password })
      .then(response => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', response.data.token); 
        onLogin(); 
        navigate('/'); 
      })
      .catch(error => {
        console.error('Login failed:', error);
        setError('Invalid email or password');
      });
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center hidden">
          <p className="text-sm">
            Don't have an account?{' '}
            <NavLink to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
