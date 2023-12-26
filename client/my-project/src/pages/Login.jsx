import React, { useState, useEffect } from 'react';
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
      

      //console.log(response.data);

      // Check if the user is logged in
      if (response.data.isLoggedIn) {
        // Redirect to the Register User page after successful login

        navigate('/customersinfo');
        window.location.reload();
      localStorage.setItem('admin',JSON.stringify(response.data))
      // } else if(response.data.isLoggedIn && window.location.pathname.slice(-6)==='/login'){
       }
      else{
        // Handle logout or other actions
        // Clear local storage or perform other actions
       localStorage.removeItem('admin');
        // Display a message or redirect to the login page
        toast.info('You have been logged out');
        navigate('/login');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
    }
  };

  // // Check local storage on component mount
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn');

  //   if (isLoggedIn) {
  //     // Clear local storage or perform other actions
  //     localStorage.removeItem('isLoggedIn');
  //     // Display a message or redirect to the login page
  //     toast.info('You have been logged out');
  //     navigate('/login');
  //   }
  // }, []);

  const formFields = [
    { name: 'username', label: 'Email/Username', type: 'text', placeholder: 'enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'enter your password' },
  ];

  return (
    <div className='h-screen bg-img bg-cover bg-center flex justify-center items-center overflow-x-hidden px-1 '>
      <div className='h-fit w-full sm:w-2/5 sm:mx-auto sm:overflow-hidden  sm:rounded-md bg-khaki backdrop-brightness-75'>
        <header className='text-center text-4xl  bg-navy font-bold text-orange-600 py-5'>Admin Login</header>
        <form className='mx-5 flex flex-col my-3 font-Ubuntu'>
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
              className='bg-orange-800 font-bold text-white px-3 py-2 text-2xl rounded-sm '
            >
              Login
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
