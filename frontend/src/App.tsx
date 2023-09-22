import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './router/router'
import { selectCurrentUser, clearCurrentUser } from './features/auth/authSlice'
import { useAppSelector, useAppDispatch } from './hooks'

import jwt_decode, { JwtPayload } from 'jwt-decode'

const App = () => {
  const auth = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (auth && auth.token) {
      const decoded: JwtPayload = jwt_decode(auth.token) as JwtPayload
      const currentTime = Date.now() / 1000
      if (decoded && 'exp' in decoded && decoded.exp && decoded.exp < currentTime) {
        dispatch(clearCurrentUser())
      }
    }
  }, [auth])

  return <RouterProvider router={router} />
}

export default App
