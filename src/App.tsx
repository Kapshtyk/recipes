import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getRecipes, getUsers, getAllComments } from './api/APIrecipes'
import RecipesBlock from './components/RecipesBlock'
import Recipe from './components/Recipe'
import Header from './UI/Header'
import {
  UsersContext,
  CommentsContext,
  RecipesContext,
  CurrentUserContext
} from './utils/context'
import { CommentType } from './types/comments'
import { RecipeType } from './types/recipes'
import { CurrentUserType, UserType } from './types/users'
import { ProtectedRouteProps } from './types/protecredRoute'
import Login from './components/Login'
import AddRecipe from './components/AddRecipe'

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUserType>()

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data)
    })
  }, [])

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
    })
  }, [])

  useEffect(() => {
    getAllComments().then((data) => {
      setComments(data)
    })
  }, [])

  const fetchRecipes = () => {
    getRecipes().then((data) => {
      setRecipes(data)
    })
  }

  if (recipes.length === 0) {
    return <div></div>
  }

  const ProtectedRoute = ({ isLogged, children }: ProtectedRouteProps) => {
    if (!isLogged) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <BrowserRouter>
      <UsersContext.Provider value={[users, setUsers]}>
        <CommentsContext.Provider value={[comments, setComments]}>
          <RecipesContext.Provider value={[recipes, setRecipes]}>
            <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
              <Header />
              <Routes>
                <Route path="/" element={<RecipesBlock recipes={recipes} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipes/:recipe_id" element={<Recipe />} />
                <Route
                  path="/add-recipe"
                  element={<AddRecipe fetchRecipes={fetchRecipes} />}
                />
              </Routes>
            </CurrentUserContext.Provider>
          </RecipesContext.Provider>
        </CommentsContext.Provider>
      </UsersContext.Provider>
    </BrowserRouter>
  )
}

export default App
