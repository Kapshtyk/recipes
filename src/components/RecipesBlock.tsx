import React, { useState } from 'react'
import { RecipesType } from '../types/recipes'
import RecipePreview from './RecipePreview'
import cl from '../styles/RecipePreview.module.css'

const RecipesBlock = (recipes: RecipesType) => {
  const [search, setSearch] = useState('')

  const filteredRecipes = recipes.recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((elem) =>
        elem.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  })

  return (
    <>
      <div className={cl.recipes_main_container}>
        <input
          className={cl.recipes_input}
          type="text"
          placeholder="search soup by name or by ingredient"
          onChange={(event) => setSearch(event.target.value)}
        ></input>
        <div className={cl.recipes_container}>
          {filteredRecipes.map((recipe) => (
            <RecipePreview recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default RecipesBlock
