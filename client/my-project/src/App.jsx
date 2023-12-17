import React from 'react'
import Login from './pages/Login'
import { BrowserRouter as Router  ,Route,Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className=''>
      <Router>
      <Routes>
        <Route element={<Login/>} path='/adminLogin'/>
      </Routes>
      </Router>
    </div>
  )
}

export default App