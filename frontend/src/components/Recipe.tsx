import React from 'react'
import { IRecipe } from '../models/IRecipe'
import styles from './Recipe.module.css'

const Recipe = ({ title, description, instructions, ingredients, image, author }: IRecipe) => {
  return (
    <div className={styles.recipe_container}>
      <div className={styles.recipe_image_container}>
        <img className={styles.recipe_image} src={image} />
      </div>
      <div className={styles.recipe_data_container}>
        <h1 className={styles.recipe_heading}>{title}</h1>
        <p>{description}</p>
        <p>{instructions}</p>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            <p>{ingredient.ingredient.name}, {ingredient.ingredient.units} - {ingredient.quantity}</p>
          </div>
        ))}
        <p>{author.username}</p>
      </div>
    </div >
  )
}

export default Recipe
