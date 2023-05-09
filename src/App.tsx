import React from 'react'
import md5 from 'md5'

function App() {
  const pass = md5('ramsay')
  return <h1>{pass}</h1>
}

export default App
