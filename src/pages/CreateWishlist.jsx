import { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaSave } from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { createWishlist } from '../services/wishlistService'

const CreateWishlist = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      
      const wishlistData = {
        title,
        description
      }
      
      const newWishlist = await createWishlist(wishlistData, user)
      navigate(`/wishlist/${newWishlist._id}`)
    } catch (err) {
      console.error('Error creating wishlist:', err)
      setError('Failed to create wishlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1>Create a New Wishlist</h1>
        <p className="text-muted">
          Start a wishlist to collect and organize products you want
        </p>
      </div>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <div className="bg-white rounded-4 shadow-sm p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Wishlist Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your wishlist"
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description to help others understand the purpose of this wishlist"
            />
          </Form.Group>
          
          <div className="d-flex gap-3">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              className="d-flex align-items-center" 
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="sm" text="" />
              ) : (
                <>
                  <FaSave className="me-2" /> Create Wishlist
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default CreateWishlist