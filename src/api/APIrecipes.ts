import { CommentType } from '../types/comments'
import { RecipeType } from '../types/recipes'
import { UserType } from '../types/users'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

export const getRecipes = async () => {
  try {
    const response = await axios.get(BASE_URL + 'recipes')
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addRecipe = async (recipe: RecipeType) => {
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
    }
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async (comment: CommentType) => {
  try {
    const response = await axios.post(BASE_URL + 'comments', {
      authorId: comment.authorId,
      recipeId: comment.recipeId,
      text: comment.text,
      createdAt: comment.createdAt
    })
    if (response.status === 201) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getAllComments = async () => {
  try {
    const response = await axios.get(
      BASE_URL + 'comments?_sort=createdAt&_order=desc'
    )
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(BASE_URL + 'users')
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addUser = async (user: UserType) => {
  try {
    const response = await axios.post(BASE_URL + 'users', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    })
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}
