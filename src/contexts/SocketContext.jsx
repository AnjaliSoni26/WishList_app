import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    let socketInstance = null

    if (isAuthenticated && user) {
      // Connect to the socket server
      socketInstance = io('http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token')
        }
      })

      // Set up event listeners
      socketInstance.on('connect', () => {
        console.log('Socket connected')
        setConnected(true)
      })

      socketInstance.on('disconnect', () => {
        console.log('Socket disconnected')
        setConnected(false)
      })

      socketInstance.on('error', (error) => {
        console.error('Socket error:', error)
      })

      setSocket(socketInstance)
    }

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [isAuthenticated, user])

  const subscribeToWishlist = (wishlistId) => {
    if (socket && connected) {
      socket.emit('subscribe', { wishlistId })
    }
  }

  const unsubscribeFromWishlist = (wishlistId) => {
    if (socket && connected) {
      socket.emit('unsubscribe', { wishlistId })
    }
  }

  return (
    <SocketContext.Provider 
      value={{ 
        socket, 
        connected, 
        subscribeToWishlist, 
        unsubscribeFromWishlist 
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}