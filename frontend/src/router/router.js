import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'
import SignUp from '../pages/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <div>Home</div> },
      { path: '/signup', element: <SignUp /> }
    ]
  }
])

export default router
