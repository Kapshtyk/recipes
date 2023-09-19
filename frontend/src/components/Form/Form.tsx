import React, { Fragment, useEffect, useState } from 'react'

import { IForm } from '.'
import { IFormValuesAndErrors, useForm } from '../../hooks'
import { Button } from '../../ui/Button'
import { IInput, InputElement } from '../InputElement'
import { FileDropzone } from '../InputElement'
import styles from './Form.module.css'

const Form: React.FC<IForm> = ({
  inputElements,
  title,
  noValidate,
  onSubmit,
  submittingErrors,
  validators,
  wide,
  label,
  additionalHandler
}) => {
  const [isValid, setIsValid] = useState(false)
  const initialValues = useState<IFormValuesAndErrors>({})[0]
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

  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    setIsValid(Object.keys(validationErrors).length !== 0)
  }, [validationErrors])

  useEffect(() => {
    setValidationAndsubmissionErrors({
      ...submittingErrors,
      ...validationErrors
    })
  }, [submittingErrors, validationErrors])

  const checkIfErrorsExist =
    validationErrors && Object.keys(validationAndsubmissionErrors).length > 0

  const getValues = () => {
    return image ? { ...values, image } : values
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) {
      onSubmit(e, getValues())
    }
  }

  const elementsToRender: IInput[] = []
  const multiElements: IInput[] = []
  const multiElementsToRender: any = []

  inputElements.forEach((element) => {
    if (
      !(
        element.name.startsWith('name') ||
        element.name.includes('quantity') ||
        element.name.includes('units')
      )
    ) {
      elementsToRender.push(element)
    } else {
      multiElements.push(element)
    }
  })

  if (multiElements.length > 0) {
    for (let index = 1; index <= multiElements.length / 3; index++) {
      const filtered = multiElements.filter((element) => {
        if (element.name.includes(index.toString())) {
          return element
        }
      })
      multiElementsToRender.push(
        <fieldset className={styles.input_container}>
          {filtered.map((element, index) => {
            return (
              <Fragment key={index}>
                <InputElement
                  style={{
                    borderColor:
                      validationErrors[element.name] && 'rgb(249 115 22)'
                  }}
                  inputStyles={`${styles.multi_input}`}
                  labelStyles={`${styles.label} ${wide && styles.wide_label}`}
                  name={element.name}
                  label={index === 0 ? 'Ingredient' : ''}
                  type={element.type}
                  placeholder={element.label}
                  value={values[element.name]}
                  onBlur={() => handleTouch(element.name)}
                  onChange={(e) => handleChange(element.name, e.target.value)}
                />
              </Fragment>
            )
          })}
        </fieldset>
      )
    }
  }

  const handleInputs = (element: IInput, index: number) => {
    if (element.type === 'file') {
      return (
        <Fragment key={index}>
          <FileDropzone
            zoneStyles={`${styles.dropzone} ${wide && styles.wide_dropzone}`}
            innerZoneStyles={styles.dropzone_inner}
            labelStyles={`${styles.dropzone_lable} ${wide && styles.wide_dropzone_lable}`}
            onUpload={setImage}
          />
        </Fragment>
      )
    }

    return (
      <Fragment key={index}>
        <InputElement
          style={{
            borderColor: validationErrors[element.name] && 'rgb(249 115 22)'
          }}
          inputStyles={`${styles.input} ${wide && styles.wide_input}`}
          labelStyles={`${styles.label} ${wide && styles.wide_label}`}
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
    )
  }

  return (
    <form
      className={`${styles.form} ${wide && styles.wide_form}`}
      onSubmit={(e) => handleSubmit(e)}
      noValidate={noValidate}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {elementsToRender.map((element, index) => handleInputs(element, index))}
      {multiElementsToRender}
      {additionalHandler && (
        <Button label="Add ingredient" onClick={additionalHandler} />
      )}

      {checkIfErrorsExist && (
        <ul className={styles.error}>
          {Object.keys(validationAndsubmissionErrors).map((key) => {
            return <li key={key}>{validationAndsubmissionErrors[key]}</li>
          })}
        </ul>
      )}
      <Button label={label} type="submit" disabled={isValid} />
    </form>
  )
}

export { Form }
