export type UsersType = {
  users: UserType[]
}

export type UserType = {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
}

export type CurrentUserType = UserType | undefined
