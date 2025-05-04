import { useState } from 'react'
import { Card, Button, Badge, Dropdown } from 'react-bootstrap'
import { FaEllipsisH, FaEdit, FaTrash } from 'react-icons/fa'

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  const { name, imageUrl, price, addedBy } = product
  const [imageError, setImageError] = useState(false)

  // Get initials for user avatar
  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price)
  }

  return (
    <Card className="product-card h-100 border-0 shadow-sm">
      <div className="position-relative">
        <div 
          className="card-img-top bg-light d-flex align-items-center justify-content-center"
          style={{ height: '200px', overflow: 'hidden' }}
        >
          {!imageError && imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="img-fluid"
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-center p-4">
              <FaEdit size={32} className="text-neutral-400 mb-2" />
              <p className="text-muted small mb-0">No image available</p>
            </div>
          )}
        </div>
        
        <Badge 
          bg="primary" 
          className="position-absolute top-0 end-0 m-2"
        >
          {formatPrice(price)}
        </Badge>
      </div>
      
      <Card.Body>
        <Card.Title className="mb-3">{name}</Card.Title>
        
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="avatar avatar-sm me-2 bg-accent">
              {getInitials(addedBy?.name)}
            </div>
            <span className="text-muted small">
              Added by {addedBy?.name || 'Unknown'}
            </span>
          </div>
          
          {showActions && (
            <Dropdown align="end">
              <Dropdown.Toggle 
                as="div" 
                className="cursor-pointer"
              >
                <Button 
                  variant="light" 
                  size="sm" 
                  className="rounded-circle p-1"
                >
                  <FaEllipsisH size={14} />
                </Button>
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="shadow-sm border-0">
                <Dropdown.Item onClick={() => onEdit(product)}>
                  <FaEdit className="me-2 text-primary" size={14} />
                  Edit Product
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => onDelete(product._id)}
                  className="text-danger"
                >
                  <FaTrash className="me-2" size={14} />
                  Remove Product
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard