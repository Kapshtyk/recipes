import React, { useState, useEffect } from 'react'

import { IInput } from './interfaces'

const InputElement: React.FC<IInput> = ({
  name,
  label,
  inputStyles,
  labelStyles,
  containerStyles,
  value,
  ...rest
}) => {
  const [lableVisibility, setLabelVisibility] = useState<boolean>(false)

  useEffect(() => {
    console.log(value, label)
    if (value.length > 0) {
      setLabelVisibility(true)
    } else {
      setLabelVisibility(false)
    }
  }, [value])

  return (
    <div className={containerStyles}>
      <label style={{ display: lableVisibility ? 'block' : 'none' }} className={labelStyles} htmlFor={name}>
        {label}
      </label>
      <input className={inputStyles} id={name} {...rest}></input>
    </div>
  )
}

export default InputElement
