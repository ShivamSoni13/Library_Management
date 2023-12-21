import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Navigate, useNavigate } from 'react-router-dom';

function CustomerCard({name,phone,feeStatus,id}) {
    const navigate=useNavigate();
    //  function customFunc(feeStatus) {
    //     if(feeStatus){
    //         className={'bg-green-400'}
    //     }else{
    //         className={'bg-red-400'}

    //     }
    // }
  return (
    <div>
        <div onClick={()=>(navigate("/identity/"+id))} className={`${feeStatus?'bg-green-300':'bg-red-400'} flex  py-2 rounded-sm sm:mx-2 sm:my-2 cursor-pointer my-1 mx-1`}>
            <AccountCircleIcon className='flex-1' />
            <span className='flex-1'>{name}</span>
            <span className='flex-1'>{phone}</span>
        </div>
    </div>
  )
}

export default CustomerCard;