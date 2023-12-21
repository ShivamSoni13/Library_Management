import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import Customers from './pages/Customers';
import { UserContextProvider } from './context/UserContext';
import IdentificationPage from './pages/IdentificationPage';

const App = () => {
  return (
    <div className='font-Ubuntu'>
      <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          

            <Route path="/register" element={<RegisterUser />} />
          <Route path="/customersinfo" element={<Customers/>} />
          <Route path="/identity/:customerId" element={<IdentificationPage/>}/>
          
        </Routes>
      </UserContextProvider>
      </Router>
    </div>
  );
};

export default App;
