import React, { useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

import styles from '../styles/Form.module.css'
import { IDropZone } from '../types/interfaces'

const FileDropzone: React.FC<IDropZone> = ({ onUpload, accept = 'image/*', wide }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      setImage(null)
      if (file) {
        convertToBase64(file).then((res) => {
          onUpload(res as string)
          setImage(res as string)
          setError(null)
        })
      } else {
        setError('File is not valid or too big')
      }
    },
    accept: { [accept]: [] },
    multiple: false,
    maxSize: 1000000
  })

  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const convertToBase64 = (file: FileWithPath) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <section className={`${styles.dropzone} ${wide && styles.wide_dropzone}`}>
      <div {...getRootProps({ className: `${styles.dropzone_inner}` })}>
        <input {...getInputProps()} />
        <p className={`${styles.dropzone_lable} ${wide && styles.wide_dropzone_lable}`}>
          {error ? error : 'Drag and drop image here or click to upload it (1mb max)'}
        </p>
        {image && <img className="justify-self-end w-[100px]" src={image} alt="preview" />}
      </div>
    </section>
  )
}

export { FileDropzone }
