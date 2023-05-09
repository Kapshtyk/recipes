import React, { useState } from 'react'
import { RecipesType } from '../types/recipes'
import RecipePreview from './RecipePreview'
import cl from '../styles/RecipePreview.module.css'

const RecipesBlock = (recipes: RecipesType) => {
  const [search, setSearch] = useState('')

  const filteredRecipes = recipes.recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <input type="text" onChange={(event) => setSearch(event.target.value)}></input>
      <div className={cl.recipes_container}>
        {filteredRecipes.map((recipe) => (
          <RecipePreview recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  )
}

export default RecipesBlock
