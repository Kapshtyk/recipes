import { createContext } from 'react'

import { CommentsType } from '../types/comments'
import { RecipesType } from '../types/recipes'
import { CurrentUserType, UsersType } from '../types/users'

export interface IUserContext {
  readonly users: UsersType | null
  readonly setUsers: (users: UsersType) => void
  readonly fetchUsers: () => void
}

interface ICommentsContext {
  readonly comments: CommentsType | null
  readonly setComments: (comments: CommentsType) => void
  readonly fetchComments: () => void
}

interface IRecipesContext {
  readonly recipes: RecipesType | null
  readonly setRecipes: (recipes: RecipesType) => void
  readonly fetchRecipes: () => void
}

interface ICurrentUser {
  readonly currentUser: CurrentUserType | null
  readonly setCurrentUser: (currentUser: CurrentUserType) => void
  readonly logout: () => void
}

export const UsersContext = createContext<IUserContext>({
  users: null,
  setUsers: () => null,
  fetchUsers: () => null
})

export const CommentsContext = createContext<ICommentsContext>({
  comments: null,
  setComments: () => null,
  fetchComments: () => null
})

export const RecipesContext = createContext<IRecipesContext>({
  recipes: null,
  setRecipes: () => null,
  fetchRecipes: () => null
})

export const CurrentUserContext = createContext<ICurrentUser>({
  currentUser: null,
  setCurrentUser: () => null,
  logout: () => null
})
