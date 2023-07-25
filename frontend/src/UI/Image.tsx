import React from 'react'
import { ImageType } from '../types/image'
import cl from '../styles/Image.module.css'

const Image = (data: ImageType) => {
  return (
    <img
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = 'images/default-soup.jpg'
      }}
      className={cl.image}
      src={data.source}
      alt={data.alt}
      width={data.width ?? '100%'}
    />
  )
}

export default Image
