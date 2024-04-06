import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/User_pages/Login'
import Register from './pages/User_pages/Register'
import FlashcardsPage from './pages/Flashcard_pages/Flashcards'
import CreateSetPage from './pages/Flashcard_pages/CreateSet'
import Landing from './pages/Landing'
import ProtectedRoute from './ProtectedRoute'
import FlashcardPracticePage from './pages/Flashcard_pages/FlashcardPracticePage'
import TodoList from "./pages/Todo_pages/TodoList"
import ChatPage from './pages/AI/ChatPage'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
        <Route path="/create-set" element={<ProtectedRoute><CreateSetPage /></ProtectedRoute>} />
        <Route path="/flashcards/:setId/practice" element={<ProtectedRoute><FlashcardPracticePage /></ProtectedRoute>} />
        <Route path="/todo" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

        <Route path="/" element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        } />
        
      </Routes>
    </Router>
  )
}

export default App