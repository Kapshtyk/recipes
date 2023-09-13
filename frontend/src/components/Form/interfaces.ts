import { IInput } from '../InputElement/interfaces'

export interface IForm {
  inputElements: IInput[]
  title?: string
  noValidate?: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>, values: object) => void
  submissionErrors?: { [key: string]: string }
  validators?: {
    [key: string]: (
      value: string,
      values: { [key: string]: string }
    ) => string | null
  }
}
