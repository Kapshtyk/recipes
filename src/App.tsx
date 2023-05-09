import React, { useState, useEffect } from 'react'
import { getRecipes, getUsers, getAllComments } from './api/APIrecipes'
import RecipesBlock from './components/RecipesBlock'
import { RecipeType } from './types/recipes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './UI/Header'
import Recipe from './components/Recipe'
import { UsersContext, CommentsContext, RecipesContext } from './utils/context'
import { CommentType } from './types/comments'
import { UserType } from './types/users'

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])

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

  if (recipes.length === 0) {
    return <div></div>
  }

  return (
    <BrowserRouter>
      <UsersContext.Provider value={[users, setUsers]}>
        <CommentsContext.Provider value={[comments, setComments]}>
          <RecipesContext.Provider value={[recipes, setRecipes]}>
            <Header />
            <Routes>
              <Route path="/" element={<RecipesBlock recipes={recipes} />} />
              <Route path="/recipes/:recipe_id" element={<Recipe />} />
            </Routes>
          </RecipesContext.Provider>
        </CommentsContext.Provider>
      </UsersContext.Provider>
    </BrowserRouter>
  )
}

export default App
