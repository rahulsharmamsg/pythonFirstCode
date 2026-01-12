import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Layout from './common/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './common/ProtectedRoute'
import AuthWatcher from './common/AuthWatcher'
import CreateTask from './pages/Task'
import AddProject from './pages/CreateProject'
import AdminDashboard from './pages/AdminDashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <ToastContainer position="top-right" autoClose={3000} />
       <AuthWatcher />
   <Routes>
    <Route element={<Layout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoute />}>
           <Route index element={<Home />} />        
           <Route path='/profile' element={<Profile />} />
           <Route path='/about' element={<About />} />
           <Route path='/task' element={<CreateTask />} />
           <Route path='/addproject' element={<AddProject />} />
           <Route path='/dashboard' element={<AdminDashboard />} />
        </Route>
        
    </Route>
   </Routes>
    </>
 
  )
}

export default App
