import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import WishlistCard from '../components/wishlist/WishlistCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { getWishlists } from '../services/wishlistService'

const Dashboard = () => {
  const [wishlists, setWishlists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  // Fetch wishlists
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        setLoading(true)
        const data = await getWishlists(user._id)
        setWishlists(data)
      } catch (err) {
        console.error('Error fetching wishlists:', err)
        setError('Failed to load your wishlists. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchWishlists()
    }
  }, [user])

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">My Wishlists</h1>
          <p className="text-muted">
            Manage and collaborate on your wishlists
          </p>
        </div>
        <Button 
          as={Link} 
          to="/wishlist/new" 
          variant="primary"
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> New Wishlist
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner text="Loading your wishlists..." />
      ) : wishlists.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <div className="py-4">
            <h4>You don't have any wishlists yet</h4>
            <p className="text-muted mb-4">Create your first wishlist to get started</p>
            <Button 
              as={Link} 
              to="/wishlist/new" 
              variant="primary"
              className="d-flex align-items-center mx-auto"
              style={{ width: 'fit-content' }}
            >
              <FaPlus className="me-2" /> Create Wishlist
            </Button>
          </div>
        </div>
      ) : (
        <Row className="g-4">
          {wishlists.map(wishlist => (
            <Col key={wishlist._id} md={6} lg={4}>
              <WishlistCard wishlist={wishlist} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Dashboard