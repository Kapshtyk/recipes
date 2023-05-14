import React from 'react'
import { ProtectedRouteType } from '../types/protecredRoute'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../utils/context'

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const location = useLocation()
  const currentUser = useContext(CurrentUserContext)[0]

  if (!currentUser) {
    localStorage.setItem('redirectPath', JSON.stringify(location))
    return (
      <Navigate
        to={{
          pathname: '/login'
        }}
        replace
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
