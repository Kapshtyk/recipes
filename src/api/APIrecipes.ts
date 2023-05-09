import { BASE_URL } from '../utils/constants'
import axios, { AxiosError } from 'axios'

export const getRecipes = async () => {
  try {
    const response = await axios.get(BASE_URL + 'recipes/')
    const data = response.data
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
