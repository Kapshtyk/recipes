import React from 'react'
import { IRecipe } from '../models/IRecipe'

const Recipe = (recipe: IRecipe) => {
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>{recipe.instructions}</p>
      {recipe.ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          <p>{ingredient.ingredient.name}, {ingredient.ingredient.units} - {ingredient.quantity}</p>
        </div>
      ))}
      <p>{recipe.author.username}</p>
    </div>
  )
}

export default Recipe
