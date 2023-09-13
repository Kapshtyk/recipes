import React, { Fragment, useEffect, useState } from 'react'

import { IForm } from '.'
import { IFormValuesAndErrors, useForm } from '../../hooks'
import { InputElement } from '../InputElement'
import styles from './Form.module.css'

const Form: React.FC<IForm> = ({
  inputElements,
  title,
  noValidate,
  onSubmit,
  submissionErrors,
  validators
}) => {
  const [isValid, setIsValid] = useState(false)
  const initialValues: IFormValuesAndErrors = {}
  const [validationAndsubmissionErrors, setValidationAndsubmissionErrors] =
    useState({} as IFormValuesAndErrors)

  inputElements.forEach((element) => {
    initialValues[element.name] = element.value
  })

  const {
    values,
    handleChange,
    handleTouch,
    errors: validationErrors
  } = useForm({ initialValues, validators })

  useEffect(() => {
    setIsValid(Object.keys(validationErrors).length > 0)
  }, [validationErrors])

  useEffect(() => {
    setValidationAndsubmissionErrors({
      ...submissionErrors,
      ...validationErrors
    })
  }, [submissionErrors, validationErrors])

  const checkIfErrorsExist =
    validationAndsubmissionErrors &&
    Object.keys(validationAndsubmissionErrors).length > 0

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!checkIfErrorsExist) {
      onSubmit(e, values)
    }
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
            style={{
              borderColor: validationErrors[element.name] && 'rgb(249 115 22)'
            }}
            inputStyles={styles.input}
            labelStyles={styles.label}
            containerStyles={styles.input_container}
            name={element.name}
            label={element.label}
            type={element.type}
            placeholder={element.label}
            value={values[element.name]}
            onBlur={() => handleTouch(element.name)}
            onChange={(e) => handleChange(element.name, e.target.value)}
          />
        </Fragment>
      ))}
      {checkIfErrorsExist && (
        <ul className={styles.error}>
          {Object.keys(validationAndsubmissionErrors).map((key) => {
            return <li key={key}>{validationAndsubmissionErrors[key]}</li>
          })}
        </ul>
      )}
      <button disabled={isValid} type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  )
}

export { Form }
