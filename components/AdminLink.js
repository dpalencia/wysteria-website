export default function AdminLink() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <a
        href="/admin"
        style={{
          backgroundColor: '#dc143c',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          boxShadow: '0 4px 8px rgba(139,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#8b0000'
          e.target.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#dc143c'
          e.target.style.transform = 'translateY(0)'
        }}
      >
        Admin
      </a>
    </div>
  )
} 