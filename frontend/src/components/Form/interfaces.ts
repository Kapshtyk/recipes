import { IInput } from '../InputComponent/interfaces'

export interface IFormProps {
  inputElements: IInput[]
  title?: string
  noValidate?: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>, values: object) => void
}
