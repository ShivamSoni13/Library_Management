import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import imgIcon from '../../imageIcon.png'
import axios from 'axios';
import { userRequest } from '../util/requestMethod';
import { useParams } from 'react-router-dom';

function IdentificationPage() {
    const [identity,setIdentity]=useState([])
    const {customerId}=useParams();
    useEffect(()=>{
      const fetchData = ()=>{
          userRequest.get("/user/"+customerId).then((data)=>{
           const user=data.data;
           //console.log(user);
           setIdentity(user);
          }).catch((e)=>{
            console.log(e);
          })
      }
      fetchData();
    },[])
  return (
    <div>
        <div className='border border-black flex flex-col sm:flex sm:flex-row sm:my-5 sm:mx-40 sm:p-10  sm:justify-around '>
         <div className='sm:w-1/4 border flex justify-center items-center w-full sm:h-56 '><img className='sm:h-full' src={imgIcon} alt="imageIcon" /></div>
         {/* <div className=' sm:h- w-1 border-black border-2'></div> */}
         <div className='sm:w-1/2 border sm:flex sm:flex-col sm:items-center sm:p-2  sm:h-fit'>
              <div className='sm:flex border  sm:w-full   my-2'>
                <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Name :</label> 
                <span > {identity.username}</span>
                </div> 
              <div className='sm:flex border  sm:w-full   my-2'>
                <label className='font-bold w-1/2  flex justify-start sm:pl-2'>Phone :</label> 
                <span > {identity.phone}</span>
                </div> 
              <div className='sm:flex border  sm:w-full   my-2'>
                <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Email :</label> 
                <span > {identity.email}</span>
                </div> 
              <div className='sm:flex border  sm:w-full   my-2'>
                <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Age :</label> 
                <span > {identity.age}</span>
                </div> 
              <div className='sm:flex border  sm:w-full   my-2'>
                <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Address :</label> 
                <span >{ identity.address}</span>
                </div> 
              <div className='sm:flex border  sm:w-full   my-2'>
                <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Registration Date :</label> 
                <span > {identity.updatedAt}</span>
                </div> 

              <div className='sm:flex border  sm:w-full   mt-2'>
                <label className='font-bold w-1/2 flex justify-start sm:pl-2'>Fee Status :</label> 
                <span className={`${(identity.feeStatus)?'text-green-400':'text-red-400'}`} >{(identity.feeStatus)?"Paid":"Pending/Not Paid"}</span>
                </div> 
         </div>
    </div>

       <div className='sm:w-full  sm:flex sm:justify-center sm:gap-10 sm:mt-14 '>
        <button className='bg-blue-400 text-white p-2 rounded-md'>Update details</button>
        <button className='bg-green-600 text-white px-5 rounded-md'>Pay Fee</button>
       </div>

    </div>
  )
}

export default IdentificationPage