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
        <div onClick={()=>(navigate("/identity/"+id))} className={`${feeStatus?'bg-green-300':'bg-red-400'} flex  border-2 justify-around py-2 rounded-md sm:mx-2 sm:my-2 cursor-pointer`}>
            <AccountCircleIcon/>
            <span>{name}</span>
            <span>{phone}</span>
        </div>
    </div>
  )
}

export default CustomerCard;