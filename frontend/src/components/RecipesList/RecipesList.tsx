import React from 'react'

import { useGetRecipesQuery } from '../../app/services/recipes'
import { RecipePreview } from '../Recipe'
import styles from './RecipesList.module.css'

export const RecipesList = () => {
  const { data = [], error, isLoading } = useGetRecipesQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }

  if (data.length === 0) {
    return <h1>No recipes found</h1>
  }

  return (
    <div className={styles.recipes_container}>
      {data.map((recipe) => (
        <RecipePreview key={recipe._id} {...recipe} />
      ))}
    </div>
  )
}
