import React, { Fragment } from 'react'

import { IFormValues, useForm } from '../../hooks/useForm'
import InputElement from '../InputComponent'
import styles from './Form.module.css'
import { IFormProps } from './interfaces'


const Form: React.FC<IFormProps> = ({ inputElements, title, noValidate, onSubmit }) => {
  const initialValues: IFormValues = {}
  inputElements.forEach((element) => {
    initialValues[element.name] = element.value
  })

  const { values, handleChange } = useForm(initialValues)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e, values)
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleSubmit(e)}
      noValidate={noValidate}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {inputElements.map((element, index) => (
        <Fragment key={index}>
          <InputElement
            inputStyles={styles.input}
            labelStyles={styles.label}
            containerStyles={styles.input_container}
            name={element.name}
            label={element.label}
            type={element.type}
            placeholder={element.label}
            value={values[element.name]}
            onChange={(e) => handleChange(element.name, e.target.value)}
          />
        </Fragment>
      ))}
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  )
}

export default Form
