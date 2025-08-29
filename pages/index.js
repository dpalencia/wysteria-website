import Head from 'next/head'
import { FaYoutube, FaInstagram, FaSpotify, FaTwitter, FaFacebook, FaBandcamp, FaTiktok } from 'react-icons/fa'
import { getBandInfo, getAlbums, getShows } from '../lib/cms'
import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ShowsSection from '../components/ShowsSection'

export default function Home({ bandInfo, albums, shows }) {
  const { socialMedia } = bandInfo
  const upcomingShow = shows && shows.length > 0 ? shows[0] : null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    
    fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => {
        setFormStatus({ submitted: true, error: false });
        form.reset();
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        setFormStatus({ submitted: true, error: true });
      });
  };
  
  // Auto-hide form confirmation message after 5 seconds
  useEffect(() => {
    if (formStatus.submitted) {
      const timer = setTimeout(() => {
        setFormStatus({ submitted: false, error: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [formStatus.submitted]);

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
      socialMedia.bandcamp,
      socialMedia.tiktok
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
        <title>{bandInfo.bandName} - Goth Band | Albuquerque, NM</title>
        <meta name="description" content={`${bandInfo.bandName} is a goth band from ${bandInfo.city}. Listen to our latest demo 'Infest Digest'.`} />
        <meta name="keywords" content="goth, gothic metal, gothic rock, dark wave, alternative rock, Albuquerque bands, New Mexico music, gothic music, dark rock, Wysteria, Infest Digest" />
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
        
        {/* Music-specific Meta Tags */}
        <meta name="music:musician" content={bandInfo.bandName} />
        <meta name="music:genre" content="Goth" />
        <meta name="music:album" content="Infest Digest" />
        
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
        <link rel="dns-prefetch" href="//tiktok.com" />
      </Head>

      <main className="min-h-screen gothic-texture">
        <div className="container mx-auto px-4" style={{ 
          paddingTop: 'env(safe-area-inset-top, 0px)'
        }}>
          {/* Navigation */}
          <nav style={{ 
            padding: 'clamp(1rem, 2vw, 1.5rem) 0', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(139, 0, 0, 0.3)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            height: '80px' // Fixed height to match scroll-padding-top
          }}>
            <div style={{ 
              maxWidth: '72rem', 
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0 1rem'
            }}>
              {/* Logo */}
              <a href="/" className="logo-container">
                <img 
                  src="/band-logo.jpeg" 
                  alt={`${bandInfo.bandName} Logo`}
                  className="nav-logo"
                  style={{
                    width: '100px',
                    height: 'auto',
                    maxWidth: '8rem'
                  }}
                />
                <span className="sr-only">Wysteria</span>
              </a>
              
              {/* Navigation Links */}
              <div className="nav-links">
              <a href="#about" className="nav-link">About</a>
                <a href="#shows" className="nav-link">Shows</a>                
                <a href="#music" className="nav-link">Music</a>
                <a href="#contact" className="nav-link">Contact</a>
              </div>
              
              {/* Social Media & Mobile Menu Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                {/* Social Media - Now visible on tablet and desktop */}
                <div className="social-nav">
                  {socialMedia.youtube && (
                    <a 
                      href={socialMedia.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-nav-link"
                      aria-label={`Follow ${bandInfo.bandName} on YouTube`}
                    >
                      <FaYoutube />
                    </a>
                  )}
                  {socialMedia.instagram && (
                    <a 
                      href={socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-nav-link"
                      aria-label={`Follow ${bandInfo.bandName} on Instagram`}
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {socialMedia.spotify && (
                    <a 
                      href={socialMedia.spotify} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-nav-link"
                      aria-label={`Listen to ${bandInfo.bandName} on Spotify`}
                    >
                      <FaSpotify />
                    </a>
                  )}
                  {socialMedia.facebook && (
                    <a 
                      href={socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-nav-link"
                      aria-label={`Follow ${bandInfo.bandName} on Facebook`}
                    >
                      <FaFacebook />
                    </a>
                  )}
                  {socialMedia.bandcamp && (
                    <a 
                      href={socialMedia.bandcamp} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-nav-link"
                      aria-label={`Listen to ${bandInfo.bandName} on Bandcamp`}
                    >
                      <FaBandcamp />
                    </a>
                  )}
                  {socialMedia.tiktok && (
                    <a 
                      href={socialMedia.tiktok} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-nav-link"
                      aria-label={`Follow ${bandInfo.bandName} on TikTok`}
                    >
                      <FaTiktok />
                    </a>
                  )}
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                  className="mobile-menu-toggle"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
              
              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="mobile-menu">
                  <a href="#shows" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Shows</a>
                  <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
                  <a href="#music" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Music</a>
                  <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                  
                  {/* Social Media in Mobile Menu */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem',
                    marginTop: '1.5rem',
                    justifyContent: 'center'
                  }}>
                    {socialMedia.youtube && (
                      <a 
                        href={socialMedia.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-nav-link"
                        aria-label={`Follow ${bandInfo.bandName} on YouTube`}
                      >
                        <FaYoutube />
                      </a>
                    )}
                    {socialMedia.instagram && (
                      <a 
                        href={socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-nav-link"
                        aria-label={`Follow ${bandInfo.bandName} on Instagram`}
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {socialMedia.spotify && (
                      <a 
                        href={socialMedia.spotify} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-nav-link"
                        aria-label={`Listen to ${bandInfo.bandName} on Spotify`}
                      >
                        <FaSpotify />
                      </a>
                    )}
                    {socialMedia.facebook && (
                      <a 
                        href={socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-nav-link"
                        aria-label={`Follow ${bandInfo.bandName} on Facebook`}
                      >
                        <FaFacebook />
                      </a>
                    )}
                    {socialMedia.bandcamp && (
                      <a 
                        href={socialMedia.bandcamp} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-nav-link"
                        aria-label={`Listen to ${bandInfo.bandName} on Bandcamp`}
                      >
                        <FaBandcamp />
                      </a>
                    )}
                    {socialMedia.tiktok && (
                      <a 
                        href={socialMedia.tiktok} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-nav-link"
                        aria-label={`Follow ${bandInfo.bandName} on TikTok`}
                      >
                        <FaTiktok />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Hero Section with Band Photo */}
          <HeroSection bandInfo={bandInfo} socialMedia={socialMedia} />
          
          {/* Upcoming Show Section with Gallery Background - Positioned to overlap */}
          <ShowsSection upcomingShow={upcomingShow} />
        </div>
        
        {/* Drummer Wanted Section */}
        <section className="gothic-bg" style={{ 
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)',
          backgroundColor: '#000000',
          borderTop: '1px solid #8b0000',
          borderBottom: '1px solid #8b0000',
          position: 'relative'
        }}>
          <div style={{ 
            maxWidth: '72rem', 
            margin: '0 auto',
            textAlign: 'center' 
          }}>
            <h2 className="section-title glow-text" style={{ 
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)', 
              color: '#dc143c',
              padding: '0 1rem'
            }}>
              Drummer Wanted
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              color: '#e0e0e0',
              fontFamily: 'Playfair Display, serif',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '0 1rem',
              lineHeight: '1.6'
            }}>
              We are currently seeking a dedicated drummer to join our journey. If you're passionate about dark atmospheric music and have experience with gothic/post-punk drumming styles, we'd love to hear from you.
            </p>
            <a 
              href="#contact" 
              style={{
                display: 'inline-block',
                marginTop: 'clamp(1rem, 3vw, 1.5rem)',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#8b0000',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontFamily: 'Cinzel, serif',
                fontWeight: 'bold',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'background-color 0.3s ease',
              }}
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* YouTube Demo Section */}
        <section id="music" className="gothic-bg blood-drip" style={{ 
          padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 8vw, 5rem)', // Increased top padding
          backgroundColor: '#1a1a1a',
          position: 'relative'
        }}>
          <div style={{ 
            maxWidth: '72rem', 
            margin: '0 auto', 
            textAlign: 'center' 
          }}>
            <h2 className="section-title glow-text" style={{ 
              fontSize: 'clamp(2rem, 6vw, 3rem)', 
              marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#dc143c',
              padding: '0 1rem'
            }}>
              Demo - Infest Digest
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
                  src="https://www.youtube.com/embed/YmdO-4pe3Hk?si=DA0agqxcyCFrtBCI"
                  title={`${bandInfo.bandName} - Infest Digest Live Performance`}
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
              Enjoy our new demo, Infest Digest.
            </p>
          </div>
        </section>
        
        {/* Albums Section */}
        {/* ... existing code ... */}
        
        {/* News Section */}
        {/* ... existing code ... */}
        
        {/* Contact Section */}
        <section id="contact" className="gothic-bg-full" style={{ 
          padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 8vw, 5rem)', // Increased top padding
          backgroundColor: '#1a1a1a',
          borderTop: '1px solid #8b0000',
          position: 'relative'
        }}>
          <div style={{ 
            maxWidth: '72rem', 
            margin: '0 auto',
            textAlign: 'center' 
          }}>
            <h2 className="section-title glow-text" style={{ 
              fontSize: 'clamp(2rem, 6vw, 3rem)', 
              marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
              color: '#dc143c',
              padding: '0 1rem'
            }}>
              Contact Us
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              color: '#e0e0e0',
              fontFamily: 'Playfair Display, serif',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '0 1rem',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.6'
            }}>
              Have questions or want to book us for a show? Having issues with ticket purchases? Send us a message and we'll get back to you as soon as possible.
            </p>
            
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'left',
                padding: '0 1rem'
              }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: '#e0e0e0',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                }}>
                  Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid #8b0000',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: '#e0e0e0',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                }}>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  style={{
                    width: '100%',








                    
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid #8b0000',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="subject" style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: '#e0e0e0',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                }}>
                  Subject
                </label>
                <input 
                  type="text" 
                  name="subject" 
                  id="subject" 
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid #8b0000',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="message" style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  color: '#e0e0e0',
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                }}>
                  Message
                </label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows="5" 
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid #8b0000',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="contact-submit"
              >
                Send Message
              </button>
            </form>

            {formStatus.submitted && (
              <div className="form-confirmation" style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: formStatus.error ? 'rgba(220, 20, 60, 0.8)' : 'rgba(76, 175, 80, 0.8)',
                color: '#ffffff',
                borderRadius: '4px',
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backdropFilter: 'blur(5px)'
              }}>
                <span>{formStatus.error ? 'Error sending message. Please try again later.' : 'Message sent successfully! We\'ll get back to you soon.'}</span>
                <button 
                  onClick={() => setFormStatus({ submitted: false, error: false })}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    marginLeft: '1rem',
                    padding: '0.2rem 0.5rem'
                  }}
                  aria-label="Close notification"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="blood-drip" style={{ 
        backgroundColor: '#1a1a1a', 
        padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1rem, 4vw, 2rem)', 
        borderTop: '2px solid #8b0000',
        position: 'relative'
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
            © 2025 {bandInfo.bandName}. All rights reserved.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            flexWrap: 'wrap'
          }}>
            <a href="#contact" style={{ 
              color: '#e0e0e0', 
              textDecoration: 'none',
              fontFamily: 'Playfair Display, serif',
              transition: 'color 0.3s ease',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const bandInfo = getBandInfo()
  const albums = getAlbums()
  const shows = getShows()
  
  return {
    props: {
      bandInfo,
      albums,
      shows
    }
  }
}
