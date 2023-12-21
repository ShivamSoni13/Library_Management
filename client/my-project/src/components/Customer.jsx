import React, { useContext, useEffect } from 'react'
import CustomerCard from './CustomerCard'
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Customer() {
const {customers}=useContext(UserContext);
    const {filter}=useContext(UserContext);

// useEffect(()=>{
//     console.log(customers);
// },[])

// const navigate=useNavigate();
// const funcHandler =()=>(
//     navigate(/)
// )

  return (
    <div className='flex flex-col w-full sm:flex-row sm:px-10 sm:justify-around sm:mt-5  h-screen sm:pt-10 px-5 gap-4'>
        <div className=' border sm:drop-shadow-lg blur-0  sm:h-3/4 sm:w-1/3 overflow-auto relative bg-orange-50'>
           
            <header className='text-center text-xl py-1 sticky top-0 bg-navy text-orange-600 border font-bold'>All customers list</header>
            {/* <hr className='border-black '/> */}
              {
               customers.filter((data)=>data.username.toLowerCase().includes(filter.toLowerCase())).map((prop)=>(
               
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
        <div className=' border sm:drop-shadow-lg blur-0 sm:w-1/3 sm:h-fit overflow-auto relative bg-orange-50 '>
                        <header className='text-center text-xl py-1 sticky top-0 bg-navy text-orange-600 border font-bold'>Fee not Paid</header>
                        {/* <hr className='border-black'/> */}
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