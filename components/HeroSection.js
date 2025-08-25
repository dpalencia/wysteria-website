import React from 'react';
import { FaYoutube, FaInstagram, FaSpotify, FaTwitter, FaFacebook, FaBandcamp } from 'react-icons/fa';

export default function HeroSection({ bandInfo, socialMedia }) {
  return (
    <section id="about" className="hero-section gothic-bg-full" style={{
      paddingTop: '80px', // Add padding to account for the nav bar
      marginBottom: '0',
      paddingBottom: '0',
      position: 'relative',
      zIndex: 1
    }}>
      <img 
        src={bandInfo.heroImage} 
        alt={`${bandInfo.bandName} - Goth band photo`} 
        className="hero-image"
        loading="eager"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="gothic-title glow-text" style={{ 
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
  );
}
