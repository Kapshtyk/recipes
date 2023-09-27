import React, { Fragment, useEffect, useMemo, useState } from 'react'

import { Button } from '../../../ui/Button'
import { useForm } from '../hooks/useForm'
import styles from '../styles/Form.module.css'
import { IForm, IFormValuesAndErrors, IInput } from '../types'
import { FileDropzone } from './FileDropzone'
import { InputElement } from './InputElement'
import MultiInput from './MultiInput'
import { TextAreaElement } from './TextAreaElement'

const Form: React.FC<IForm> = ({
  inputElements,
  title,
  noValidate,
  onSubmit,
  submittingErrors,
  validators,
  wide,
  full,
  label,
  additionalHandler,
  additionalHandlerLabel,
  setValues
}) => {
  const [isValid, setIsValid] = useState(false)
  const [validationAndsubmissionErrors, setValidationAndsubmissionErrors] = useState({} as IFormValuesAndErrors)

  const initialValues = useMemo(() => {
    setIsValid(false)
    const values: IFormValuesAndErrors = {}
    inputElements.forEach((element) => {
      values[element.name] = element.value
    })
    return values
  }, [inputElements])

  const [image, setImage] = useState<string | null>(null)

  const { values, handleChange, handleTouch, errors: validationErrors, isFormTouched } = useForm({ initialValues, validators })

  useEffect(() => {
    if (setValues) {
      setValues(values)
    }
  }, [values])

  useEffect(() => {
    if (isFormTouched) {
      setIsValid(Object.keys(validationErrors).length === 0)
    }
  }, [validationErrors, isFormTouched])

  useEffect(() => {
    setValidationAndsubmissionErrors({
      ...submittingErrors,
      ...validationErrors
    })
  }, [submittingErrors, validationErrors])

  const checkIfErrorsExist = validationErrors && Object.keys(validationAndsubmissionErrors).length > 0

  const getValues = () => {
    return image ? { ...values, image } : values
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValid) {
      onSubmit(e, getValues())
    }
  }

  const elementsToRender: IInput[] = []
  const multiElements: IInput[] = []
  const multiElementsToRender: any[] = []

  inputElements.forEach((element) => {
    if (!(element.name.startsWith('name') || element.name.startsWith('quantity') || element.name.startsWith('units'))) {
      elementsToRender.push(element)
    } else {
      multiElements.push(element)
    }
  })

  if (multiElements.length > 0) {
    for (let index = 1; index <= multiElements.length / 3; index++) {
      const filtered = multiElements.filter((element) => {
        return element.name.includes(index.toString())
      })
      multiElementsToRender.push(
        <Fragment key={index}>
          <MultiInput
            elements={filtered}
            values={values}
            validationErrors={validationErrors}
            onBlur={handleTouch}
            onChange={handleChange}
            wide={wide}
          />
        </Fragment>
      )
    }
  }

  const handleInputs = (element: IInput, index: number) => {
    if (element.type === 'file') {
      return (
        <Fragment key={index}>
          <FileDropzone onUpload={setImage} wide={wide} />
        </Fragment>
      )
    }
    if (element.type === 'textarea') {
      return (
        <Fragment key={index}>
          <TextAreaElement
            name={element.name}
            label={element.label}
            placeholder={element.label}
            value={values[element.name]}
            onBlur={() => handleTouch(element.name)}
            onChange={(e) => handleChange(element.name, e.target.value)}
            wide={wide}
            validationErrors={validationErrors[element.name]}
          />
        </Fragment>
      )
    }
    return (
      <Fragment key={index}>
        <InputElement
          name={element.name}
          label={element.label}
          type={element.type}
          placeholder={element.label}
          value={values[element.name]}
          onBlur={() => handleTouch(element.name)}
          onChange={(e) => handleChange(element.name, e.target.value)}
          wide={wide}
          validationErrors={validationErrors[element.name]}
        />
      </Fragment>
    )
  }

  return (
    <form className={`${styles.form} ${wide && styles.wide_form} ${full && styles.full_form}`} onSubmit={(e) => handleSubmit(e)} noValidate={noValidate}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {elementsToRender.map((element, index) => (
        <Fragment key={index}>{handleInputs(element, index)}</Fragment>
      ))}
      {multiElementsToRender}
      {additionalHandler && (
        <Button label={additionalHandlerLabel || 'Submit'} className={styles.addition_button} onClick={additionalHandler} />
      )}
      {checkIfErrorsExist && (
        <ul className={styles.error}>
          {Object.keys(validationAndsubmissionErrors).map((key, index) => (
            <li key={index}>{validationAndsubmissionErrors[key]}</li>
          ))}
        </ul>
      )}
      <Button label={label} type="submit" disabled={!isValid} />
    </form>
  )
}

export { Form }
