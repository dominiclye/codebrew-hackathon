import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import FlashcardsPage from './pages/Flashcards'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
      </Routes>
    </Router>
  )
}

export default App