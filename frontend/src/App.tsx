import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { setCurrentUser } from './features/auth/authSlice'
import { useAppDispatch } from './hooks'
import { IUser } from './models/IUser'
import router from './router/router'
import { APP_NAME } from './utils/constants'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const currentUser = localStorage.getItem(`${APP_NAME}CurrentUser`)
    if (currentUser !== null) {
      const user = JSON.parse(currentUser) as Partial<IUser>
      dispatch(setCurrentUser(user))
    }
  }, [])

  return <RouterProvider router={router} />
}

export default App
