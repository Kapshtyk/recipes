import React from 'react'
import styles from './HeroRecipe.module.css'
import { useAppSelector } from '../../hooks/redux'


const HeroRecipe = () => {
  const { recipes, isLoading, error } = useAppSelector(state => state.recipesReducer)

  return (
    <div className={styles.hero_recipe_container}>
      <img src={recipes[2].image} alt={recipes[2].title} />
    </div>
  )
}

export default HeroRecipe
