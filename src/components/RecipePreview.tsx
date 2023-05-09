import React from 'react'
import { RecipeType } from '../types/recipes'
import Image from './Image'
import cl from '../styles/RecipePreview.module.css'

const RecipePreview = ({ recipe }: { recipe: RecipeType }) => {
  return (
    <div className={cl.recipe_card}>
      <div className={cl.recipe_image}>
        <Image source={recipe.image} alt={recipe.title} />
      </div>
      <div className={cl.recipe_description}>
        <h2 className={cl.recipe_title}>{recipe.title}</h2>
        <button className={cl.recipe_button}>See more</button>
      </div>
    </div>
  )
}

export default RecipePreview