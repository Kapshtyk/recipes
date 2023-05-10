import React from 'react'

export interface ProtectedRouteProps {
  isLogged: boolean
  children: React.ReactNode
}
