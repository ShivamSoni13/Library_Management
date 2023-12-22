import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import Customers from './pages/Customers';
import { UserContextProvider } from './context/UserContext';
import IdentificationPage from './pages/IdentificationPage';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const adminLogedin = localStorage.getItem('admin');
  return (
    <div className='font-Ubuntu'>
      <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {adminLogedin && <Route path="/register" element={<RegisterUser />} /> }
         {adminLogedin && <Route path="/customersinfo" element={<Customers/>} />}
          {adminLogedin && <Route path="/identity/:customerId" element={<IdentificationPage/>}/>}
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </UserContextProvider>
      </Router>
    </div>
  );
};

export default App;
