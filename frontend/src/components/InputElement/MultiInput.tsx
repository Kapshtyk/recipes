import React, { useEffect, useState } from 'react'

import { IInput } from '.'
import Icons from '../../ui/icons'

const MultiInput: React.FC<IInput> = ({
  id,
  name,
  label,
  value,
  inputStyles,
  labelStyles,
  containerStyles,
  ...rest
}) => {
  const [lableVisibility, setLabelVisibility] = useState<boolean>(false)

  useEffect(() => {
    if (value.length > 0) {
      setLabelVisibility(true)
    } else {
      setLabelVisibility(false)
    }
  }, [value])

  return (
    <fieldset className={containerStyles}>
      <label
        style={{ display: lableVisibility ? 'block' : 'none' }}
        className={labelStyles}
        htmlFor={`${id}name`}
      >
        {label}
      </label>
      <input
        className={inputStyles}
        id={`${id}name`}
        {...rest}
        placeholder="Name"
      ></input>
      <label
        style={{ display: lableVisibility ? 'block' : 'none' }}
        className={labelStyles}
        htmlFor={`${id}units`}
      >
        {label}
      </label>
      <input
        className={inputStyles}
        id={`${id}units`}
        {...rest}
        placeholder="Units"
      ></input>
      <label
        style={{ display: lableVisibility ? 'block' : 'none' }}
        className={labelStyles}
        htmlFor={`${id}quantity`}
      >
        {label}
      </label>
      <input
        className={inputStyles}
        id={`${id}quantity`}
        {...rest}
        placeholder="Quantity"
        type="number"
      ></input>
    </fieldset>
  )
}

export { MultiInput }
