import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getRecipes, getUsers, getAllComments } from './api/APIrecipes'
import RecipesBlock from './components/RecipesBlock'
import Recipe from './components/Recipe'
import {
  UsersContext,
  CommentsContext,
  RecipesContext,
  CurrentUserContext
} from './utils/context'
import { CommentType } from './types/comments'
import { RecipeType } from './types/recipes'
import { CurrentUserType, UserType } from './types/users'
import AddRecipe from './components/AddRecipe'
import ProtectedRoute from './components/ProtectedRoute'
import cl from './styles/App.module.css'
import Layout from './UI/Layout'
import Home from './components/Home'
import About from './components/About'
import Authorization from './components/Authorization'

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUserType>()
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

  if (recipesLoaded && recipes.length === 0) {
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
      <UsersContext.Provider value={[users, setUsers]}>
        <CommentsContext.Provider
          value={[comments, setComments, { fetchComments }]}
        >
          <RecipesContext.Provider
            value={[recipes, setRecipes, { fetchRecipes }]}
          >
            <CurrentUserContext.Provider
              value={[currentUser, setCurrentUser, { logout }]}
            >
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/recipes" element={<RecipesBlock />} />
                  <Route path="/login" element={<Authorization hasAccount={true}/>} />
                  <Route path="/signup" element={<Authorization hasAccount={false}/>} />
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
