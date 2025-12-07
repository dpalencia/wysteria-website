import React from 'react';
import styles from './ShowsSection.module.css';

export default function ShowsSection({ upcomingShow }) {
  return (
    <>
      {/* Section Title - Moved outside the section for better visibility */}
      <div className="section-title-container" style={{ 
        textAlign: 'center',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem) clamp(1rem, 2vw, 1.5rem)',
        backgroundColor: '#000',
        borderTop: '1px solid #8b0000',
        position: 'relative',
        zIndex: 3
      }}>
        <h2 className="section-title glow-text" style={{ 
          fontSize: 'clamp(2rem, 6vw, 3rem)', 
          color: '#dc143c',
          margin: '0 auto'
        }}>
          Shows
        </h2>
      </div>
      
      <section id="shows" className={`${styles.showsSection} gothic-bg`}>
        {/* Dark Background */}
        <div className={styles.darkBackground}></div>
        
        <div className={styles.showsContainer} style={{ position: 'relative', zIndex: 2 }}>
          {upcomingShow ? (
            <div className={styles.showItem}>
              {upcomingShow.posterImage && (
                <div className={styles.posterContainer}>
                  <img 
                    src={upcomingShow.posterImage} 
                    alt={`${upcomingShow.title} poster`}
                    className={styles.posterImage}
                  />
                </div>
              )}
              <div className={styles.textBoxContainer}>
                <div className={styles.textBox}>
                  <h3 className={styles.showTitle}>{upcomingShow.title}</h3>
                  {upcomingShow.description && (
                    <div className={styles.showDescription} style={{ 
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
                    }}>
                      {upcomingShow.description}
                    </div>
                  )}
                  <div className={styles.showDetails} style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)' }}>
                    {upcomingShow.venue && (
                      <p><strong>Venue:</strong> {upcomingShow.venue}</p>
                    )}
                    {upcomingShow.address && (
                      <p><strong>Location:</strong> {upcomingShow.address}{upcomingShow.city ? `, ${upcomingShow.city}` : ''}</p>
                    )}
                    {upcomingShow.date && (
                      <p><strong>Date:</strong> {new Date(upcomingShow.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    )}
                    {upcomingShow.time && (
                      <p><strong>Time:</strong> {upcomingShow.time}</p>
                    )}
                    {upcomingShow.ticketInfo && (
                      <p><strong>Entry:</strong> {upcomingShow.ticketInfo}</p>
                    )}
                  </div>
                  {upcomingShow.ticketLink && (
                    <a 
                      href={upcomingShow.ticketLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.ticketButton}
                    >
                      Get Tickets
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <h3 style={{
              textAlign: 'center',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#dc143c',
              margin: 'clamp(1.5rem, 3vw, 2.5rem) auto',
              textShadow: '0 0 15px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.9), 0 0 20px rgba(220, 20, 60, 0.3)',
              fontFamily: 'Cinzel, serif',
              position: 'relative',
              zIndex: 3
            }}>
              To be announced soon
            </h3>
          )}
        </div>
      </section>
    </>
  );
}




