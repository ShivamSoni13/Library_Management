import React, { useState } from 'react';

function UpdateDetails({ onUpdate }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format Indian phone number as user types (e.g., +91 XXXXX-XXXXX)
    if (name === 'phone' && value.length <= 10) {
      const formattedPhone = value.replace(/(\d{5})(\d{5})/, '+91 $1-$2');
      setFormData({ ...formData, [name]: formattedPhone });
    }
    // Format email as user types and validate format
    else if (name === 'email') {
      setFormData({ ...formData, [name]: value });

      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, [name]: 'Invalid email format' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }
    // Format age as user types (e.g., restrict to two digits)
    else if (name === 'age' && /^\d{0,2}$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format before submitting
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrors({ ...errors, email: 'Invalid email format' });
      return;
    }

    onUpdate(formData);
  };
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-4">Update User Details</h2>
      <form onSubmit={handleSubmit}>
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
