import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Footer from '../components/Footer';
import SimpleImageSlider from 'react-simple-image-slider'
 import img2 from '../../img2.png';
 import img3 from '../../img3.png';
 import img4 from '../../img4.png';


function Home() {
  const sliderImages= [img2,img3,img4];
  return (
    <div className='bg-khaki '>
      <div className='min-h-screen' >
        {/* Header */}
        <header className='flex justify-between items-center p-2 bg-navy text-orange-600 font-bold'>
          <h1 className='sm:text-6xl'>Daksh library</h1>
          {/* Login Button */}
          <Link to="/login" className='text-xl hover:underline'>
            Login
          </Link>
        </header>

        {/* slider */}
         <div className='sm:h-3/4 w-full hidden sm:flex justify-center'>

           <SimpleImageSlider
            width={"80vw"}
            height={"100vh"}
            slideDuration={0.5}
            images={sliderImages}
            showNavs={true}
            loop={true}
            autoPlay={true}
         />
          </div>
          {/* image for mobile view */}
          <div className='flex sm:hidden'>
              <img src={img2} alt="Library image" />
          </div>

          {/* Facilities */}
  
            <div className='my-5'>
              <header className='font-bold text-5xl font-Montserrat text-center mb-2'>Facilities</header>
            {/* <div className='w-full sm:h-80 flex flex-col items-center  bg-pink-400 sm:mx-auto px-2 sm:p-0'>
                <ul className='list-disc flex flex-col justify-evenly  text-2xl text-gray-200 h-full'>
                  <li>Free WIFI Internet</li>
                  <li>Fully Air Conditioned</li>
                  <li>Seperate Sitting for Boys and Girls</li>
                  <li>Peaceful Enviornment</li>
                  <li>CCTV Camera Survillence</li>
                  <li>24 x 7</li>
                </ul>
            </div> */}
            <ul className='grid grid-cols-1 sm:grid-cols-3  list-none text-white font-bold sm:gap-2 sm:mx-1'>
                 <li className='bg-blue-300 p-3 sm:p-10 text-center'>Free WIFI Internet</li>
                  <li className='bg-pink-400 p-3 sm:p-10 text-center'>Fully Air Conditioned</li>
                  <li className='bg-red-300 p-3 sm:p-10 text-center'>Seperate Sitting for Boys and Girls</li>
                  <li className='bg-green-300 p-3 sm:p-10 text-center'>Peaceful Enviornment</li>
                  <li className='bg-navy p-3 sm:p-10 text-center'>CCTV Camera Survillence</li>
                  <li className='bg-yellow-300 p-3 sm:p-10 text-center'>24 x 7</li>
            </ul>
            </div>


        {/* Footer */}
        <header className='font-bold text-5xl font-Montserrat text-center my-3'>Details</header>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Home;
