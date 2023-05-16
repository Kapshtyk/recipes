import React, { useContext, useState } from 'react'
import RecipePreview from './RecipePreview'
import cl from '../styles/RecipePreview.module.css'
import { RecipesContext } from '../utils/context'

const RecipesBlock = () => {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const recipes = useContext(RecipesContext)[0]

  const filteredRecipesByName = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  })

  const filteredRecipes = filteredRecipesByName.filter((recipe) => {
    if (country) {
      return recipe.origin === country
    } else {
      return true
    }
  })

  console.log(country)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleCountries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value)
  }

  const countries = Array.from(
    new Set(
      recipes.map((recipe) => {
        return recipe.origin
      })
    )
  ).sort((a, b) => a.localeCompare(b))

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
            {countries.map((country) => {
              return (
                <option key={country} value={country}>
                  {country}
                </option>
              )
            })}
          </select>
        </div>
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
