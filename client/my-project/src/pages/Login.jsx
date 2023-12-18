import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3002/login', {
        username,
        password,
      }, { withCredentials: true, mode: 'cors' });

      console.log(response.data);
      toast.success('Login successful'); 
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
    }
  };

  return (
    <div className='h-full mt-20 py-5 mx-1 sm:border-2 sm:w-1/3 sm:mx-auto sm:overflow-hidden sm:mt-28 sm:rounded-md bg-blue-800'>
      <header className='text-center text-4xl my-5'>Admin Login</header>
      <form action='' className='mx-5 flex flex-col my-3 '>
        <div className='flex flex-col'>
          <label htmlFor=''>Email/Username</label>
          <input
            type='text'
            placeholder='enter your email'
            className='border p-2 outline-blue-500'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='flex flex-col mt-2'>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            placeholder='enter your password'
            className='border p-2 outline-blue-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

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
