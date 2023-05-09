import React, { useState, useEffect } from 'react'
import { getRecipes } from './api/APIrecipes'
import RecipesBlock from './components/RecipesBlock'
import { RecipeType } from './types/recipes'

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([])

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data)
      console.log(recipes)
    })
  }, [])

  if (recipes.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <RecipesBlock recipes={recipes} />
    </>
  )
}

export default App
