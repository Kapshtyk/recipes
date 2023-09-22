import React, { useEffect, useState } from 'react'

import styles from '../styles/Form.module.css'
import { ITextArea } from '../types'

const TextAreaElement: React.FC<ITextArea> = ({
  name,
  label,
  value,
  wide,
  validationErrors,
  ...rest
}) => {
  const [lableVisibility, setLabelVisibility] = useState<boolean>(false)

  useEffect(() => {
    if (value && value.length > 0) {
      setLabelVisibility(true)
    } else {
      setLabelVisibility(false)
    }
  }, [value])

  return (
    <div className={styles.input_container}>
      <label
        style={{ display: lableVisibility ? 'block' : 'none' }}
        className={`${styles.label} ${wide && styles.wide_label}`}
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        className={`${styles.text_area} ${wide && styles.wide_text_area}  ${
          validationErrors && styles.error_input
        }`}
        id={name}
        {...rest}
      ></textarea>
    </div>
  )
}

export { TextAreaElement }
