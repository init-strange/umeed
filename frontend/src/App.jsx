import React from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import Notfound from './components/Notfound'
// import Register from './pages/Register'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
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
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/questions" element={<Questionspage />} />
        <Route path="/analysis" element={<Analysispage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
