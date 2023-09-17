import React, { Fragment, useEffect, useState } from 'react'

import { IForm } from '.'
import { IFormValuesAndErrors, useForm } from '../../hooks'
import { InputElement } from '../InputElement'
import { FileDropzone } from '../InputElement'
import styles from './Form.module.css'
import { Button } from '../../ui/Button'

const Form: React.FC<IForm> = ({
  inputElements,
  title,
  noValidate,
  onSubmit,
  submittingErrors,
  validators,
  wide,
  label
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

  return (
    <form
      className={`${styles.form} ${wide && styles.wide_form}`}
      onSubmit={(e) => handleSubmit(e)}
      noValidate={noValidate}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {inputElements.map((element, index) =>
        element.type != 'file' ? (
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
        ) : (
          <Fragment key={index}>
            <FileDropzone
              zoneStyles={`${styles.dropzone} ${wide && styles.wide_dropzone}`}
              innerZoneStyles={styles.dropzone_inner}
              labelStyles={`${styles.dropzone_lable} ${wide && styles.wide_dropzone_lable}`}
              onUpload={setImage}
            />
          </Fragment>
        )
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
