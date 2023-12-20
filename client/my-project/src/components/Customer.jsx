import React, { useContext, useEffect } from 'react'
import CustomerCard from './CustomerCard'
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Customer() {
const {customers}=useContext(UserContext);
// useEffect(()=>{
//     console.log(customers);
// },[])

// const navigate=useNavigate();
// const funcHandler =()=>(
//     navigate(/)
// )

  return (
    <div className='flex w-full sm:px-10 sm:justify-around sm:mt-5 '>
        <div className=' border border-red-500  sm:min-h-fit sm:w-1/3'>
           
            <header className='text-center text-xl my-1'>All customers list</header>
            <hr className='border-black'/>
              {
               customers.map((prop)=>(
               
                    <CustomerCard  
                key={prop._id}
             name={prop.username}
             id={prop._id}
             address={prop.address}
             phone={prop.phone}
             feeStatus={prop.feeStatus}
                />       
  )) 
                
              }
        </div>
        <div className=' border border-red-500 sm:w-1/3 sm:h-fit'>
                        <header className='text-center text-xl my-1'>All Defaulters list</header>
                        <hr className='border-black'/>
             {
               customers.filter((data)=>(data.feeStatus===false)).map((prop)=>(
                     <CustomerCard 
                key={prop._id}
             name={prop.username}
             id={prop._id}
             address={prop.address}
             phone={prop.phone}
                />
  )) 
                
              }
        </div>
    </div>
  )
}

export default Customer