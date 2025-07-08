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
            fontSize: '4rem', 
            marginBottom: '1rem', 
            color: '#ffffff'
          }}>
            {bandInfo.bandName.toUpperCase()}
          </h1>
          <p className="gothic-subtitle" style={{ 
            fontSize: '1.5rem', 
            color: '#dc143c', 
            marginBottom: '2rem', 
            maxWidth: '32rem'
          }}>
            {bandInfo.tagline}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {socialMedia.youtube && (
              <a 
                href={socialMedia.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaYoutube style={{ fontSize: '1.5rem' }} />
              </a>
            )}
            {socialMedia.instagram && (
              <a 
                href={socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ background: 'linear-gradient(45deg, #8b0000, #dc143c)' }}
              >
                <FaInstagram style={{ fontSize: '1.5rem' }} />
              </a>
            )}
            {socialMedia.spotify && (
              <a 
                href={socialMedia.spotify} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ backgroundColor: '#8b0000' }}
              >
                <FaSpotify style={{ fontSize: '1.5rem' }} />
              </a>
            )}
            {socialMedia.twitter && (
              <a 
                href={socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ backgroundColor: '#8b0000' }}
              >
                <FaTwitter style={{ fontSize: '1.5rem' }} />
              </a>
            )}
            {socialMedia.facebook && (
              <a 
                href={socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ backgroundColor: '#8b0000' }}
              >
                <FaFacebook style={{ fontSize: '1.5rem' }} />
              </a>
            )}
            {socialMedia.bandcamp && (
              <a 
                href={socialMedia.bandcamp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                style={{ backgroundColor: '#8b0000' }}
              >
                <FaBandcamp style={{ fontSize: '1.5rem' }} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* YouTube Demo Section */}
      <section style={{ padding: '5rem 1rem', backgroundColor: '#1a1a1a' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ 
            fontSize: '3rem', 
            marginBottom: '2rem', 
            color: '#dc143c' 
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
            marginTop: '2rem',
            fontSize: '1.125rem',
            color: '#e0e0e0',
            fontFamily: 'Playfair Display, serif',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Experience the haunting melodies of {bandInfo.bandName} in this performance of Carrie's Nightmare.
          </p>
        </div>
      </section>

      {/* About Section */}
      {/* <section style={{ padding: '5rem 1rem', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ 
            fontSize: '3rem', 
            marginBottom: '2rem', 
            color: '#dc143c' 
          }}>
            About {bandInfo.bandName}
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '3rem', 
            alignItems: 'center' 
          }}>
            <div style={{ textAlign: 'left' }}>
              <div 
                className="gothic-text" 
                style={{ 
                  fontSize: '1.125rem', 
                  color: '#e0e0e0', 
                  lineHeight: '1.8'
                }}
                dangerouslySetInnerHTML={{ __html: bandInfo.about }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src={bandInfo.studioImage} 
                alt={`${bandInfo.bandName} in Studio`} 
                className="gothic-border"
                style={{ 
                  borderRadius: '0.5rem', 
                  boxShadow: '0 25px 50px -12px rgba(139,0,0,0.4)',
                  width: '100%',
                  height: 'auto'
                }}
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Latest Music Section */}
      {/* <section style={{ padding: '5rem 1rem', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ 
            fontSize: '3rem', 
            marginBottom: '3rem', 
            color: '#dc143c' 
          }}>
            Dark Discography
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {albums.map((album, index) => (
              <div key={album.slug} className="album-card" style={{ 
                borderRadius: '0.5rem', 
                padding: '1.5rem'
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '12rem', 
                  backgroundColor: '#2d1b1b', 
                  borderRadius: '0.25rem', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #8b0000',
                  overflow: 'hidden'
                }}>
                  {album.albumArt ? (
                    <img 
                      src={album.albumArt} 
                      alt={`${album.title} Album Art`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  ) : (
                    <span style={{ color: '#dc143c', fontFamily: 'Cinzel, serif' }}>
                      Album Art {index + 1}
                    </span>
                  )}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem', 
                  color: '#dc143c',
                  fontFamily: 'Cinzel, serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  "{album.title}"
                </h3>
                <p style={{ color: '#e0e0e0', fontFamily: 'Playfair Display, serif' }}>
                  Released {new Date(album.releaseDate).getFullYear()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer style={{ backgroundColor: '#1a1a1a', padding: '2rem 1rem', borderTop: '2px solid #8b0000' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ 
            color: '#dc143c', 
            marginBottom: '1rem',
            fontFamily: 'Cinzel, serif',
            fontSize: '1.1rem'
          }}>
            © 2024 {bandInfo.bandName}. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease'
            }}>Privacy Policy</a>
            <a href="#" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease'
            }}>Contact</a>
            <a href="#" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease'
            }}>Press Kit</a>
          </div>
        </div>
      </footer> */}
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
