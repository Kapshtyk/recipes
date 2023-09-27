import React from 'react'

import { useGetIngredientsQuery } from '../../../app/services/ingredients'
import styles from '../styles/Form.module.css'
import { ISelect } from '../types'

const SelectElement: React.FC<ISelect> = ({ name, label, value = '', placeholder, wide, validationErrors, ...rest }) => {
  const { data, error, isLoading } = useGetIngredientsQuery(value, {
    skip: value.length < 3
  })

  return (
    <div className={styles.input_container}>
      <label
        style={{ display: value && value.length != 0 ? 'block' : 'none' }}
        className={`${styles.label} ${wide && styles.wide_label}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`${styles.input} ${wide && styles.wide_input}  ${validationErrors && styles.error_input}`}
        id={name}
        type="text"
        list={`ingredients-${name}`}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      <datalist id={`ingredients-${name}`}>
        {data?.map((ingredient) => {
          return <option key={ingredient._id} value={ingredient.name} />
        })}
      </datalist>
    </div>
  )
}

export { SelectElement }
