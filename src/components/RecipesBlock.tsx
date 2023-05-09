import React from 'react'
import { RecipesType } from '../types/recipes'
import RecipePreview from './RecipePreview'
import cl from '../styles/RecipePreview.module.css'

const RecipesBlock = (recipes: RecipesType) => {
  return (
    <div className={cl.recipes_container}>
      {recipes.recipes.map((recipe) => (
        <RecipePreview recipe={recipe} key={recipe.id} />
      ))}
    </div>
  )
}

export default RecipesBlock
