// Mock wishlist data
let wishlists = [
  {
    _id: '1',
    title: 'Birthday Wishlist',
    description: 'Items I want for my upcoming birthday',
    creator: {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    collaborators: [],
    products: [
      {
        _id: '101',
        name: 'AirPods Pro',
        price: 249.99,
        imageUrl: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=500',
        addedBy: {
          _id: '1',
          name: 'John Doe'
        },
        createdAt: '2023-04-15T10:30:00Z'
      },
      {
        _id: '102',
        name: 'Nike Air Max',
        price: 129.99,
        imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
        addedBy: {
          _id: '1',
          name: 'John Doe'
        },
        createdAt: '2023-04-16T14:20:00Z'
      }
    ],
    createdAt: '2023-04-15T09:00:00Z',
    updatedAt: '2023-04-16T14:20:00Z'
  },
  {
    _id: '2',
    title: 'Home Office Essentials',
    description: 'Things I need for my new home office setup',
    creator: {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    collaborators: [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    ],
    products: [
      {
        _id: '201',
        name: 'Ergonomic Chair',
        price: 299.99,
        imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=500',
        addedBy: {
          _id: '2',
          name: 'Jane Smith'
        },
        createdAt: '2023-04-17T11:15:00Z'
      },
      {
        _id: '202',
        name: 'Standing Desk',
        price: 449.99,
        imageUrl: 'https://images.pexels.com/photos/3740219/pexels-photo-3740219.jpeg?auto=compress&cs=tinysrgb&w=500',
        addedBy: {
          _id: '2',
          name: 'Jane Smith'
        },
        createdAt: '2023-04-17T11:30:00Z'
      },
      {
        _id: '203',
        name: 'Monitor Light Bar',
        price: 79.99,
        imageUrl: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500',
        addedBy: {
          _id: '1',
          name: 'John Doe'
        },
        createdAt: '2023-04-18T09:45:00Z'
      }
    ],
    createdAt: '2023-04-17T11:00:00Z',
    updatedAt: '2023-04-18T09:45:00Z'
  }
]

// Helper functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate a new ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Get all wishlists
export const getWishlists = async (userId) => {
  await delay(600)
  
  // Return wishlists where user is creator or collaborator
  return wishlists.filter(wishlist => 
    wishlist.creator._id === userId || 
    wishlist.collaborators.some(collab => collab._id === userId)
  )
}

// Get wishlist by ID
export const getWishlistById = async (id) => {
  await delay(600)
  
  const wishlist = wishlists.find(w => w._id === id)
  
  if (!wishlist) {
    throw new Error('Wishlist not found')
  }
  
  return wishlist
}

// Create a new wishlist
export const createWishlist = async (wishlistData, user) => {
  await delay(800)
  
  const newWishlist = {
    _id: generateId(),
    ...wishlistData,
    creator: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    collaborators: [],
    products: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  wishlists.push(newWishlist)
  
  return newWishlist
}

// Update wishlist
export const updateWishlist = async (id, updateData) => {
  await delay(800)
  
  const index = wishlists.findIndex(w => w._id === id)
  
  if (index === -1) {
    throw new Error('Wishlist not found')
  }
  
  const updatedWishlist = {
    ...wishlists[index],
    ...updateData,
    updatedAt: new Date().toISOString()
  }
  
  wishlists[index] = updatedWishlist
  
  return updatedWishlist
}

// Delete wishlist
export const deleteWishlist = async (id) => {
  await delay(800)
  
  const index = wishlists.findIndex(w => w._id === id)
  
  if (index === -1) {
    throw new Error('Wishlist not found')
  }
  
  wishlists = wishlists.filter(w => w._id !== id)
  
  return { success: true }
}

// Add product to wishlist
export const addProduct = async (wishlistId, productData, user) => {
  await delay(600)
  
  const wishlist = wishlists.find(w => w._id === wishlistId)
  
  if (!wishlist) {
    throw new Error('Wishlist not found')
  }
  
  const newProduct = {
    _id: generateId(),
    ...productData,
    addedBy: {
      _id: user._id,
      name: user.name
    },
    createdAt: new Date().toISOString()
  }
  
  wishlist.products.push(newProduct)
  wishlist.updatedAt = new Date().toISOString()
  
  return newProduct
}

// Update product in wishlist
export const updateProduct = async (wishlistId, productId, updateData) => {
  await delay(600)
  
  const wishlist = wishlists.find(w => w._id === wishlistId)
  
  if (!wishlist) {
    throw new Error('Wishlist not found')
  }
  
  const productIndex = wishlist.products.findIndex(p => p._id === productId)
  
  if (productIndex === -1) {
    throw new Error('Product not found')
  }
  
  wishlist.products[productIndex] = {
    ...wishlist.products[productIndex],
    ...updateData
  }
  
  wishlist.updatedAt = new Date().toISOString()
  
  return wishlist.products[productIndex]
}

// Remove product from wishlist
export const removeProduct = async (wishlistId, productId) => {
  await delay(600)
  
  const wishlist = wishlists.find(w => w._id === wishlistId)
  
  if (!wishlist) {
    throw new Error('Wishlist not found')
  }
  
  const productExists = wishlist.products.some(p => p._id === productId)
  
  if (!productExists) {
    throw new Error('Product not found')
  }
  
  wishlist.products = wishlist.products.filter(p => p._id !== productId)
  wishlist.updatedAt = new Date().toISOString()
  
  return { success: true }
}

// Invite user to wishlist
export const inviteUserToWishlist = async (wishlistId, email) => {
  await delay(800)
  
  // Mock finding a user by email
  const mockUser = {
    _id: `mock-${generateId().substring(0, 5)}`,
    name: email.split('@')[0],
    email
  }
  
  const wishlist = wishlists.find(w => w._id === wishlistId)
  
  if (!wishlist) {
    throw new Error('Wishlist not found')
  }
  
  // Check if user is already a collaborator
  const alreadyCollaborator = wishlist.collaborators.some(
    c => c.email === email
  )
  
  if (alreadyCollaborator) {
    throw new Error('User is already a collaborator')
  }
  
  // Add user to collaborators
  wishlist.collaborators.push(mockUser)
  wishlist.updatedAt = new Date().toISOString()
  
  return { 
    success: true, 
    message: `Invitation sent to ${email}` 
  }
}