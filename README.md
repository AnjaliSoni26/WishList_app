# Wishing - Collaborative Wishlist App

A social, collaborative shopping experience where users can create, manage, and interact with product wishlists in real-time.


## Features

- User authentication (signup/login)
- Create, view, edit, and delete wishlists
- Add, edit, and remove products from wishlists
- Invite collaborators to join wishlists
- Real-time updates using WebSockets
- Responsive design for all device sizes

## Tech Stack

### Frontend
- React.js
- Bootstrap/React-Bootstrap
- Socket.io Client
- React Router
- React Icons

### Backend
- Node.js
- Express.js
- Socket.io
- JSON Web Tokens for authentication

### Database
- MongoDB (simulated in this demo)

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/AnjaliSoni26/-wishlist-app.git
cd flockshop-wishlist-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
# Run frontend and backend concurrently
npm run dev:all

# Or run them separately
npm run dev         # Frontend
npm run server      # Backend
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
wishlist-app/
├── public/              # Static assets
├── server/              # Backend code
│   └── server.js        # Express server
├── src/                 # Frontend code
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
└── package.json         # Project dependencies
```

## Assumptions and Limitations

- This demo uses mock authentication instead of a real implementation
- The database operations are simulated with in-memory data structures
- Real-time functionality is demonstrated but limited in scope
- The invitation system doesn't send actual emails

## Future Improvements

1. Implement a proper authentication system with JWT verification
2. Add a real MongoDB database with Mongoose models
3. Enhance real-time features with typing indicators and read receipts
4. Add product comments and emoji reactions
5. Implement email notifications for wishlist activities
6. Add a mobile app using React Native

## Author

Anjali Soni

## License

MIT License