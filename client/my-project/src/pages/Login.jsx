import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3002/login',
        formData,
        { withCredentials: true, mode: 'cors' }
      );

      console.log(response.data);
      toast.success('Login successful');

      // Redirect to the Register User page after successful login
      navigate('/customersinfo');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
    }
  };

  const formFields = [
    { name: 'username', label: 'Email/Username', type: 'text', placeholder: 'enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'enter your password' },
  ];

  return (
    <div className='h-full mt-20 py-5 mx-1 sm:border-2 sm:w-1/3 sm:mx-auto sm:overflow-hidden sm:mt-28 sm:rounded-md bg-blue-800'>
      <header className='text-center text-4xl my-5'>Admin Login</header>
      <form className='mx-5 flex flex-col my-3'>
        {formFields.map((field) => (
          <div key={field.name} className='flex flex-col mt-2'>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              className='border p-2 outline-blue-500'
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <div className='flex justify-center items-center mt-5'>
          <button
            type='button'
            onClick={handleLogin}
            className='bg-blue-500 font-bold text-white px-3 py-2 text-2xl rounded-sm'
          >
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
