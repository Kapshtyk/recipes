import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { selectCurrentUser } from '../features/auth/authSlice'
import { useAppSelector } from '../hooks'

const PrivateRoutes = () => {
  const auth = useAppSelector(selectCurrentUser)
  if (auth) {
    return auth.token ? <Outlet /> : <Navigate to="/login" />
  }

}

export default PrivateRoutes
