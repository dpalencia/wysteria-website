import React from 'react';
import styles from './ShowsSection.module.css';

function ShowItem({ show }) {
  return (
    <div className={styles.showItem}>
      {show.posterImage && (
        <div className={styles.posterContainer}>
          <img 
            src={show.posterImage} 
            alt={`${show.title} poster`}
            className={styles.posterImage}
          />
        </div>
      )}
      <div className={styles.textBoxContainer}>
        <div className={styles.textBox}>
          <h3 className={styles.showTitle}>{show.title}</h3>
          {show.description && (
            <div className={styles.showDescription} style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              {show.description}
            </div>
          )}
          <div className={styles.showDetails} style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)' }}>
            {show.venue && (
              <p><strong>Venue:</strong> {show.venue}</p>
            )}
            {show.address && (
              <p><strong>Location:</strong> {show.address}{show.city ? `, ${show.city}` : ''}</p>
            )}
            {show.date && (() => {
              const dateStr = show.date;
              const [year, month, day] = dateStr.split('-').map(Number);
              const date = new Date(year, month - 1, day);
              return (
                <p><strong>Date:</strong> {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              );
            })()}
            {show.time && (
              <p><strong>Time:</strong> {show.time}</p>
            )}
            {show.ticketInfo && (
              <p><strong>Entry:</strong> {show.ticketInfo}</p>
            )}
          </div>
          {show.ticketLink && (
            <a 
              href={show.ticketLink} 
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
  );
}

export default function ShowsSection({ shows }) {
  const hasShows = shows && shows.length > 0;

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
          {hasShows ? (
            shows.map((show, index) => (
              <ShowItem key={show.slug || index} show={show} />
            ))
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




