import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchUsers } from './store/reducers/ActionCreators'

const App = () => {
  const { users, isLoading, error } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  return (
    <div style={{
      padding: '20px',
    }}>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users)}
    </div>
  )
}

export default App