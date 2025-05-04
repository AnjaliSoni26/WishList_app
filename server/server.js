const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Mock database connection (would be real in production)
console.log('MongoDB connection would be established here in production');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Vite dev server
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Mock authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // In a real app, verify JWT token
  // For mock, we'll just continue
  next();
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Handle subscription to wishlist updates
  socket.on('subscribe', ({ wishlistId }) => {
    socket.join(wishlistId);
    console.log(`Client ${socket.id} joined room: ${wishlistId}`);
  });
  
  // Handle unsubscription from wishlist updates
  socket.on('unsubscribe', ({ wishlistId }) => {
    socket.leave(wishlistId);
    console.log(`Client ${socket.id} left room: ${wishlistId}`);
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// API Routes - would import from separate files in production
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// User routes
app.post('/api/auth/signup', (req, res) => {
  // Mock signup - would create user in DB
  const { name, email, password } = req.body;
  
  // Validation would happen here
  
  // Return mock user data and token
  res.json({
    user: {
      _id: 'new-user-id',
      name,
      email
    },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/login', (req, res) => {
  // Mock login - would verify credentials
  const { email, password } = req.body;
  
  // Simple validation
  if (email === 'john@example.com' && password === 'password123') {
    return res.json({
      user: {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      },
      token: 'mock-jwt-token'
    });
  }
  
  if (email === 'jane@example.com' && password === 'password123') {
    return res.json({
      user: {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      token: 'mock-jwt-token'
    });
  }
  
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Wishlist routes
app.get('/api/wishlists', authenticate, (req, res) => {
  // Mock - would fetch from DB based on user ID
  res.json([
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
      products: [],
      createdAt: '2023-04-15T09:00:00Z',
      updatedAt: '2023-04-16T14:20:00Z'
    }
  ]);
});

app.post('/api/wishlists', authenticate, (req, res) => {
  // Mock - would create in DB
  const { title, description } = req.body;
  
  const newWishlist = {
    _id: `new-${Date.now()}`,
    title,
    description,
    creator: {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    collaborators: [],
    products: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  res.status(201).json(newWishlist);
});

app.get('/api/wishlists/:id', authenticate, (req, res) => {
  // Mock - would fetch from DB
  const { id } = req.params;
  
  res.json({
    _id: id,
    title: 'Sample Wishlist',
    description: 'This is a sample wishlist',
    creator: {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    collaborators: [],
    products: [],
    createdAt: '2023-04-15T09:00:00Z',
    updatedAt: '2023-04-16T14:20:00Z'
  });
});

// Product routes
app.post('/api/wishlists/:id/products', authenticate, (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl } = req.body;
  
  const newProduct = {
    _id: `prod-${Date.now()}`,
    name,
    price,
    imageUrl,
    addedBy: {
      _id: '1',
      name: 'John Doe'
    },
    createdAt: new Date().toISOString()
  };
  
  // Emit socket event to all clients subscribed to this wishlist
  io.to(id).emit('product_added', newProduct);
  
  res.status(201).json(newProduct);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});