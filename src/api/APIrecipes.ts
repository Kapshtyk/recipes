import { CommentType, CommentsType } from '../types/comments'
import { RecipeType, RecipesType } from '../types/recipes'
import { UsersType, UserType } from '../types/users'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

export const getRecipes = async (): Promise<RecipesType> => {
  try {
    const response = await axios.get(BASE_URL + 'recipes')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    throw new Error(`There is an error: ${error}`)
  }
}

export const addRecipe = async (recipe: RecipeType): Promise<RecipeType> => {
  try {
    const response = await axios.post(BASE_URL + 'recipes', {
      title: recipe.title,
      description: recipe.description,
      instruction: recipe.instruction,
      origin: recipe.origin,
      authorId: recipe.authorId,
      image: recipe.image,
      ingredients: recipe.ingredients
    })
    if (response.status === 201) {
      return response.data
    } else if (response.status === 400) {
      throw new Error('Bad request')
    } else if (response.status >= 500) {
      throw new Error('Server not responding')
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    console.log(error)
    throw new Error(`There is an error: ${error}`)
  }
}

export const addComment = async (
  comment: CommentType
): Promise<CommentType> => {
  try {
    const response = await axios.post(BASE_URL + 'comments', {
      authorId: comment.authorId,
      recipeId: comment.recipeId,
      text: comment.text,
      createdAt: comment.createdAt
    })
    if (response.status === 201) {
      return response.data
    } else if (response.status === 400) {
      throw new Error('Bad request')
    } else if (response.status >= 500) {
      throw new Error('Server not responding')
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    throw new Error(`There is an error: ${error}`)
  }
}

export const getAllComments = async (): Promise<CommentsType> => {
  try {
    const response = await axios.get(
      BASE_URL + 'comments?_sort=createdAt&_order=desc'
    )
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    throw new Error(`There is an error: ${error}`)
  }
}

export const getUsers = async (): Promise<UsersType> => {
  try {
    const response = await axios.get(BASE_URL + 'users')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    throw new Error(`There is an error: ${error}`)
  }
}

export const addUser = async (user: UserType): Promise<UserType> => {
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
      throw new Error('Bad request')
    } else if (response.status >= 500) {
      throw new Error('Server not responding')
    } else {
      throw new Error(`Server returned the status code ${response.status}`)
    }
  } catch (error) {
    console.log(error)
    throw new Error(`There is an error: ${error}`)
  }
}
