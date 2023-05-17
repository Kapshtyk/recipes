import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getRecipes, getUsers, getAllComments } from './api/APIrecipes'
import { CommentsType } from './types/comments'
import { RecipesType } from './types/recipes'
import { CurrentUserType, UsersType } from './types/users'
import {
  UsersContext,
  CommentsContext,
  RecipesContext,
  CurrentUserContext
} from './utils/context'

import About from './components/About'
import Authorization from './components/Authorization'
import AddRecipe from './components/AddRecipe'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import RecipesBlock from './components/RecipesBlock'
import Recipe from './components/Recipe'
import Layout from './UI/Layout'

import cl from './styles/App.module.css'

function App() {
  const [recipes, setRecipes] = useState<RecipesType | null>(null)
  const [users, setUsers] = useState<UsersType | null>(null)
  const [comments, setComments] = useState<CommentsType | null>(null)
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null)
  const [recipesLoaded, setRecipesLoaded] = useState(false)

  useEffect(() => {
    Promise.all([getRecipes(), getUsers(), getAllComments()]).then(
      ([recipes, users, comments]) => {
        setRecipes(recipes)
        setUsers(users)
        setComments(comments)
        setRecipesLoaded(true)
      }
    )
  }, [])

  const fetchComments = () => {
    getAllComments().then((data) => {
      setComments(data)
    })
  }

  const fetchRecipes = () => {
    getRecipes().then((data) => {
      setRecipes(data)
    })
  }

  const logout = () => {
    setCurrentUser(undefined)
  }

  if (!recipesLoaded) {
    return (
      <BrowserRouter>
        <Layout>
          <div className={cl.plug}>Loading...</div>
        </Layout>
      </BrowserRouter>
    )
  }

  if (recipesLoaded && recipes && recipes.length === 0) {
    return (
      <BrowserRouter>
        <Layout>
          <div className={cl.plug}>
            No recipe yet! Your soup could be the first!
          </div>
        </Layout>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <UsersContext.Provider value={{ users, setUsers }}>
        <CommentsContext.Provider
          value={{ comments, setComments, fetchComments }}
        >
          <RecipesContext.Provider
            value={{ recipes, setRecipes, fetchRecipes }}
          >
            <CurrentUserContext.Provider
              value={{ currentUser, setCurrentUser, logout }}
            >
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/recipes" element={<RecipesBlock />} />
                  <Route
                    path="/login"
                    element={<Authorization hasAccount={true} />}
                  />
                  <Route
                    path="/signup"
                    element={<Authorization hasAccount={false} />}
                  />
                  <Route path="/recipes/:recipe_id" element={<Recipe />} />
                  <Route
                    path="/add-recipe"
                    element={
                      <ProtectedRoute>
                        <AddRecipe />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Layout>
            </CurrentUserContext.Provider>
          </RecipesContext.Provider>
        </CommentsContext.Provider>
      </UsersContext.Provider>
    </BrowserRouter>
  )
}

export default App
