import React from 'react';
import styles from './ShowsSection.module.css';
import ImageGallery from './ImageGallery';

export default function ShowsSection({ upcomingShow }) {
  if (!upcomingShow) return null;
  
  return (
    <section id="shows" className={styles.showsSection}>
      {/* Gallery Background */}
      <div className={styles.galleryContainer}>
        <ImageGallery bucketUrl="https://storage.googleapis.com/wysteria-image-gallery" />
      </div>
      
      {/* Overlay */}
      <div className={styles.overlay}></div>
      
      {/* Section Title */}
      {/* <div className={styles.sectionTitle}>
        <h2 className={`${styles.title} glow-text`}>Shows</h2>
      </div> */}
      
      {/* Text Box */}
      <div className={styles.textBoxContainer}>
        <div className={styles.textBox}>
          <h3 className={styles.showTitle}>
            {upcomingShow.title}
          </h3>
          
          <h3 className={styles.showDescription}>
            {upcomingShow.description}
          </h3>
        </div>
      </div>
    </section>
  );
}

