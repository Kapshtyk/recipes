import React, { useEffect, useState } from 'react'

import Icons from '../../../ui/icons'
import styles from '../styles/Form.module.css'
import { IInput } from '../types'

const InputElement: React.FC<IInput> = ({
  name,
  label,
  type,
  value,
  wide,
  validationErrors,
  ...rest
}) => {
  /* const [lableVisibility, setLabelVisibility] = useState<boolean>(false) */
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)

  /*  useEffect(() => {
     if (value && value.length > 0) {
       setLabelVisibility(true)
     } else {
       setLabelVisibility(false)
     }
   }, []) */

  useEffect(() => {
    if (type === 'password') {
      setPasswordVisibility(false)
    }
  }, [type])



  return (
    <div className={styles.input_container}>
      <label
        style={{ display: (value && value.length != 0) ? 'block' : 'none' }}
        className={`${styles.label} ${wide && styles.wide_label}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`${styles.input} ${wide && styles.wide_input}  ${validationErrors && styles.error_input}`}
        id={name}
        type={passwordVisibility ? type : 'password'}
        {...rest}
        step={type === 'number' ? 0.01 : undefined}
      ></input>
      {type === 'password' && (
        <button
          style={{
            position: 'absolute',
            right: '12px'
          }}
          type="button"
          tabIndex={-1}
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        >
          {passwordVisibility ? <Icons.ShowPassword /> : <Icons.HidePassword />}
        </button>
      )}
    </div>
  )
}

export { InputElement }
