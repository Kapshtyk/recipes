import { CommentType, CommentsType } from '../types/comments'
import { RecipeType, RecipesType } from '../types/recipes'
import { UsersType, UserType } from '../types/users'
import { BASE_URL } from '../utils/constants'
import axios, { AxiosResponse } from 'axios'

async function processRequest<T>(
  method: 'GET' | 'POST',
  url: string,
  data?: unknown
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios({ method, url, data })
    if (response.status === 200 || response.status === 201) {
      return response.data
    } else if (response.status === 400) {
      throw new Error('Bad request')
    } else if (response.status >= 500) {
      throw new Error('Server not responding')
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    throw new Error(
      `There is an error with the ${method} request to ${url}: ${error}`
    )
  }
}

const checkArray = (data: unknown) => {
  if (Array.isArray(data)) {
    return data
  } else {
    return []
  }
}

export const getRecipes = async (): Promise<RecipesType> => {
  const url = BASE_URL + 'recipes'
  try {
    const result = await processRequest<RecipesType>('GET', url)
    return checkArray(result)
  } catch (error) {
    console.error(error)
    return []
  }
}

export const addRecipe = async (recipe: RecipeType): Promise<RecipeType> => {
  const url = BASE_URL + 'recipes'
  try {
    const result = await processRequest<RecipeType>('POST', url, recipe)
    if ('id' in result) {
      return result
    } else {
      throw new Error(String(result.message))
    }
  } catch (error) {
    console.error(error)
    return { message: 'Something went wrong when adding a new recipe' }
  }
}

export const addComment = async (
  comment: CommentType
): Promise<CommentType> => {
  const url = BASE_URL + 'comments'
  if ('authorId' in comment) {
    try {
      const result = await processRequest<CommentType>('POST', url, comment)
      if ('id' in result) {
        return result
      } else if ('message' in result) {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error(error)
      return { message: 'Something went wrong when adding a new comment' }
    }
  }
  return { message: 'Something went wrong when adding a new comment' }
}

export const getAllComments = async (): Promise<CommentsType> => {
  const url = BASE_URL + 'comments?_sort=createdAt&_order=desc'
  try {
    const result = await processRequest<CommentsType>('GET', url)
    return checkArray(result)
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getUsers = async (): Promise<UsersType> => {
  const url = BASE_URL + 'users'
  try {
    const result = await processRequest<UsersType>('GET', url)
    return checkArray(result)
  } catch (error) {
    console.error(error)
    return []
  }
}

export const addUser = async (user: UserType): Promise<UserType> => {
  const url = BASE_URL + 'users'
  if ('firstname' in user) {
    try {
      const result = await processRequest<UserType>('POST', url, user)
      if ('id' in result) {
        return result
      } else if ('message' in result) {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error(error)
      return { message: 'Something went wrong when adding a new comment' }
    }
  }
  return { message: 'Something went wrong when adding a new comment' }
}
