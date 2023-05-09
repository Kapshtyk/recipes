import React from 'react'
import { ImageType } from '../types/image'
import cl from '../styles/RecipePreview.module.css'

const Image = (data: ImageType) => {
  return (
    <div className="">
      <img
        src={data.source}
        alt={data.alt}
        width={data.width ?? '100%'}
      />
    </div>
  )
}

export default Image
