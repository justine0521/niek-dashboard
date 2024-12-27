import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSignup = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:3004/api/admin/signup', {
        name,
        email,
        password,
        phoneNumber
      });
      setSuccessMessage('Admin signed up successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setErrors({});
    } catch (error) {
      console.error('Error signing up admin:', error);
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === 'Email already exists') {
          setErrors({ email: 'This email is already registered. Please use a different email.' });
        } else {
          setErrors({ general: 'Signup failed. Please try again later.' });
        }
      } else {
        setErrors({ general: 'Signup failed. Please try again later.' });
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value === confirmPassword) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value === password) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email || errors.general) {
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Signup</h2>
        <form className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.email ? 'border-red-500' : ''}`}
            />
            {(errors.email) && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.phoneNumber  ? 'border-red-500' : ''}`}
            />
            {(errors.phoneNumber) && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.password || errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.password || errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className='flex justify-center'>
            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition duration-300"
          >
            Signup
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {successMessage}
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
