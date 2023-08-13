import React, { useContext, useState } from 'react'

import RecipePreview from '../components/RecipePreview'
import cl from '../styles/RecipePreview.module.css'
import { RecipesContext } from '../utils/context'

const RecipesBlock = () => {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const recipes = useContext(RecipesContext).recipes

  let filteredRecipesByName
  let filteredRecipes
  let countries

  if (recipes) {
    filteredRecipesByName = recipes.filter((recipe) => {
      if ('id' in recipe) {
        return (
          recipe.title.toLowerCase().includes(search.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      }
    })
  }

  if (filteredRecipesByName) {
    filteredRecipes = filteredRecipesByName.filter((recipe) => {
      if (country && 'id' in recipe) {
        return recipe.origin === country
      } else {
        return true
      }
    })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleCountries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value)
  }

  if (recipes) {
    countries = Array.from(
      new Set(
        recipes.map((recipe) => {
          if ('id' in recipe) {
            return recipe.origin
          }
        })
      )
    ).sort((a, b) => {
      if (a && b) {
        return a.localeCompare(b)
      }
      return 0
    })
  }

  return (
    <>
      <div className={cl.recipes_main_container}>
        <div>
          <input
            className={cl.recipes_input}
            type="text"
            placeholder="search soup by name or by ingredient"
            onChange={handleSearch}
          ></input>
          <select
            className={cl.recipes_input_select}
            onChange={handleCountries}
          >
            <option value="">All countries</option>
            {countries &&
              countries.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                )
              })}
          </select>
        </div>
        <div className={cl.recipes_container}>
          {filteredRecipes &&
            filteredRecipes.map((recipe) => {
              if ('id' in recipe) {
                return <RecipePreview recipe={recipe} key={recipe.id} />
              }
            })}
          {!filteredRecipes &&
            recipes &&
            recipes.map((recipe) => {
              if ('id' in recipe) {
                return <RecipePreview recipe={recipe} key={recipe.id} />
              }
            })}
        </div>
      </div>
    </>
  )
}

export default RecipesBlock
