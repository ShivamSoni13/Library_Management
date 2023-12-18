import React from 'react'

function RegisterUser() {
  return (
    <div className=' h-screen bg-slate-200'>
       <header className='text-center text-3xl sm:text-6xl'>Register a new Customer</header>

       <form action="" className='border-2 border-yellow-300  px-3 sm:px-2 bg-white flex flex-col  sm:w-1/3 w-full mx-auto sm:mt-10 py-5 sm:py-10 sm:rounded-md z-10 '>
        
        {/* <div className='bg-yellow-300 w-full sm:h-2 absolute top-0 right-0.5'></div> */}
        <div className=' sm:border-none my-2 flex flex-col sm:flex sm:flex-row '>
        <label htmlFor="" className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg '>Name</label>
         <input type="text" className=' border sm:w-full  p-1 rounded-md sm:rounded-none' placeholder='enter customer name' />
        </div>

       <div className=' sm:border-none my-2 flex flex-col sm:flex sm:flex-row '>
         <label htmlFor="" className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg '>Email</label>
         <input type="email" className='  border sm:w-full p-1 rounded-md sm:rounded-none' placeholder='enter customer email'/>
       </div>

        <div className='sm:border-none my-2 flex flex-col sm:flex sm:flex-row '>
            <label htmlFor="" className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg'>Age</label>
         <input type="number" className='  border sm:w-full p-1 rounded-md sm:rounded-none' placeholder='enter customer age' />
        </div>

        <div className='sm:border-none my-2 flex flex-col sm:flex sm:flex-row '>
            <label htmlFor="" className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg'>Address</label>
         <input type="text" className='  border sm:w-full p-1 rounded-md sm:rounded-none' placeholder='enter customer address '/>
        </div>

        <div className='sm:border-none my-2 flex flex-col sm:flex sm:flex-row '>
            <label htmlFor="" className='sm:flex w-1/5 sm:items-center sm:justify-start text-xs sm:text-lg '>Phone</label>
         <input type="number" className='border sm:w-full p-1 rounded-md sm:rounded-none'  placeholder='enter customer phone number'/>
        </div>

        <div className='flex justify-center py-2'><button className='border bg-yellow-300 text-white p-2 w-1/3 rounded-md sm:w-28'>Register</button></div>
       </form>

    </div>
  )
}

export default RegisterUser