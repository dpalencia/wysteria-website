import Head from 'next/head'
import { FaYoutube, FaInstagram, FaSpotify, FaTwitter, FaFacebook, FaBandcamp } from 'react-icons/fa'
import { getBandInfo, getAlbums } from '../lib/cms'

export default function Home({ bandInfo, albums }) {
  const { socialMedia } = bandInfo

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": bandInfo.bandName,
    "description": bandInfo.tagline,
    "url": "https://wysteriamusic.com", // Replace with your actual domain
    "genre": ["Goth", "Gothic Metal", "Gothic Rock", "Dark Wave", "Alternative Rock"],
    "location": {
      "@type": "Place",
      "addressLocality": bandInfo.city,
      "addressRegion": "New Mexico",
      "addressCountry": "US"
    },
    "sameAs": [
      socialMedia.youtube,
      socialMedia.instagram,
      socialMedia.spotify,
      socialMedia.twitter,
      socialMedia.facebook,
      socialMedia.bandcamp
    ].filter(Boolean),
    "image": bandInfo.heroImage,
    "potentialAction": {
      "@type": "ListenAction",
      "target": socialMedia.spotify || socialMedia.youtube
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000' }}>
      <Head>
        {/* Basic SEO Meta Tags */}
        <title>{bandInfo.bandName} - Gothic Band | Albuquerque, NM</title>
        <meta name="description" content={`${bandInfo.bandName} is a goth band from ${bandInfo.city}. Experience dark melodies and haunting atmospheres. Listen to our latest demo 'Carrie's Nightmare' and discover our unique blend of goth music.`} />
        <meta name="keywords" content="goth, gothic metal, gothic rock, dark wave, alternative rock, Albuquerque bands, New Mexico music, gothic music, dark rock, Wysteria, Carrie's Nightmare" />
        <meta name="author" content={bandInfo.bandName} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://wysteriamusic.com" /> {/* Replace with your actual domain */}
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${bandInfo.bandName} - Gothic Band`} />
        <meta property="og:description" content={`${bandInfo.tagline} - Goth band from ${bandInfo.city}. Listen to our haunting melodies and dark atmospheres.`} />
        <meta property="og:url" content="https://wysteriamusic.com" /> {/* Replace with your actual domain */}
        <meta property="og:image" content={bandInfo.heroImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={bandInfo.bandName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${bandInfo.bandName} - Goth Band`} />
        <meta name="twitter:description" content={`${bandInfo.tagline} - Goth band from ${bandInfo.city}. Listen to our haunting melodies.`} />
        <meta name="twitter:image" content={bandInfo.heroImage} />
]
        {/* Music-specific Meta Tags */}
        <meta name="music:musician" content={bandInfo.bandName} />
        <meta name="music:genre" content="Goth" />
        <meta name="music:album" content="Carrie's Nightmare" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for social media */}
        <link rel="dns-prefetch" href="//youtube.com" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="dns-prefetch" href="//spotify.com" />
        <link rel="dns-prefetch" href="//twitter.com" />
        <link rel="dns-prefetch" href="//facebook.com" />
        <link rel="dns-prefetch" href="//bandcamp.com" />
      </Head>

      {/* Hero Section with Band Photo */}
      <section className="hero-section">
        <img 
          src={bandInfo.heroImage} 
          alt={`${bandInfo.bandName} - Goth band photo`} 
          className="hero-image"
          loading="eager"
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
            padding: '0 1rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {bandInfo.tagline}
          </p>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
            color: '#e0e0e0', 
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
            maxWidth: '40rem',
            textAlign: 'center',
            padding: '0 1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'Playfair Display, serif',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}>
            {bandInfo.about.replace(/<[^>]*>/g, '')}
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
                aria-label={`Follow ${bandInfo.bandName} on YouTube`}
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
                aria-label={`Follow ${bandInfo.bandName} on Instagram`}
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
                aria-label={`Listen to ${bandInfo.bandName} on Spotify`}
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
                aria-label={`Follow ${bandInfo.bandName} on Twitter`}
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
                aria-label={`Follow ${bandInfo.bandName} on Facebook`}
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
                aria-label={`Listen to ${bandInfo.bandName} on Bandcamp`}
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
                title={`${bandInfo.bandName} - Carrie's Nightmare Live Performance`}
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
                loading="lazy"
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

      {/* Footer
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
