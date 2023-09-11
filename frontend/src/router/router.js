import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'
import Authorization from '../pages/Authorization'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <div>Home</div> },
      { path: '/signup', element: <Authorization /> }
    ]
  }
])

export default router
