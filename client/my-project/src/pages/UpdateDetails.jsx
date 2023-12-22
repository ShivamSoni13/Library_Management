import React, { useState } from 'react';

function UpdateDetails({ onUpdate }) {
  const [formData, setFormData] = useState({
    username: '',
    father: '',
    email: '',
    age: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="bg-khaki p-4 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-center ">Update User Details</h2>
      <form onSubmit={handleSubmit} className='sm:px-5'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Father:</label>
          <input
            type="text"
            name="father"
            value={formData.father}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-600"
        >
          Update Details
        </button>
      </form>
    </div>
  );
}

export default UpdateDetails;
