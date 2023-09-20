import React from 'react'

import { IFormValuesAndErrors } from '../../../hooks'
import styles from '../styles/Form.module.css'
import { IInput } from '../types'
import { InputElement } from './InputElement'

interface IMultiInput {
  elements: IInput[]
  values: IFormValuesAndErrors
  wide?: boolean
  validationErrors: IFormValuesAndErrors
  onBlur: (value: string) => void
  onChange: (value: string, e: string) => void
}

const MultiInput: React.FC<IMultiInput> = ({
  elements,
  values,
  wide,
  validationErrors,
  onBlur,
  onChange
}) => {
  console.log(elements)
  return (
    <fieldset className={`${styles.input_container}`}>
      {elements.map((element, index) => (
        <InputElement
          className={styles.multi_input}
          key={index}
          name={element.name}
          label={index === 2 ? 'Ingredient' : ''}
          type={element.type}
          placeholder={element.label}
          value={values[element.name]}
          validationErrors={validationErrors[element.name]}
          onBlur={() => onBlur(element.name)}
          onChange={(e) => onChange(element.name, e.target.value)}
          wide={wide}
        />
      ))}
    </fieldset>
  )
}

export default MultiInput
