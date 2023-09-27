import React from 'react'

import styles from '../styles/Form.module.css'
import { IFormValuesAndErrors, IInput } from '../types'
import { InputElement } from './InputElement'
import { SelectElement } from './SelectElement'

interface IMultiInput {
  elements: IInput[]
  values: IFormValuesAndErrors
  wide?: boolean
  validationErrors: IFormValuesAndErrors
  onBlur: (value: string) => void
  onChange: (value: string, e: string) => void
}

const MultiInput: React.FC<IMultiInput> = ({ elements, values, wide, validationErrors, onBlur, onChange }) => {
  return (
    <fieldset className={`${styles.input_container}`}>
      <SelectElement
        className={`${styles.multi_input}  ${validationErrors[elements[0].name] && styles.error_input}`}
        name={elements[0].name}
        label="Ingredient"
        type={elements[0].type}
        placeholder={elements[0].label}
        value={values[elements[0].name]}
        validationErrors={validationErrors[elements[0].name]}
        onBlur={() => onBlur(elements[0].name)}
        onChange={(e) => onChange(elements[0].name, e.target.value)}
        wide={wide}
      />
      <InputElement
        className={`${styles.multi_input}  ${validationErrors[elements[1].name] && styles.error_input}`}
        name={elements[1].name}
        label="Units"
        type={elements[1].type}
        placeholder={elements[1].label}
        value={values[elements[1].name]}
        validationErrors={validationErrors[elements[1].name]}
        onBlur={() => onBlur(elements[1].name)}
        onChange={(e) => onChange(elements[1].name, e.target.value)}
        wide={wide}
      />
      <InputElement
        className={`${styles.multi_input}  ${validationErrors[elements[2].name] && styles.error_input}`}
        name={elements[2].name}
        label="Quantity"
        type={elements[2].type}
        placeholder={elements[2].label}
        value={values[elements[2].name]}
        validationErrors={validationErrors[elements[2].name]}
        onBlur={() => onBlur(elements[2].name)}
        onChange={(e) => onChange(elements[2].name, e.target.value)}
        wide={wide}
      />
    </fieldset>
  )
}

export default MultiInput
