import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import SignUp from '../components/Signup'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import Dashboard from '../components/dashboard'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'


function AppRoutes() {
  return <Routes>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/' element={<SignIn/>}/>
    <Route path='/forgot-password' element={<ForgotPassword />}/>
    <Route path='/reset-password' element={<ResetPassword />} />
    <Route path='/*' element={<Navigate to = '/'/>}/>
    </Routes>
}

export default AppRoutes 