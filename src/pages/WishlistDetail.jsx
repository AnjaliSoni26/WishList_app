import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Container, Row, Col, Button, Alert, Modal, Form, 
  Tabs, Tab, Badge, Card, ListGroup
} from 'react-bootstrap'
import { 
  FaPlus, FaTrash, FaEdit, FaUserPlus, FaUsers, 
  FaEllipsisH, FaArrowLeft
} from 'react-icons/fa'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'
import { 
  getWishlistById, 
  updateWishlist, 
  deleteWishlist,
  addProduct,
  updateProduct,
  removeProduct,
  inviteUserToWishlist
} from '../services/wishlistService'

const WishlistDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { socket, subscribeToWishlist, unsubscribeFromWishlist } = useSocket()
  
  // State variables
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  
  // Product form state
  const [showProductModal, setShowProductModal] = useState(false)
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    imageUrl: ''
  })
  const [editingProduct, setEditingProduct] = useState(null)
  
  // Invite form state
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteError, setInviteError] = useState(null)
  const [inviteSuccess, setInviteSuccess] = useState(false)
  
  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  
  // Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getWishlistById(id)
        setWishlist(data)
      } catch (err) {
        console.error('Error fetching wishlist:', err)
        setError('Failed to load wishlist. It may have been deleted or you don\'t have access.')
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [id])
  
  // Set up socket connection for real-time updates
  useEffect(() => {
    if (wishlist && socket) {
      // Subscribe to wishlist updates
      subscribeToWishlist(id)
      
      // Listen for product changes
      socket.on('product_added', (newProduct) => {
        setWishlist(prev => ({
          ...prev,
          products: [...prev.products, newProduct]
        }))
      })
      
      socket.on('product_updated', (updatedProduct) => {
        setWishlist(prev => ({
          ...prev,
          products: prev.products.map(p => 
            p._id === updatedProduct._id ? updatedProduct : p
          )
        }))
      })
      
      socket.on('product_removed', (productId) => {
        setWishlist(prev => ({
          ...prev,
          products: prev.products.filter(p => p._id !== productId)
        }))
      })
      
      socket.on('collaborator_added', (collaborator) => {
        setWishlist(prev => ({
          ...prev,
          collaborators: [...prev.collaborators, collaborator]
        }))
      })
      
      // Clean up on unmount
      return () => {
        unsubscribeFromWishlist(id)
        socket.off('product_added')
        socket.off('product_updated')
        socket.off('product_removed')
        socket.off('collaborator_added')
      }
    }
  }, [wishlist, socket, id, subscribeToWishlist, unsubscribeFromWishlist])
  
  // Reset product form
  const resetProductForm = () => {
    setProductForm({
      name: '',
      price: '',
      imageUrl: ''
    })
    setEditingProduct(null)
  }
  
  // Handle opening product modal for editing
  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || ''
    })
    setShowProductModal(true)
  }
  
  // Handle product form submit
  const handleProductSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const productData = {
        name: productForm.name,
        price: parseFloat(productForm.price),
        imageUrl: productForm.imageUrl
      }
      
      if (editingProduct) {
        // Update existing product
        await updateProduct(id, editingProduct._id, productData)
      } else {
        // Add new product
        await addProduct(id, productData, user)
      }
      
      // Close modal and reset form
      setShowProductModal(false)
      resetProductForm()
    } catch (err) {
      console.error('Error saving product:', err)
      setError('Failed to save product. Please try again.')
    }
  }
  
  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await removeProduct(id, productId)
    } catch (err) {
      console.error('Error removing product:', err)
      setError('Failed to remove product. Please try again.')
    }
  }
  
  // Handle invite submission
  const handleInviteSubmit = async (e) => {
    e.preventDefault()
    
    if (!inviteEmail) {
      setInviteError('Email is required')
      return
    }
    
    try {
      setInviteLoading(true)
      setInviteError(null)
      setInviteSuccess(false)
      
      const result = await inviteUserToWishlist(id, inviteEmail)
      
      setInviteSuccess(true)
      setInviteEmail('')
      
      // Auto close after success
      setTimeout(() => {
        setShowInviteModal(false)
        setInviteSuccess(false)
      }, 2000)
    } catch (err) {
      console.error('Error inviting user:', err)
      setInviteError(err.message || 'Failed to send invitation')
    } finally {
      setInviteLoading(false)
    }
  }
  
  // Handle wishlist deletion
  const handleDeleteWishlist = async () => {
    try {
      setDeleteLoading(true)
      await deleteWishlist(id)
      navigate('/dashboard')
    } catch (err) {
      console.error('Error deleting wishlist:', err)
      setError('Failed to delete wishlist. Please try again.')
      setShowDeleteModal(false)
    } finally {
      setDeleteLoading(false)
    }
  }
  
  // Check if user is the creator
  const isCreator = wishlist && user && wishlist.creator._id === user._id
  
  if (loading) {
    return <LoadingSpinner text="Loading wishlist..." />
  }
  
  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => navigate('/dashboard')}
          className="mt-3"
        >
          <FaArrowLeft className="me-2" /> Back to Dashboard
        </Button>
      </Container>
    )
  }
  
  if (!wishlist) {
    return null
  }

  return (
    <Container className="py-5 wishlist">
      {/* Wishlist Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <Button 
            variant="light" 
            onClick={() => navigate('/dashboard')}
            className="mb-3 d-inline-flex align-items-center"
          >
            <FaArrowLeft className="me-2" /> Back to Dashboard
          </Button>
          <h1 className="mb-1">{wishlist.title}</h1>
          <p className="text-muted">
            {wishlist.description || 'No description provided'}
          </p>
        </div>
        
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Button 
            variant="outline-primary"
            onClick={() => setShowInviteModal(true)}
            className="d-flex align-items-center invite"
          >
            <FaUserPlus className="me-2" /> Invite
          </Button>
          
          <Button 
            variant="primary"
            onClick={() => {
              resetProductForm()
              setShowProductModal(true)
            }}
            className="d-flex align-items-center add"
          >
            <FaPlus className="me-2 " /> Add Product
          </Button>
          
          {isCreator && (
            <Button 
              variant="outline-danger"
              onClick={() => setShowDeleteModal(true)}
              className="d-flex align-items-center delete"
            >
              <FaTrash className="me-2" /> Delete
            </Button>
          )}
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="products" title="Products">
          {wishlist.products.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <div className="py-4">
                <h4>No products in this wishlist yet</h4>
                <p className="text-muted mb-4">Add your first product to get started</p>
                <Button 
                  variant="primary"
                  onClick={() => {
                    resetProductForm()
                    setShowProductModal(true)
                  }}
                  className="d-flex align-items-center mx-auto"
                  style={{ width: 'fit-content' }}
                >
                  <FaPlus className="me-2" /> Add Product
                </Button>
              </div>
            </div>
          ) : (
            <Row className="g-4">
              {wishlist.products.map(product => (
                <Col key={product._id} sm={6} md={4} lg={3}>
                  <ProductCard 
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    showActions={isCreator || product.addedBy._id === user._id}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Tab>
        
        <Tab eventKey="collaborators" title="Collaborators">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">
                <FaUsers className="me-2" /> People with Access
              </Card.Title>
              
              <ListGroup variant="flush">
                {/* Creator */}
                <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-3">
                      {wishlist.creator.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-medium">{wishlist.creator.name}</div>
                      <div className="text-muted small">{wishlist.creator.email}</div>
                    </div>
                  </div>
                  <Badge bg="primary">Creator</Badge>
                </ListGroup.Item>
                
                {/* Collaborators */}
                {wishlist.collaborators.map(collab => (
                  <ListGroup.Item key={collab._id} className="d-flex justify-content-between align-items-center px-0">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">
                        {collab.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-medium">{collab.name}</div>
                        <div className="text-muted small">{collab.email}</div>
                      </div>
                    </div>
                    <Badge bg="secondary">Collaborator</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <Button 
                variant="outline-primary" 
                className="mt-4 d-flex align-items-center"
                onClick={() => setShowInviteModal(true)}
              >
                <FaUserPlus className="me-2" /> Invite More People
              </Button>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
      
      {/* Product Form Modal */}
      <Modal 
        show={showProductModal} 
        onHide={() => {
          setShowProductModal(false)
          resetProductForm()
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProductSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                placeholder="Enter product name"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={productForm.price}
                onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                placeholder="Enter price"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Image URL (optional)</Form.Label>
              <Form.Control
                type="url"
                value={productForm.imageUrl}
                onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                placeholder="Enter image URL"
              />
              <Form.Text className="text-muted">
                Provide a URL to an image of the product
              </Form.Text>
            </Form.Group>
            
            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowProductModal(false)
                  resetProductForm()
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      {/* Invite Modal */}
      <Modal 
        show={showInviteModal} 
        onHide={() => {
          setShowInviteModal(false)
          setInviteEmail('')
          setInviteError(null)
          setInviteSuccess(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invite People</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inviteSuccess ? (
            <Alert variant="success">
              Invitation sent successfully!
            </Alert>
          ) : (
            <Form onSubmit={handleInviteSubmit}>
              {inviteError && (
                <Alert variant="danger" className="mb-3">
                  {inviteError}
                </Alert>
              )}
              
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                />
                <Form.Text className="text-muted">
                  They will receive access to view and edit this wishlist
                </Form.Text>
              </Form.Group>
              
              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowInviteModal(false)
                    setInviteEmail('')
                    setInviteError(null)
                  }}
                  disabled={inviteLoading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={inviteLoading}
                >
                  {inviteLoading ? (
                    <LoadingSpinner size="sm" text="" />
                  ) : 'Send Invitation'}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <strong>{wishlist.title}</strong>?</p>
          <p className="text-danger">
            This action cannot be undone and will remove all products in this wishlist.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteWishlist}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <LoadingSpinner size="sm" text="" />
            ) : 'Delete Wishlist'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default WishlistDetail