import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgIcon from '../../imageIcon.png';
import { userRequest } from '../util/requestMethod';
import { useParams } from 'react-router-dom';
import UpdateDetails from './UpdateDetails';
import Navbar from '../components/Navbar';

function IdentificationPage() {
  const [identity, setIdentity] = useState({});
  const { customerId } = useParams();
  const [updateMode, setUpdateMode] = useState(false);

  const handleUpdateDetails = async (updatedData) => {
    try {
      const response = await userRequest.put(`/update-user/${customerId}`, updatedData);
      console.log(response.data);
      setIdentity(response.data.user);
      setUpdateMode(false);
      toast.success('Details Updated Successfully');
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error('Error updating user details');
    }
  };

  const handlePayFee = async () => {
    // Display a confirmation window
    const isConfirmed = window.confirm('Are you sure you want to mark the fee as paid for this user?');

    if (!isConfirmed) {
      return; // User canceled the fee payment
    }

    try {
      const response = await userRequest.put(`/update-fee-status/${customerId}`, {
        feeStatus: true,
      });
  
      if (response.status === 200) {
        toast.success('Fee Paid Successfully');
        setIdentity((prevIdentity) => ({
          ...prevIdentity,
          feeStatus: true,
        }));
      } else {
        toast.error('Error updating fee status');
      }
    } catch (error) {
      console.error('Error updating fee status:', error);
      toast.error('Error updating fee status');
    }
  };

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    // Display a confirmation window
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');

    if (!isConfirmed) {
      return; // User canceled the deletion
    }

    try {
      const response = await userRequest.delete(`/delete-user/${customerId}`);
  
      if (response.status === 200) {
        toast.success('User Deleted Successfully');
        navigate('/customersinfo');
      } else {
        toast.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };
  
  useEffect(() => {
    const fetchData = () => {
      userRequest.get(`/user/${customerId}`).then((data) => {
        const user = data.data;
        setIdentity(user);
      }).catch((e) => {
        console.log(e);
      });
    };
    fetchData();
  }, [customerId]);

  return (
    <div className='bg-khaki'>
      <div>
        <Navbar/>
      </div>
      <div className='sm:border sm:drop-shadow-lg   sm:border-black flex flex-col sm:flex sm:flex-row sm:my-5 sm:mx-40 sm:p-10 sm:justify-around'>
        <div className='sm:w-1/4  flex justify-center items-center w-full sm:h-56'>
          <img className='sm:h-full w-1/2 sm:w-full' src={imgIcon} alt="imageIcon" />
        </div>
        <div className='sm:w-1/2  sm:flex sm:flex-col sm:items-center sm:p-2 sm:h-fit cursor-pointer'>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Name :</label>
            <span>{identity.username}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Father :</label>
            <span>{identity.father}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Phone :</label>
            <span>{identity.phone}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Email :</label>
            <span>{identity.email}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Age :</label>
            <span>{identity.age}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Address :</label>
            <span>{identity.address}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Registration Date :</label>
            <span>{identity.updatedAt}</span>
          </div>
          <div className='sm:flex  sm:w-full mt-2 '>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Fee Status :</label>
            <span className={`${identity.feeStatus ? 'text-green-400' : 'text-red-400'} bg-white font-bold`}>
              {identity.feeStatus ? "Paid" : "Pending/Not Paid"}
            </span>
          </div>
        </div>
      </div>
      <div className='flex  flex-col items-center gap-5 py-4  sm:w-full sm:flex-row sm:flex sm:justify-center sm:gap-10  '>
        <button onClick={() => setUpdateMode(true)} className='bg-blue-400 text-white p-3 rounded-md  hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out w-1/3 sm:w-1/6'>
          Update 
        </button>
        <button onClick={handlePayFee} className='bg-green-600 text-white p-3 rounded-md  hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out  w-1/3 sm:w-1/6'>
          Pay Fee
        </button>
        <button onClick={handleDeleteUser} className='bg-red-600 text-white p-3 rounded-md  hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out w-1/3 sm:w-1/6'>
          Delete User
        </button>
      </div>

      {updateMode && (
        <UpdateDetails onUpdate={handleUpdateDetails} />
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default IdentificationPage;
