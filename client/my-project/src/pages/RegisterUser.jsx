import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRequest } from '../util/requestMethod';
import Navbar from '../components/Navbar';

const RegisterUser = () => {
  const formFields = [
    { label: 'Name', type: 'text', name: 'username', placeholder: 'Enter customer name' },
    { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter customer email' },
    { label: 'Age', type: 'number', name: 'age', placeholder: 'Enter customer age' },
    { label: 'Address', type: 'text', name: 'address', placeholder: 'Enter customer address' },
    { label: 'Phone', type: 'tel', name: 'phone', placeholder: 'Enter customer phone number' },
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

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isAgeValid = (age) => {
    const ageInt = parseInt(age, 10);
    return !isNaN(ageInt) && ageInt > 0;
  };

  const isPhoneValid = (phone) => {
    // Simple phone number validation: must be numeric and at least 10 digits
    return /^[0-9]{10,}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!isEmailValid(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    // Validate age
    if (!isAgeValid(formData.age)) {
      toast.error('Invalid age');
      return;
    }

    // Validate phone number
    if (!isPhoneValid(formData.phone)) {
      toast.error('Invalid phone number');
      return;
    }

    // Check if any required field is missing
    const missingFields = formFields.filter((field) => !formData[field.name]);
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await userRequest.post('/register', formData).then(() => {
        toast.success('Registration Successful');
        navigate('/customersinfo');
        setFormData(
          formFields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
          }, {})
        );
      }).catch(() => {
        toast.error('Error Registering User');
        console.log('Error Registering User');
      })
    } catch (error) {
      console.log('Error Details:', error.response);
      toast.error('Error Registering User');
    }
  };

  return (
    <div className='h-full bg-slate-200 sm:py-4'>
      <div>
        <Navbar/>
      </div>
      <header className='text-center text-3xl sm:text-6xl my-5'>Register a New Customer</header>

      <form
        className='border-2 border-yellow-300 px-3 sm:px-2 bg-white flex flex-col sm:w-1/3 w-full mx-auto sm:mt-10 py-5 sm:py-10 sm:rounded-md z-10 '
      >
        {formFields.map((field) => (
          <div key={field.name} className='sm:border-none my-2 flex flex-col sm:flex sm:flex-row'>
            <label
              htmlFor={field.name}
              className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg'
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              className='border sm:w-full p-1 rounded-md sm:rounded-none'
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className='flex justify-center py-2'>
          <button className='border bg-yellow-300 text-white p-2 w-1/3 rounded-md sm:w-28' type='submit' onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default RegisterUser;
