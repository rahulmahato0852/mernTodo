import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Details from './pages/Details'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Protected from './pages/Protected'
import AdminNavbar from './admin/adminNavbar'
import AdminDashboard from './admin/AdminDashboard'



const App = () => {

  return <>

    <BrowserRouter>

      <ToastContainer />
      <Navbar />
      <Routes>


        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dash' element={<><Protected compo={<>< Dashboard /><Outlet /></>} /></>} />
        <Route path='/detail/:id' element={<><Protected compo={<>< Details /><Outlet /></>} /></>} />


        <Route path='/admin' element={<><AdminNavbar /> <Outlet /></>}  >
          <Route index element={<AdminDashboard />} />
        </Route>



      </Routes>




    </BrowserRouter>


  </>
}

export default App