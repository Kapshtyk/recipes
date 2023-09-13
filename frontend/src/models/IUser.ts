// TODO: create separate models for registation and login
export interface IUser {
  username: string
  email: string
  password: string
  confirmPassword?: string
  _id?: string
  __v?: number
  token?: string
}

export interface IToken {
  token: string
}
