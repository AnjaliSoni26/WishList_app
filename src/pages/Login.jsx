import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Form validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      const result = await login(email, password)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Failed to login')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm">
            <h2 className="text-center mb-4">Welcome Back!</h2>
            
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <div className="d-grid mb-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  className="py-2"
                >
                  {loading ? <LoadingSpinner size="sm" text="" /> : 'Sign In'}
                </Button>
              </div>
              
              <div className="text-center">
                <p className="mb-0">
                  Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
                </p>
              </div>
            </Form>
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-light rounded-3 text-center">
            <p className="mb-1 fw-semibold">Demo Credentials</p>
            <small className="d-block text-muted">Email: john@example.com</small>
            <small className="d-block text-muted">Password: password123</small>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login