import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Bookings, Dashboard, Login } from '../pages'
import { ProtectedRoutes } from './ProtectedRoutes'

export const RouterApp = () => {
  return (
    <Routes>

        <Route path='/login' element = { <Login /> } />
        
        <Route path='/dashboard' element = { <ProtectedRoutes> <Dashboard/> </ProtectedRoutes> } />
        {/* <Route path='/accomodations' element = { <Accomodations /> } /> */}
        <Route path='/bookings' element = { <ProtectedRoutes> <Bookings /> </ProtectedRoutes> } />

        <Route path='/*' element = { <Navigate to = '/login' /> } />

    </Routes>
  )
}
