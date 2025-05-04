import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <div className="py-5">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-muted mb-5">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          as={Link} 
          to="/" 
          variant="primary"
          className="d-inline-flex align-items-center px-4 py-2"
        >
          <FaArrowLeft className="me-2" /> Go Home
        </Button>
      </div>
    </Container>
  )
}

export default NotFound