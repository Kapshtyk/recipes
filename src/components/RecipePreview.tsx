import React from 'react'
import { RecipeType } from '../types/recipes'
import Image from './Image'
import cl from '../styles/RecipePreview.module.css'
import { getCountryCode } from '../utils/CountryCode'
import { Link, useNavigate } from 'react-router-dom'

const RecipePreview = ({ recipe }: { recipe: RecipeType }) => {
  const navigate = useNavigate()
  const countryCode = getCountryCode(recipe.origin)
  return (
    <div className={cl.recipe_card}>
      <div className={cl.recipe_image}>
        <Image source={recipe.image} alt={recipe.title} />
      </div>
      <div className={cl.recipe_description}>
        <h2 className={cl.recipe_title}>{recipe.title}</h2>
        <button className={cl.recipe_button} onClick={() => {
          navigate(`/recipes/${recipe.id}`)
        }}>See more</button>
      </div>
      <div className={cl.recipe_overlay}></div>
      <div className={cl.recipe_rating_container}>
        <h1 className={cl.recipe_rating}>Rating: 100</h1>
      </div>
      <div className={cl.recipe_flag_container}>
        <img
          className={cl.recipe_flag}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
          alt={recipe.origin}
        />
      </div>
    </div>
  )
}

export default RecipePreview
