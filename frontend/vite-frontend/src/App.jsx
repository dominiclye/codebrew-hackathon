import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import FlashcardsPage from './pages/Flashcards'
import CreateFlashcardPage from './pages/CreateFlashcard'
import Landing from './pages/Landing'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/create-flashcard" element={<CreateFlashcardPage />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default App