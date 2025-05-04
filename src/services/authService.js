// Mock authentication API

// Mock user database
const users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  }
]

// Helper functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const findUserByEmail = (email) => {
  return users.find(user => user.email === email)
}

// Login API function
export const login = async (email, password) => {
  // Simulate API request delay
  await delay(800)
  
  // Find user by email
  const user = findUserByEmail(email)
  
  // If user not found or password doesn't match
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password')
  }
  
  // Create a safe user object without password
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email
  }
  
  // Generate a mock token
  const token = `mock-auth-token-${Date.now()}`
  
  return { user: safeUser, token }
}

// Signup API function
export const signup = async (name, email, password) => {
  // Simulate API request delay
  await delay(800)
  
  // Check if user already exists
  const existingUser = findUserByEmail(email)
  if (existingUser) {
    throw new Error('Email already in use')
  }
  
  // Create new user
  const newUser = {
    _id: `${users.length + 1}`,
    name,
    email,
    password
  }
  
  // Add to mock database
  users.push(newUser)
  
  // Create a safe user object without password
  const safeUser = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email
  }
  
  // Generate a mock token
  const token = `mock-auth-token-${Date.now()}`
  
  return { user: safeUser, token }
}