import React, { useState } from 'react';

const RegisterUser = () => {
  const formFields = [
    { label: 'Name', type: 'text', name: 'name', placeholder: 'enter customer name' },
    { label: 'Email', type: 'email', name: 'email', placeholder: 'enter customer email' },
    { label: 'Age', type: 'number', name: 'age', placeholder: 'enter customer age' },
    { label: 'Address', type: 'text', name: 'address', placeholder: 'enter customer address' },
    { label: 'Phone', type: 'number', name: 'phone', placeholder: 'enter customer phone number' },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='h-screen bg-slate-200'>
      <header className='text-center text-3xl sm:text-6xl'>Register a new Customer</header>

      <form
        onSubmit={handleSubmit}
        className='border-2 border-yellow-300 px-3 sm:px-2 bg-white flex flex-col sm:w-1/3 w-full mx-auto sm:mt-10 py-5 sm:py-10 sm:rounded-md z-10'
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
            />
          </div>
        ))}

        <div className='flex justify-center py-2'>
          <button className='border bg-yellow-300 text-white p-2 w-1/3 rounded-md sm:w-28' type='submit'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
