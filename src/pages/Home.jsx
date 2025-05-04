import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaUsers, FaShoppingBag, FaBell, FaMobileAlt } from 'react-icons/fa'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
  <Container>
    <Row className="align-items-center">
      <Col lg={6} className="mb-5 mb-lg-0">
        <h1 className="display-4 fw-bold mb-3 herohead">Collaborate on your shopping wishlists</h1>
        <p className="lead mb-4">
          Create, share, and collaborate on product wishlists with friends and family in real-time.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3">
          <Button 
            as={Link} 
            to="/signup" 
            variant="light" 
            size="lg" 
            className="fw-semibold text-primary"
          >
            Start Wishing
          </Button>
          
        </div>
      </Col>
      <Col lg={6}>
        <div className="d-flex justify-content-center">
          <img 
            src="wish.png" 
            alt="Shopping together" 
            className="img-fluid animated-img" 
            style={{ maxWidth: '540px' }}
          />
        </div>
      </Col>
    </Row>
  </Container>
</section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose FlockShop?</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Our collaborative wishlist platform makes shopping with friends and family easier than ever before.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaUsers className="text-primary" size={48} />
                  </div>
                  <Card.Title>Collaborate</Card.Title>
                  <Card.Text className="text-muted">
                    Invite friends and family to view and edit your wishlists in real-time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaShoppingBag className="text-accent" size={48} />
                  </div>
                  <Card.Title>Organize</Card.Title>
                  <Card.Text className="text-muted">
                    Keep track of all your desired items in one convenient place.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaBell className="text-warning" size={48} />
                  </div>
                  <Card.Title>Stay Updated</Card.Title>
                  <Card.Text className="text-muted">
                    Get notified when changes are made to your shared wishlists.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <FaMobileAlt className="text-success" size={48} />
                  </div>
                  <Card.Title>Mobile Friendly</Card.Title>
                  <Card.Text className="text-muted">
                    Access your wishlists on any device, anywhere you go.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className=" py-5">
        <Container >
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <div className="text-center">
                <h2 className="ready fw-bold mb-4">Ready to start collaborating?</h2>
                <p className="lead text-muted mb-4">
                  Join thousands of users who are already using FlockShop to create and share wishlists.
                </p>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="primary" 
                  size="lg" 
                  className="px-4 py-2"
                >
                  Create Your First Wishlist
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home