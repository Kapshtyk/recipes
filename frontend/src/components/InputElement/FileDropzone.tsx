import React, { useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

interface IProps {
  onUpload: (data: string) => void;
  zoneStyles?: string;
  innerZoneStyles?: string;
  labelStyles?: string;
  accept?: string;
}

const FileDropzone: React.FC<IProps> = ({ onUpload, zoneStyles, innerZoneStyles, labelStyles, accept = 'image/*' }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      convertToBase64(file).then((res) => {
        onUpload(res as string)
        setImage(res as string)
      })
    },
    accept: { [accept]: [] },
    multiple: false
  })

  const [image, setImage] = useState<string | null>(null)

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
    <section className={zoneStyles}>
      <div {...getRootProps({ className: `${innerZoneStyles}` })}>
        <input {...getInputProps()} />
        <p className={labelStyles}>Drag and drop file here or click to upload it</p>
        {image && <img className='justify-self-end w-[100px]' src={image} alt="preview" />}
      </div>
    </section>
  )
}

export { FileDropzone }
