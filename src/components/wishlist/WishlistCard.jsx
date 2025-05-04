import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaRegClock, FaUser, FaShoppingBag } from 'react-icons/fa'

const WishlistCard = ({ wishlist }) => {
  const { _id, title, description, createdAt, creator, products = [] } = wishlist
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get initials for creator
  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Card className="wishlist-card h-100 border-0 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="mb-1">{title}</Card.Title>
            <div className="d-flex align-items-center text-muted small mb-2">
              <FaRegClock className="me-1" size={12} />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          <Badge bg="primary" pill className="px-2 py-1">
            <FaShoppingBag className="me-1" size={10} />
            {products.length}
          </Badge>
        </div>
        
        <Card.Text className="text-muted small mb-4">
          {description?.length > 120 
            ? `${description.substring(0, 120)}...` 
            : description || 'No description provided.'}
        </Card.Text>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="avatar avatar-sm me-2">
              {getInitials(creator?.name)}
            </div>
            <span className="text-muted small">
              by {creator?.name || 'Unknown'}
            </span>
          </div>
          
          <Link 
            to={`/wishlist/${_id}`} 
            className="btn btn-sm btn-outline-primary"
          >
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default WishlistCard