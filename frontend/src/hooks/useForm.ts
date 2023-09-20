import { useEffect, useState } from 'react'

export interface IFormValuesAndErrors {
  [key: string]: string
}

interface ITouchedFields {
  [key: string]: boolean
}

interface IForm {
  initialValues: IFormValuesAndErrors
  validators?: {
    [key: string]: (
      value: string,
      values: IFormValuesAndErrors
    ) => string | null
  }
}

interface IUseForm {
  values: IFormValuesAndErrors
  errors: IFormValuesAndErrors
  handleChange: (name: string, value: string) => void
  handleTouch: (name: string) => void
  isFormTouched: boolean
}

export function useForm({ initialValues, validators }: IForm): IUseForm {
  const [values, setValues] = useState<IFormValuesAndErrors>(initialValues)
  const [errors, setErrors] = useState<IFormValuesAndErrors>({})
  const [isFieldTouched, setIsFieldTouched] = useState<ITouchedFields>({})
  const [isFormTouched, setIsFormTouched] = useState<boolean>(false)

  useEffect(() => {
    setValues({ ...initialValues })
  }, [initialValues])

  useEffect(() => {
    checkValues()
  }, [isFieldTouched])

  const checkValues = () => {
    const newErrors: IFormValuesAndErrors = {}

    Object.keys(values).forEach((key) => {
      const value = values[key]
      const validator = validators && validators[key]

      if (isFieldTouched[key] && validator) {
        const error = validator(value, values)
        if (error && typeof error === 'string') {
          newErrors[key] = error
        }
      }
    })

    setErrors(newErrors)
  }

  const handleChange = (name: string, value: string) => {
    setIsFormTouched(true)
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleTouch = (name: string) => {
    setIsFieldTouched((prevIsFieldTouched) => ({
      ...prevIsFieldTouched,
      [name]: true
    }))
  }

  return {
    values,
    errors,
    handleChange,
    handleTouch,
    isFormTouched
  }
}
