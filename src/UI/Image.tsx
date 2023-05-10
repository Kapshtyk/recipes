import React from 'react'
import { ImageType } from '../types/image'

const Image = (data: ImageType) => {
  return <img src={data.source} alt={data.alt} width={data.width ?? '100%'} />
}

export default Image
