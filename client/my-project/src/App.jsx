import React from 'react'
import Login from './pages/Login'
import { BrowserRouter as Router  ,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterUser from './pages/RegisterUser'

const App = () => {
  return (
    <div className=''>
      <Router>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Login/>} path='/adminLogin'/>
        <Route element={<RegisterUser/>} path='/registerUser'/>
        
      </Routes>
      </Router>
    </div>
  )
}

export default App