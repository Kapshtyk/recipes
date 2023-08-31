import React, { useEffect } from 'react'

import { useAppDispatch } from './hooks/redux'
import { fetchRecipes, fetchUsers } from './store/reducers/ActionCreators'

import RecipesList from './components/RecipesList'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchRecipes())
  }, [dispatch])


  return (
    <>
      <RecipesList />
    </>
  )
}

export default App