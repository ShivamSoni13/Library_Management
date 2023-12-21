import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

function SearchCustomer() {
      const {filter,setFilter}=useContext(UserContext);
  return (
    <div>
        <form className='mt-10 sm:w-1/2 sm:mx-auto mx-5 '>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none sm:my-0 border-r border-gray-400 px-3">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" className="block w-full p-3 ps-12 text-xl text-gray-900 rounded-xl bg-gray-50  outline-none" placeholder="Search any Customer" required  value={filter} onChange={(e)=>{e.preventDefault,setFilter(e.target.value)}}/>
        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Search</button> */}
    </div>
</form>
    </div>
  )
}

export default SearchCustomer