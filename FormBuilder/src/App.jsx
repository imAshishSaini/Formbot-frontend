import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginRegister from './pages/LoginRegister'
import Workspace from './pages/Workspace'
import Settings from './pages/Settings'
import FormPage from './pages/FormPage'
import UserForm from './pages/UserForm'
import API from './services/api'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const { data } = await API.get('/api/user/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
          })
          toast.success('Token is valid')
          setIsAuthenticated(true)
        } catch (error) {
          toast.error('Token validation failed')
          console.error('Token validation failed:', error.message)
          setIsAuthenticated(false)
          localStorage.removeItem('token')
        }
      }
      setIsLoading(false)
    }

    validateToken()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login-register" element={<LoginRegister setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/workspace" element={isAuthenticated ? <Workspace handleLogout={handleLogout} /> : <Navigate to="/login-register" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings handleLogout={handleLogout} /> : <Navigate to="/login-register" />} />
        <Route path="/form" element={isAuthenticated ? <FormPage /> : <Navigate to="/login-register" />} />
        <Route path="/user-form/:id" element={<UserForm />} />
      </Routes>
    </Router>
  )
}

export default App