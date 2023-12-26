import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <div>
        {/* Header */}
        <header className='flex justify-between items-center p-4 bg-blue-500 text-white'>
          <h1 className='text-6xl'>Library</h1>
          {/* Login Button */}
          <Link to="/login" className='text-xl hover:underline'>
            Login
          </Link>
        </header>
        
        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Home;

