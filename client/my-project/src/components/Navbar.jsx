import axios from 'axios';
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  // const handleLogout =async ()=>{
  //   try {
  //      await axios.get(
  //       'http://localhost:3002/logout'
  //     ).then(()=>{
  //       console.log("successful logout");
  //       navigate('/customersinfo');
  //     }).catch((e)=>{
  //       console.log(e);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     console.log("error in logout");
  //   }
  // }
    const adminLogedin = localStorage.getItem('admin');
    const navigate =useNavigate();

  const handleLogout = async ()=>{
       try{
              localStorage.removeItem('admin');
              navigate('/login');
              window.location.reload();
       }catch(e){
             console.log(e);
       }
  }
   const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
       <nav className="flex items-center justify-between flex-wrap px-2 sm:p-2 py-2 bg-navy text-orange-600 font-Ubuntu">
     {/* <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
       {/* <img src={locofy} className="w-100 h-10 mr-2" alt="Logo" /> 
     </div>  */}
    
     <div className="block lg:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
       >
         <svg
           className={`fill-current h-4 w-4 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current h-4 w-4 ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
         </svg>
       </button>
     </div>
     <div
       className={`w-full block flex-grow lg:flex lg:items-center  lg:w-auto ${isOpen ? "block" : "hidden"}`}
     >
       <div className="text-sm lg:flex-grow my-4 sm:my-0 sm:flex sm:justify-start relative" >
         <NavLink to={'/customersinfo'}
         style={({ isActive }) => ({
                                backgroundColor: isActive
                                    && "#200E3A",
                                    color: isActive && "white",
                                    fontStyle: isActive && "bold",      
                            })}
          className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4  p-2 sm:p-3 bg-orange-600 text-navy rounded-md w-fit">
           View Customers
         </NavLink>
         <NavLink to={'/register'}
          style={({ isActive }) => ({
                                backgroundColor: isActive
                                    && "#200E3A",
                                    color: isActive && "white",
                                    fontStyle: isActive && "bold",      
                            })}
         className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 p-2 sm:p-3 bg-orange-600 text-navy rounded-md w-fit">
           Register User
         </NavLink>
         {/* <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
           Third Link
         </a>
         <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
           Fourth Link
         </a> */}
         <div className='text-orange-600 font-bold hidden sm:flex sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2  sm:h-full sm:w-fit sm:justify-center sm:items-center sm:text-2xl'>
            Library Admin Portal
       </div>
       </div>
       
       <div>
         <button onClick={handleLogout} className="inline-flex items-center bg-red-500 border-0 py-2 px-4 text-white rounded-md">
           Logout
         </button>
       </div>
     </div>
   </nav>          
    </div>
  )
}

export default Navbar