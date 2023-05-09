import React from 'react'
import { ImageType } from '../types/image'
import cl from '../styles/RecipePreview.css'

const Image = (data: ImageType) => {
  return (
    <div className="">
      <img
        src={data.source}
        alt={data.alt}
        width={data.width ?? 400}
        height={data.height ?? 300}
      />
    </div>
  )
}

export default Image
