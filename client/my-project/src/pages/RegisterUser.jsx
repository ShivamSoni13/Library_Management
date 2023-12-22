import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRequest } from '../util/requestMethod';
import Navbar from '../components/Navbar';

const RegisterUser = () => {
  const formFields = [
    { label: 'Name', type: 'text', name: 'username', placeholder: 'Enter customer name' },
    { label: 'Father', type: 'text', name: 'father', placeholder: 'Enter Father name' },
    { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter customer email' },
    { label: 'Age', type: 'number', name: 'age', placeholder: 'Enter customer age' },
    { label: 'Address', type: 'text', name: 'address', placeholder: 'Enter customer address' },
    { label: 'Phone', type: 'number', name: 'phone', placeholder: 'Enter customer phone number' },
  ];

  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await userRequest.post('/register',formData).then(()=>{
        toast.success('User Registered Successfully');
              navigate('/customersinfo');
              setFormData(formFields.reduce((acc, field) => {
                  acc[field.name] = '';
                  return acc;
                }, {}));
              }).catch(()=>{
                toast.error('Error Registering User');
                console.log('Error Registering User');
              })

      // if (response.status === 201) {
      //   toast.success('User Registered Successfully');
      //   navigate('/customersinfo');
      //   setFormData(formFields.reduce((acc, field) => {
      //     acc[field.name] = '';
      //     return acc;
      //   }, {}));
      // } else {
      //   toast.error('Error Registering User');
      // }
    } catch (error) {
      //console.error('Error Registering User:', error);
  
      // Log more details about the error
      console.log('Error Details:', error.response);
  
      //toast.error('Error Registering User');
    }
  };

  return (
    <div className='bg-khaki'>
      <div>
        <Navbar/>
      </div>

       <div className='  sm:h-screen  sm:flex sm:justify-center sm:items-center'>

      <form
        className=' bg-slate-50 flex flex-col sm:w-3/5 w-full mx-auto sm:mt-10 sm:drop-shadow-lg sm:blur-none shadow-black  sm:rounded-md z-10 sm:h-3/4 '
      >
      <header className='text-center text-3xl sm:text-5xl py-3 bg-navy text-orange-600 sm:rounded-t-md'>Register a New Customer</header>
        <div className='sm:my-3 sm:px-10 px-5'>
          {formFields.map((field) => (
          <div key={field.name} className='sm:border-none my-2 flex flex-col sm:flex sm:flex-row '>
            <label
              htmlFor={field.name}
              className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg'
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              className='border sm:w-full p-1 rounded-md sm:rounded-sm'
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        </div>

        <div className='flex justify-center py-2  sm:mt-0'>
          <button className='border bg-navy text-orange-600 p-2 w-1/3 rounded-md sm:w-28' type='submit' onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>
             </div>


      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default RegisterUser;
