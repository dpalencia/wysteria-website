import React from 'react';
import styles from './ShowsSection.module.css';
import Image from 'next/image';

export default function ShowsSection({ upcomingShow }) {
  if (!upcomingShow) return null;
  
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
        
        <div className={styles.showsContainer}>
          {/* First Show - Witching Hour */}
          <div className={styles.showItem}>
            {/* Poster as Foreground Element */}
            <div className={styles.posterContainer}>
              <img 
                src="/witching-hour-flyer.png"
                alt="The Witching Hour Goth Night Poster"
                className={styles.posterImage}
              />
            </div>
          
            {/* Text Box */}
            <div className={styles.textBoxContainer}>
              <div className={styles.textBox}>
                <h3 className={styles.showTitle}>
                  The Witching Hour Goth Night
                </h3>
                
                <div className={styles.showDetails}>
                  <p>October 23rd, 2025</p>
                  <p>7PM</p>
                  <p>21+ Only</p>
                  <p>$10 cover</p>
                  <p>Inside Out ABQ - 622 Central Ave SW, Albuquerque, NM</p>
                  <p className={styles.showDescription}>Step into the darkness for an evening of goth music. Featuring Wysteria, Funeral Process, Zero Batz, and DJ DSTRBNCE</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Show - Halloween */}
          <div className={styles.showItem}>
            {/* Poster as Foreground Element */}
            <div className={styles.posterContainer}>
              <img 
                src="/halloween-poster.png"
                alt="Halloween Party Poster"
                className={styles.posterImage}
              />
            </div>
          
            {/* Text Box */}
            <div className={styles.textBoxContainer}>
              <div className={styles.textBox}>
                <h3 className={styles.showTitle}>
                  Halloween Night Party at Expressions
                </h3>
                
                <div className={styles.showDetails}>
                  <p>October 31st</p>
                  <p>18+ Only</p>
                  <p>6PM-10PM</p>
                  <p>Expressions Artist Community, 303 Rio Grande NW</p>
                  <a 
                    href="https://square.link/u/eRDWEia1?src=webqr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ticketButton}
                  >
                    Purchase Tickets
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Third Show - Revel Event */}
          <div className={styles.showItem}>
            {/* Poster as Foreground Element */}
            <div className={styles.posterContainer}>
              <img 
                src="/revel-flyer.png"
                alt="Revel Mural Unveiling Event Poster"
                className={styles.posterImage}
              />
            </div>
          
            {/* Text Box */}
            <div className={styles.textBoxContainer}>
              <div className={styles.textBox}>
                <h3 className={styles.showTitle}>
                  Mural Unveling at Revel
                </h3>
                
                <div className={styles.showDetails}>
                  <p>November 1st, 2025</p>
                  <p>6PM</p>
                  <p>No Cover</p>
                  <p>Revel Entertainment Center Main Stage, Albuquerque</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}




