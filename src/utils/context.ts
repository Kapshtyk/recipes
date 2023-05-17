import { createContext, Dispatch, SetStateAction } from 'react'
import { CurrentUserType, UserType } from '../types/users'
import { CommentType } from '../types/comments'
import { RecipeType } from '../types/recipes'

export type UsersContextType = [
  UserType[],
  Dispatch<SetStateAction<UserType[]>>
]

export type CommentsContextType = [
  CommentType[],
  Dispatch<SetStateAction<CommentType[]>>,
  {
    fetchComments: () => void
  }
]

export type RecipesContextType = [
  RecipeType[],
  Dispatch<SetStateAction<RecipeType[]>>,
  {
    fetchRecipes: () => void
  }
]

export type CurrentUserContextType = [
  CurrentUserType | undefined,
  Dispatch<SetStateAction<CurrentUserType | undefined>>,
  {
    logout: () => void
  }
]

export const UsersContext = createContext<UsersContextType>([
  [],
  () => {
    /* This function intentionally left empty */
  }
])

export const CommentsContext = createContext<CommentsContextType>([
  [],
  () => {
    /* This function intentionally left empty */
  },
  {
    fetchComments: () => {
      /* This function intentionally left empty */
    }
  }
])

export const RecipesContext = createContext<RecipesContextType>([
  [],
  () => {
    /* This function intentionally left empty */
  },
  {
    fetchRecipes: () => {
      /* This function intentionally left empty */
    }
  }
])

export const CurrentUserContext = createContext<CurrentUserContextType>([
  undefined,
  () => {
    /* This function intentionally left empty */
  },
  {
    logout: () => {
      /* This function intentionally left empty */
    }
  }
])
