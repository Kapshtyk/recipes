import React from 'react'
import { useAppSelector } from '../hooks/redux'
import Recipe from './Recipe'
import styles from './RecipesList.module.css'

const RecipesList = () => {
  const { recipes, isLoading, error } = useAppSelector(state => state.recipesReducer)

  return (
    <div className={styles.recipes_container}>
      {recipes.length > 0 && recipes.map((recipe) => (
        <Recipe key={recipe._id} {...recipe} />
      ))}
    </div>
  )
}

export default RecipesList
