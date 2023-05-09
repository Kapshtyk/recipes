import React from 'react'
import { RecipeType } from '../types/recipes'
import Image from './Image'

const RecipePreview = (data: RecipeType) => {
  return (
    <div>
      {data.id}
      {data.title}
      <Image source={data.image} alt={data.title}></Image>
    </div>
  )
}

export default RecipePreview
