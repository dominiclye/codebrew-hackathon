import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/User_pages/Login'
import Register from './pages/User_pages/Register'
import FlashcardsPage from './pages/Flashcard_pages/Flashcards'
import CreateSetPage from './pages/Flashcard_pages/CreateSet'
import Landing from './pages/Landing'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/create-set" element={<CreateSetPage />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App