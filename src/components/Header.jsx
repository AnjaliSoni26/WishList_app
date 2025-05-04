import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { FaUser, FaSignOutAlt, FaShoppingBag, FaPlus } from 'react-icons/fa'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setExpanded(false)
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm py-3"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <div className="d-flex align-items-center">
            <FaShoppingBag className="text-primary me-2" size={24} />
            <span className="fw-bold">Wishing</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/dashboard" 
                  className="mx-2"
                  onClick={() => setExpanded(false)}
                >
                  Dashboard
                </Nav.Link>
                
                <Nav.Link 
                  as={Link} 
                  to="/wishlist/new" 
                  className="mx-2 d-flex align-items-center"
                  onClick={() => setExpanded(false)}
                >
                  <FaPlus className="me-1" size={14} /> New Wishlist
                </Nav.Link>
                
                <Dropdown align="end" className="ms-2">
                  <Dropdown.Toggle as="div" className="cursor-pointer">
                    <div className="avatar">
                      {getInitials(user?.name)}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-sm border-0 mt-2">
                    <Dropdown.Item disabled className="text-center">
                      <strong>{user?.name || user?.email}</strong>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  className="mx-2"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </Nav.Link>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="primary" 
                  className="ms-2"
                  onClick={() => setExpanded(false)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header