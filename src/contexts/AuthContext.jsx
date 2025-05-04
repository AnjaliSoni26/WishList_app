import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, signup as apiSignup } from '../services/authService'

// Create context
const AuthContext = createContext()

// Context provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user')
      const storedToken = localStorage.getItem('token')
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { user, token } = await apiLogin(email, password)
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true }
    } catch (err) {
      setError(err.message || 'Failed to login')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { user, token } = await apiSignup(name, email, password)
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true }
    } catch (err) {
      setError(err.message || 'Failed to sign up')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}