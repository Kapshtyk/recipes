import React from 'react'

export interface IFormValuesAndErrors {
  [key: string]: string
}

export interface ITouchedFields {
  [key: string]: boolean
}

export interface IUseFormProps {
  initialValues: IFormValuesAndErrors
  validators?: {
    [key: string]: (value: string, values: IFormValuesAndErrors) => string | null
  }
}

export interface IUseFormReturn {
  values: IFormValuesAndErrors
  errors: IFormValuesAndErrors
  handleChange: (name: string, value: string) => void
  handleTouch: (name: string) => void
  isFormTouched: boolean
}

export interface IForm {
  inputElements: IInput[]
  title?: string
  noValidate?: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>, values: any) => void
  submittingErrors?: { [key: string]: string }
  validators?: {
    [key: string]: (value: string, values: { [key: string]: string }) => string | null
  }
  wide?: boolean
  full?: boolean
  label: string
  additionalHandler?: () => void
  additionalHandlerLabel?: string
  setValues?: React.Dispatch<React.SetStateAction<any>>
}

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label: string
  name: string
  value: string
  type: string
  wide?: boolean
  validationErrors?: string | undefined
}

export interface IDropZone {
  onUpload: (data: string) => void
  accept?: string
  wide?: boolean
}

export interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  wide?: boolean
  value: string
  validationErrors?: string | undefined
}

export interface ISelect extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  wide?: boolean
  value: string
  validationErrors?: string | undefined
}
