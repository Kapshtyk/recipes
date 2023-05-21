export type UsersType = UserType[]

export type UserType = {
  id?: number
  firstname: string
  lastname: string
  email: string
  password: string
} | UserError

export type CurrentUserType = UserType | undefined

export type AuthorizationUserDataType = {
  firstname: string
  lastname: string
  email: string
  password: string
}

export type AuthorizationType = {
  hasAccount: boolean
}

export type UserError = {
  message: string
}
