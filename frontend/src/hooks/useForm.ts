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
}

export function useForm({ initialValues, validators }: IForm): IUseForm {
  const [values, setValues] = useState<IFormValuesAndErrors>(initialValues)
  const [errors, setErrors] = useState<IFormValuesAndErrors>({})
  const [touched, setTouched] = useState<ITouchedFields>({})

  useEffect(() => {
    console.log(values)
    checkValues()
  }, [values, touched])

  const checkValues = () => {
    const newErrors: IFormValuesAndErrors = {}

    Object.keys(values).forEach((key) => {
      const value = values[key]
      const validator = validators && validators[key]

      if (touched[key] && validator) {
        const error = validator(value, values)
        if (error && typeof error === 'string') {
          newErrors[key] = error
        }
      }
    })

    setErrors(newErrors)
  }

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleTouch = (name: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }))
  }

  return {
    values,
    errors,
    handleChange,
    handleTouch
  }
}
