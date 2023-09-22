import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'
import { RecipeDetails } from '../components/Recipe'
import { RecipesList } from '../components/RecipesList'
import AddRecipe from '../pages/AddRecipe'
import Homepage from '../pages/Homepage'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import PrivateRoutes from './PrivateRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/signin', element: <SignIn /> },
      {
        path: '/create',
        element: (
          <PrivateRoutes>
            <AddRecipe />
          </PrivateRoutes>
        )
      },
      { path: '/recipes', element: <RecipesList /> },
      { path: '/recipes/:id', element: <RecipeDetails /> }
    ]
  }
])

export default router
