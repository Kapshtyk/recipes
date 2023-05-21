import { CommentType, CommentsType } from '../types/comments'
import { RecipeType, RecipesType } from '../types/recipes'
import { UsersType, UserType } from '../types/users'
import { BASE_URL } from '../utils/constants'
import axios, { AxiosResponse } from 'axios'

async function processRequest<T>(method: 'GET' | 'POST', url: string, data?: unknown): Promise<T | [] | object> {
  try {
    const response: AxiosResponse<T> = await axios({ method, url, data })
    if (response.status === 200 || response.status === 201) {
      return response.data
    } else if (response.status === 400) {
      console.error('Bad request')
    } else if (response.status >= 500) {
      console.error('Server not responding')
    } else {
      console.error(`Server returned the status code ${response.status}`)
    }
    if (method === 'GET') {
      return [] as T[]
    } else {
      return { message: `Something went wrong with the POST request to ${url}` }
    }
  } catch (error) {
    console.error(`There is an error with the ${method} request to ${url}: ${error}`)
  }
  if (method === 'GET') {
    return [] as T[]
  } else {
    return { message: `Something went wrong with the POST request to ${url}` }
  }
}

export const getRecipes = async (): Promise<RecipesType> => {
  const url = BASE_URL + 'recipes'
  const result = await processRequest<RecipesType>('GET', url)
  if (Array.isArray(result)) {
    return result
  } else {
    return []
  }
}

export const addRecipe = async (recipe: RecipeType): Promise<RecipeType> => {
  const url = BASE_URL + 'recipes'
  const result = await processRequest<RecipeType>('POST', url, recipe)
  if ('id' in result) {
    return result
  } else {
    return {message: 'Something went wrong when adding new recipe'}
  }
}

export const addComment = async (
  comment: CommentType
): Promise<CommentType> => {
  const url = BASE_URL + 'comments'
  if ('authorId' in comment) {
    const result = await processRequest<CommentType>('POST', url, comment)
    if ('id' in result) {
      return result
    }
  }
  return {message: 'Something went wrong when adding new comment'}
}

export const getAllComments = async (): Promise<CommentsType> => {
  const url = BASE_URL + 'comments?_sort=createdAt&_order=desc'
  const result = await processRequest<CommentsType>('GET', url)
  if (Array.isArray(result)) {
    return result
  } else {
    return []
  }
}

export const getUsers = async (): Promise<UsersType> => {
  try {
    const response = await axios.get(BASE_URL + 'users')
    if (response.status === 200) {
      return response.data
    } else {
      console.error(`Server returned the status code ${response.status}`)
      return []
    }
  } catch (error) {
    console.error(`There is an error: ${error}`)
    return []
  }
}

export const addUser = async (user: UserType): Promise<UserType> => {
  if ('firstname' in user) {
    try {
      const response = await axios.post(BASE_URL + 'users', {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      })
      if (response.status === 201) {
        return response.data
      } else if (response.status === 400) {
        console.error('Bad request')
      } else if (response.status >= 500) {
        console.error('Server not responding')
      } else {
        console.error(`Server returned the status code ${response.status}`)
      }
      return {message: 'Something went wrong when creating the user'}
    } catch (error) {
      console.error(`There is an error: ${error}`)
      return {message: 'Something went wrong when creating the user'}
    }
  }
  return {message: 'Something went wrong when creating the user'}
}
