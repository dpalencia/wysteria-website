import React, { useState, useEffect } from 'react';
import styles from './ImageGallery.module.css';

export default function GallerySection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery-images');
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }
        
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        
        const contents = xmlDoc.getElementsByTagName('Contents');
        const imageUrls = [];
        
        for (let i = 0; i < contents.length; i++) {
          const key = contents[i].getElementsByTagName('Key')[0]?.textContent;
          if (key && (key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.png') || key.endsWith('.webp'))) {
            const bucketName = process.env.NEXT_PUBLIC_GALLERY_BUCKET_NAME || 'wysteria-image-gallery';
            imageUrls.push(`https://storage.googleapis.com/${bucketName}/${key}`);
          }
        }
        
        setImages(imageUrls);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load gallery images');
        setLoading(false);
      }
    };

    fetchImages();
    
    // Set up automatic slideshow
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % (images.length || 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section id="gallery" className={styles.galleryContainer}>
        <div className={styles.loadingSpinner}>Loading gallery...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className={styles.galleryContainer}>
        <div className={styles.errorMessage}>{error}</div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gothic-bg">
      <div className="section-title-container" style={{ 
        textAlign: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem) clamp(2rem, 4vw, 3rem)'
      }}>
        <h2 className="section-title glow-text" style={{ 
          fontSize: 'clamp(2rem, 6vw, 3rem)', 
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)', 
          color: '#dc143c'
        }}>
          Gallery
        </h2>
      </div>
      
      <div className={styles.galleryContainer} style={{ height: '80vh' }}>
        {images.length > 0 ? (
          <>
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`${styles.galleryImage} ${index === currentIndex ? styles.active : ''}`}
              >
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`}
                  className={styles.galleryImageContent}
                />
              </div>
            ))}
            
            <div className={styles.galleryOverlay}></div>
            
            <button 
              className={`${styles.galleryNav} ${styles.prev}`} 
              onClick={goToPrev}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            
            <button 
              className={`${styles.galleryNav} ${styles.next}`} 
              onClick={goToNext}
              aria-label="Next image"
            >
              &#10095;
            </button>
            
            <div className={styles.galleryDots}>
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`} 
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.errorMessage}>No gallery images found</div>
        )}
      </div>
    </section>
  );
}
