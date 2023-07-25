import React from 'react'
import { Link } from 'react-router-dom'

import { RecipeType } from '../types/recipes'
import { getCountryCode } from '../utils/CountryCode'

import Image from '../UI/Image'

import cl from '../styles/RecipePreview.module.css'

const RecipePreview = ({ recipe }: { recipe: RecipeType }) => {
  if ('id' in recipe) {
    const countryCode = getCountryCode(recipe.origin)
    return (
      <Link to={`/recipes/${recipe.id}`}>
        <div className={cl.recipe_card}>
          <div className={cl.recipe_image}>
            <Image source={recipe.image} alt={recipe.title} />
          </div>
          <div className={cl.recipe_overlay}></div>
          <div className={cl.recipe_title_container}>
            <h1 className={cl.recipe_title}>{recipe.title}</h1>
          </div>
          <div className={cl.recipe_flag_container}>
            <img
              className={cl.recipe_flag}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
              alt={recipe.origin}
            />
          </div>
        </div>
      </Link>
    )
  }
  return <div>No recipe</div>
}

export default RecipePreview
