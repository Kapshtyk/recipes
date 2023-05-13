import React, { Dispatch, SetStateAction } from 'react'

import { createContext } from 'react'
import { CurrentUserType, UserType } from '../types/users'
import { CommentType } from '../types/comments'
import { RecipeType } from '../types/recipes'

export type UsersContextType = [
  UserType[],
  React.Dispatch<React.SetStateAction<UserType[]>>
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
  React.Dispatch<React.SetStateAction<CurrentUserType | undefined>>
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
    fetchComments: () => {/* This function intentionally left empty */}
  }

])

export const RecipesContext = createContext<RecipesContextType>([
  [],
  () => {
    /* This function intentionally left empty */
  },
  {
    fetchRecipes: () => {/* This function intentionally left empty */}
  }
])

export const CurrentUserContext = createContext<CurrentUserContextType>([
  undefined,
  () => {
    /* This function intentionally left empty */
  }
])
