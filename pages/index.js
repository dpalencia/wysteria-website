import Head from 'next/head'
import { FaYoutube, FaInstagram, FaSpotify, FaTwitter, FaFacebook, FaBandcamp } from 'react-icons/fa'
import { getBandInfo, getAlbums } from '../lib/cms'

export default function Home({ bandInfo, albums }) {
  const { socialMedia } = bandInfo

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
      <Head>
        <title>{bandInfo.bandName} - Albuquerque Goth</title>
        <meta name="description" content={`Official website of ${bandInfo.bandName} - Gothic from ${bandInfo.city}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section with Band Photo */}
      <section className="hero-section">
        <img 
          src={bandInfo.heroImage} 
          alt={`${bandInfo.bandName} Band`} 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="gothic-title" style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
            marginBottom: '1rem', 
            color: '#ffffff',
            textAlign: 'center',
            padding: '0 1rem'
          }}>
            {bandInfo.bandName.toUpperCase()}
          </h1>
          <p className="gothic-subtitle" style={{ 
            fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
            color: '#dc143c', 
            marginBottom: '2rem', 
            maxWidth: '32rem',
            textAlign: 'center',
            padding: '0 1rem'
          }}>
            {bandInfo.tagline}
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'clamp(0.5rem, 2vw, 1rem)', 
            flexWrap: 'wrap',
            padding: '0 1rem'
          }}>
            {socialMedia.youtube && (
              <a 
                href={socialMedia.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  width: 'clamp(2.5rem, 8vw, 3.5rem)',
                  height: 'clamp(2.5rem, 8vw, 3.5rem)'
                }}
              >
                <FaYoutube style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
              </a>
            )}
            {socialMedia.instagram && (
              <a 
                href={socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ 
                  background: 'linear-gradient(45deg, #8b0000, #dc143c)',
                  width: 'clamp(2.5rem, 8vw, 3.5rem)',
                  height: 'clamp(2.5rem, 8vw, 3.5rem)'
                }}
              >
                <FaInstagram style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
              </a>
            )}
            {socialMedia.spotify && (
              <a 
                href={socialMedia.spotify} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ 
                  backgroundColor: '#8b0000',
                  width: 'clamp(2.5rem, 8vw, 3.5rem)',
                  height: 'clamp(2.5rem, 8vw, 3.5rem)'
                }}
              >
                <FaSpotify style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
              </a>
            )}
            {socialMedia.twitter && (
              <a 
                href={socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ 
                  backgroundColor: '#8b0000',
                  width: 'clamp(2.5rem, 8vw, 3.5rem)',
                  height: 'clamp(2.5rem, 8vw, 3.5rem)'
                }}
              >
                <FaTwitter style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
              </a>
            )}
            {socialMedia.facebook && (
              <a 
                href={socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ 
                  backgroundColor: '#8b0000',
                  width: 'clamp(2.5rem, 8vw, 3.5rem)',
                  height: 'clamp(2.5rem, 8vw, 3.5rem)'
                }}
              >
                <FaFacebook style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
              </a>
            )}
            {socialMedia.bandcamp && (
              <a 
                href={socialMedia.bandcamp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ 
                  backgroundColor: '#8b0000',
                  width: 'clamp(2.5rem, 8vw, 3.5rem)',
                  height: 'clamp(2.5rem, 8vw, 3.5rem)'
                }}
              >
                <FaBandcamp style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* YouTube Demo Section */}
      <section style={{ 
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)', 
        backgroundColor: '#1a1a1a' 
      }}>
        <div style={{ 
          maxWidth: '72rem', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <h2 className="section-title" style={{ 
            fontSize: 'clamp(2rem, 6vw, 3rem)', 
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
            color: '#dc143c',
            padding: '0 1rem'
          }}>
            Demo - Carrie's Nightmare
          </h2>
          <div style={{ 
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(139,0,0,0.4)',
            border: '2px solid #8b0000'
          }}>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%', /* 16:9 aspect ratio */
              height: 0,
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.youtube.com/embed/z1jELdRYg-w?si=9Cxu9rtPJxzLWny1"
                title="Wysteria Demo Video"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p style={{ 
            marginTop: 'clamp(1.5rem, 4vw, 2rem)',
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            color: '#e0e0e0',
            fontFamily: 'Playfair Display, serif',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 1rem',
            lineHeight: '1.6'
          }}>
            Experience the haunting melodies of {bandInfo.bandName} in this performance of Carrie's Nightmare.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1a1a1a', 
        padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem)', 
        borderTop: '2px solid #8b0000' 
      }}>
        <div style={{ 
          maxWidth: '64rem', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <p style={{ 
            color: '#dc143c', 
            marginBottom: '1rem',
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
          }}>
            © 2024 {bandInfo.bandName}. All rights reserved.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            flexWrap: 'wrap'
          }}>
            <a href="#" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>Privacy Policy</a>
            <a href="#" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>Contact</a>
            <a href="#" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>Press Kit</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const bandInfo = getBandInfo()
  const albums = getAlbums()
  
  return {
    props: {
      bandInfo,
      albums
    }
  }
}
