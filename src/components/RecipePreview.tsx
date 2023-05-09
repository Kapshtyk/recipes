import React from 'react'
import { Recipe } from '../types/recipes'

const RecipePreview = (data: Recipe) => {
  return (
    <div>
      {data.id}
      {data.title}
      <img src={data.image} alt={data.title} />
    </div>
  )
}

export default RecipePreview
