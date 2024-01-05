import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgIcon from '../../imageIcon.png';
import { userRequest } from '../util/requestMethod';
import { useParams } from 'react-router-dom';
import UpdateDetails from './UpdateDetails';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import FeeModal from '../components/FeeModal';

const IdentificationPage = () => {
  const [identity, setIdentity] = useState({});
  const { customerId } = useParams();
  const [updateMode, setUpdateMode] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [feeInput, setFeeInput] = useState('');

  const handleUpdateDetails = async (updatedData) => {
    try {
      const response = await userRequest.put(`/update-user/${customerId}`, updatedData);
      setIdentity(response.data.user);
      setUpdateMode(false);
      toast.success('Details Updated Successfully');
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error('Error updating user details');
    }
  };

  const handlePayFee = () => {
    setShowFeeModal(true);
  };

  const confirmFeePayment = async () => {
    setShowFeeModal(false);

    const feeAmount = parseFloat(feeInput);
    if (isNaN(feeAmount) || feeAmount <= 0) {
      toast.error('Invalid fee amount entered. Fee payment canceled.');
      return;
    }

    const isConfirmed = window.confirm(`Are you sure you want to mark ${feeAmount} as paid for this user?`);

    if (!isConfirmed) {
      return; // User canceled the fee payment
    }

    try {
      if(identity.feePaid === identity.totalFee){
          toast.error('Fee already Paid');
        }else if(feeAmount+identity.feePaid > identity.totalFee){
         toast.error('Amount is more than total fee');
        }else {
      const response = await userRequest.put(`/update-fee-status/${customerId}`, {
        feeStatus: true,
       feePaid: feeAmount +identity.feePaid  ,
      });

      if (response.status === 200) {
        toast.success('Fee Updated Successfully');
        setIdentity((prevIdentity) => ({
          ...prevIdentity,
          feeStatus: true,
          feePaid: feeAmount +identity.feePaid  ,
        }));
      } else {
        toast.error('Error updating fee status');
      }
    }
    } catch (error) {
      console.error('Error updating fee status:', error);
      toast.error('Error updating fee status');
    }
  };

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
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
    const fetchData = async () => {
      try {
        const data = await userRequest.get(`/user/${customerId}`);
        setIdentity(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [customerId]);

   // To Renew the Subscription
  const handleRenewSubscription = async () => {
    try {
      // Show an alert before renewing subscription
      const isConfirmed = window.confirm('Are you sure you want to renew the subscription and reset the fee?');

      if (!isConfirmed) {
        return; // If the admin cancels the action
      }

      // Reset feePaid to 0 and feeStatus to false
      const response = await userRequest.put(`/update-fee-status/${customerId}`, {
        feeStatus: false,
        feePaid: 0,
      });

      const response2=await userRequest.put(`/update-user/${customerId}`,{
        subscriptionDate: Date.now(),
      })

      if (response.status && response2.status === 200) {
        //const renewedSubscriptionDate = dayjs().format('DD/MM/YYYY');
        //const renewedSubscriptionEndDate = dayjs().add(30, 'days').format('DD/MM/YYYY');

        // setIdentity((prevIdentity) => ({
        //   ...prevIdentity,
        //   subscriptionDate: Date.now(),
        //  // subscriptionEndDate: renewedSubscriptionEndDate,
        //   feeStatus: false,
        //   feePaid: 0,
        // }));
         
        toast.success('Subscription Renewed Successfully, Fee status reset.');
      } else {
        toast.error('Error renewing subscription');
      }
    } catch (error) {
      console.error('Error renewing subscription:', error);
      toast.error('Error renewing subscription');
    }
  };



  return (
    <div className='bg-khaki'>
      <div>
        <Navbar />
      </div>
      <div className='sm:border sm:drop-shadow-lg sm:border-black flex flex-col sm:flex sm:flex-row sm:my-5 sm:mx-40 sm:p-10 sm:justify-around'>
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
            <span>{dayjs(identity.createdAt).format('DD/MM/YYYY')}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Subscription  Starts On :</label>
            <span>{dayjs(identity.subscriptionDate).format('DD/MM/YYYY')}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Subscription Ending on :</label>
            <span>{dayjs(identity.subscriptionDate).add(30,'days').format('DD/MM/YYYY')}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Shift :</label>
            <span>{identity.shift}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Fee Paid :</label>
            <span>{identity.feePaid}</span>
          </div>
          <div className='sm:flex  sm:w-full my-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Total Fees :</label>
            <span>{identity.totalFee}</span>
          </div>
          <div className='sm:flex  sm:w-full mt-2'>
            <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Fee Status :</label>
            <span className={`${identity.feePaid === identity.totalFee ? 'text-green-400' : 'text-red-400'} bg-white font-bold`}>
              {identity.feePaid === identity.totalFee ? "Paid" : "Pending/Not Paid"}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-5 py-4 sm:w-full sm:flex-row sm:flex sm:justify-center sm:gap-10'>
        <button onClick={() => setUpdateMode(true)} className='bg-gray-400 text-white p-3 rounded-md hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out w-1/3 sm:w-1/6'>
          Update
        </button>
        <button onClick={handlePayFee} className='bg-green-600 text-white p-3 rounded-md hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out w-1/3 sm:w-1/6'>
          Pay Fee
        </button>
        <button onClick={handleRenewSubscription} className='bg-blue-400 text-white p-3 rounded-md hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out w-1/3 sm:w-1/6'>
        Renew Subscription
        </button>
        <button onClick={handleDeleteUser} className='bg-red-600 text-white p-3 rounded-md hover:font-bold sm:hover:scale-110 transition duration-300 ease-in-out w-1/3 sm:w-1/6'>
          Delete User
        </button>
      </div>

      {updateMode && <UpdateDetails onUpdate={handleUpdateDetails} />}

      <FeeModal
        showFeeModal={showFeeModal}
        setShowFeeModal={setShowFeeModal}
        feeInput={feeInput}
        setFeeInput={setFeeInput}
        confirmFeePayment={confirmFeePayment}
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default IdentificationPage;
