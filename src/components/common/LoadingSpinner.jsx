import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ fullScreen, size = 'md', text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white" style={{ zIndex: 9999 }}>
        <Spinner 
          animation="border" 
          variant="primary" 
          role="status"
          style={{ 
            width: size === 'sm' ? '1.5rem' : size === 'lg' ? '3rem' : '2rem',
            height: size === 'sm' ? '1.5rem' : size === 'lg' ? '3rem' : '2rem',
          }}
        />
        {text && <p className="mt-3 text-primary">{text}</p>}
      </div>
    )
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <Spinner 
        animation="border" 
        variant="primary" 
        role="status"
        style={{ 
          width: size === 'sm' ? '1.5rem' : size === 'lg' ? '3rem' : '2rem',
          height: size === 'sm' ? '1.5rem' : size === 'lg' ? '3rem' : '2rem',
        }}
      />
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  )
}

export default LoadingSpinner