import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className="mb-0 text-center text-md-start text-muted small">
              &copy; {currentYear} Wishing - All rights reserved
            </p>
          </Col>
          
          <Col md={6}>
            <div className="d-flex justify-content-center justify-content-md-end">
              <div className="d-flex gap-3">
                <Link to="#" className="text-neutral-600 hover-scale">
                  <FaGithub size={20} />
                </Link>
                <Link to="#" className="text-neutral-600 hover-scale">
                  <FaTwitter size={20} />
                </Link>
                <Link to="#" className="text-neutral-600 hover-scale">
                  <FaInstagram size={20} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-3">
          <Col className="text-center">
            <div className="d-flex justify-content-center gap-4 small">
              <Link to="#" className="text-muted">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted">
                Terms of Service
              </Link>
              <Link to="#" className="text-muted">
                Contact Us
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer