import { Navigate, Route, Routes } from 'react-router'
import { Accomodations, Bookings, Dashboard, Login } from '../pages'

export const RouterApp = () => {
  return (
    <Routes>

        <Route path='/login' element = { <Login /> } />
        <Route path='/dashboard' element = { <Dashboard /> } />
        <Route path='/accomodations' element = { <Accomodations /> } />
        <Route path='/bookings' element = { <Bookings /> } />

        <Route path='/*' element = { <Navigate to = '/login' /> } />

    </Routes>
  )
}
