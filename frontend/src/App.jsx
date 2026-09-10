import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import Notfound from './components/Notfound'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Questionspage from './pages/Questionspage'
import Analysispage from './pages/Analysispage'
import { Routes, Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  return isLoggedIn ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <div className="flex flex-col text-center justify-center items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<Questionspage />} />
        <Route path="/analysis" element={<Analysispage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App