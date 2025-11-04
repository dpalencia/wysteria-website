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
        </div>
      </section>
    </>
  );
}




