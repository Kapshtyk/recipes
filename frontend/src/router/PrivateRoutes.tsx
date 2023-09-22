/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { selectCurrentUser } from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks'

interface IPrivateRoutes {
  children: React.ReactNode
}

const PrivateRoutes: IPrivateRoutes = (children) => {
  const auth = useAppSelector(selectCurrentUser)
  console.log(auth)
  if (auth && auth.token) {
    return <Outlet />
  } else {
    <Navigate to="/signin" />
  }
}

export default PrivateRoutes
