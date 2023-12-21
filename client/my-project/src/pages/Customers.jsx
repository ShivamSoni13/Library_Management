import React, { useContext, useEffect, useState } from 'react'
import SearchCustomer from '../components/SearchCustomer'
import Customer from '../components/Customer'
import axios from 'axios';
import { userRequest } from '../util/requestMethod';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';


function Customers() {

    //const[customers,setCustomers]=useState([]);
    const {customers,setCustomers,filter}=useContext(UserContext);
    useEffect(()=>{
        const fetchData= async ()=>{
            const response= await userRequest.get("/user").then((prop)=>{
              setCustomers(prop.data);
              //console.log(customers);
            }).catch((e)=>{
              console.log(e);
            })
        }
        fetchData();
    },[])
 
  return (
    <div className='bg-khaki'>
      <div>
        <Navbar/>
      </div>
        <div>
            <SearchCustomer/>
        </div>
            <header className='text-3xl text-center my-5 sm:my-0 sm:pt-3'>Customers</header>
        <div>
            <Customer key={customers._id}
             name={customers.username}
             id={customers._id}
             address={customers.address}
             phone={customers.phone}
              />
        </div>
    </div>
  )
}

export default Customers