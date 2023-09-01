import React, { useEffect } from 'react'

import { useAppDispatch } from './hooks/redux'
import { fetchRecipes, fetchUsers } from './store/reducers/ActionCreators'

import RecipesList from './components/RecipesList'
import Header from './components/Header/Header'
import HeroRecipe from './components/HeroRecipe/HeroRecipe'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchRecipes())
  }, [dispatch])


  return (
    <>
      <Header />
      <HeroRecipe />
      <RecipesList />
    </>
  )
}

export default App