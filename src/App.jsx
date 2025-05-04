import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/common/LoadingSpinner'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import WishlistDetail from './pages/WishlistDetail'
import CreateWishlist from './pages/CreateWishlist'
import NotFound from './pages/NotFound'

// Context
import { useAuth } from './contexts/AuthContext'

function App() {
  const { isAuthenticated, loading } = useAuth()
  const [isAppLoaded, setIsAppLoaded] = useState(false)

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsAppLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isAppLoaded || loading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/wishlist/new" element={isAuthenticated ? <CreateWishlist /> : <Navigate to="/login" />} />
          <Route path="/wishlist/:id" element={isAuthenticated ? <WishlistDetail /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App