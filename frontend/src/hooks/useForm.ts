import { useState } from 'react'

export interface IFormValues {
  [key: string]: string
}

export interface IForm {
  initialValues: IFormValues
  validators?: {
    [key: string]: (value: string) => boolean
  }
}

interface IUseForm {
  values: IFormValues
  handleChange: (name: string, value: string) => void
}

export function useForm(initialValues: IFormValues): IUseForm {
  const [values, setValues] = useState<IFormValues>(initialValues)

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  return {
    values,
    handleChange
  }
}
