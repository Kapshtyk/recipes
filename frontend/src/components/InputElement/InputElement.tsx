import React, { useEffect, useState } from 'react'

import { IInput } from '.'
import Icons from '../../ui/icons'

const InputElement: React.FC<IInput> = ({
  name,
  label,
  type,
  value,
  inputStyles,
  labelStyles,
  containerStyles,
  ...rest
}) => {
  const [lableVisibility, setLabelVisibility] = useState<boolean>(false)
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)

  useEffect(() => {
    if (value && value.length > 0) {
      setLabelVisibility(true)
    } else {
      setLabelVisibility(false)
    }
  }, [value])

  useEffect(() => {
    if (type === 'password') {
      setPasswordVisibility(false)
    }
  }, [type])
  //TODO: add textarea

  return (
    <div className={containerStyles}>
      <label
        style={{ display: lableVisibility ? 'block' : 'none' }}
        className={labelStyles}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={inputStyles}
        id={name}
        type={passwordVisibility ? type : 'password'}
        {...rest}
      ></input>
      {type === 'password' && (
        <button
          style={{
            position: 'absolute',
            right: '25px'
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
