import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './UI/Layout'
import { getAllComments, getRecipes, getUsers } from './api/APIrecipes'
import AddRecipe from './components/AddRecipe'
import About from './pages/About'
import Authorization from './pages/Authorization'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import RecipesBlock from './pages/RecipesBlock'
import cl from './styles/App.module.css'
import { CommentsType } from './types/comments'
import { RecipesType } from './types/recipes'
import { CurrentUserType, UsersType } from './types/users'
import ProtectedRoute from './utils/ProtectedRoute'
import {
  CommentsContext,
  CurrentUserContext,
  RecipesContext,
  UsersContext
} from './utils/context'
import { useAppSelector } from './hooks/redux'

function App() {
  const [recipes, setRecipes] = useState<RecipesType | null>(null)
  const [users2, setUsers] = useState<UsersType | null>(null)
  const [comments, setComments] = useState<CommentsType | null>(null)
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null)
  const [recipesLoaded, setRecipesLoaded] = useState(false)

  const { users } = useAppSelector(state => state.userReducer)

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

  const fetchUsers = () => {
    getUsers().then((data) => {
      setUsers(data)
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
          <div className={cl.plug}>No recipe yet!</div>
          <div className={cl.plug}>Your soup could be the first!</div>
        </Layout>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <UsersContext.Provider value={{ users, setUsers, fetchUsers }}>
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
