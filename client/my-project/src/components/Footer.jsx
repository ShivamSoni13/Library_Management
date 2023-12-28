import React from 'react'

function Footer() {
  return (
    <div className='h-full' >
<footer className="bg-white  shadow  dark:bg-gray-800 flex flex-col sm:flex-row text-orange-600 items-center justify-start">
    <ul className="flex flex-col flex-1 sm:pl-10 mt-3 sm:text-xl font-medium  sm:mt-0">
        <header className='text-orange-600 text-4xl sm:text-7xl font-bold'>Daksh library</header>
        <li>
            <span className="hover:underline me-4 md:me-6 ">Owner</span>
                <span>-</span>
        </li>
        <li>
            <span className="hover:underline me-4 md:me-6">Email</span>
            <span>-</span>
        </li>
        <li>
            <span  className="hover:underline me-4 md:me-6">Phone no.</span>
            <span>-</span>
        </li>
        <li>
            <span  className="hover:underline me-4 md:me-6">Address</span>
            <span>-</span>
        </li>
        
    </ul>
{/* Maps location */}
          <div className='  flex-1  hidden sm:flex sm:justify-center'>
            {/* <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.1587376424363!2d76.1345054!3d28.804343099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39126769af8ce3b9%3A0x8d86043f75178844!2sDaksh%20library%20Bhiwani!5e0!3m2!1sen!2sin!4v1703757285150!5m2!1sen!2sin"} width={"100vw"}height={"100vh"}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27969.269927980906!2d76.13450500000002!3d28.804343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39126769af8ce3b9%3A0x8d86043f75178844!2sDaksh%20library%20Bhiwani!5e0!3m2!1sen!2sin!4v1703758989086!5m2!1sen!2sin" width="600"  height="400" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className=' w-full flex sm:hidden '>
            {/* <iframe src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.1587376424363!2d76.1345054!3d28.804343099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39126769af8ce3b9%3A0x8d86043f75178844!2sDaksh%20library%20Bhiwani!5e0!3m2!1sen!2sin!4v1703757285150!5m2!1sen!2sin"} width={"100vw"}height={"100vh"}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27969.269927980906!2d76.13450500000002!3d28.804343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39126769af8ce3b9%3A0x8d86043f75178844!2sDaksh%20library%20Bhiwani!5e0!3m2!1sen!2sin!4v1703758989086!5m2!1sen!2sin"  height="200" style={{ border: "0",width:"100vw" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
    </footer>
   </div>
  )
}

export default Footer