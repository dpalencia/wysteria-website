import { useState, useEffect } from 'react';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ bucketUrl = 'https://storage.googleapis.com/wysteria-image-gallery', bucketName = 'wysteria-image-gallery' }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImagesFromBucket() {
      try {
        setIsLoading(true);
        
        // Fetch the list of objects from the bucket using our serverless API route
        const response = await fetch('/api/gallery-images');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }
        
        const data = await response.text();
        
        // Parse the XML response to extract image URLs
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const contents = xmlDoc.getElementsByTagName("Contents");
        
        const imageUrls = [];
        
        // Extract all image files (jpg, jpeg, png, webp)
        for (let i = 0; i < contents.length; i++) {
          const key = contents[i].getElementsByTagName("Key")[0].textContent;
          if (/\.(jpg|jpeg|png|webp)$/i.test(key)) {
            imageUrls.push(`${bucketUrl}/${key}`);
          }
        }
        
        if (imageUrls.length === 0) {
          // Fallback to sample images if no images found or in development
          const sampleImages = [
            `${bucketUrl}/gallery-image-1.jpg`,
            `${bucketUrl}/gallery-image-2.jpg`,
            `${bucketUrl}/gallery-image-3.jpg`,
            `${bucketUrl}/gallery-image-4.jpg`,
            `${bucketUrl}/gallery-image-5.jpg`,
          ];
          setImages(sampleImages);
          console.warn("No images found in bucket, using sample images");
        } else {
          setImages(imageUrls);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching images from bucket:", err);
        setError(err.message);
        
        // Fallback to sample images on error
        const sampleImages = [
          `${bucketUrl}/gallery-image-1.jpg`,
          `${bucketUrl}/gallery-image-2.jpg`,
          `${bucketUrl}/gallery-image-3.jpg`,
          `${bucketUrl}/gallery-image-4.jpg`,
          `${bucketUrl}/gallery-image-5.jpg`,
        ];
        setImages(sampleImages);
        setIsLoading(false);
      }
    }
    
    fetchImagesFromBucket();
  }, [bucketUrl, bucketName]);

  // Auto-advance function
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  if (isLoading) {
    return (
      <div className={styles.galleryContainer}>
        <div className={styles.loadingSpinner}>Loading gallery...</div>
      </div>
    );
  }
  
  if (error && images.length === 0) {
    return (
      <div className={styles.galleryContainer}>
        <div className={styles.errorMessage}>
          <p>Error loading gallery images.</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryOverlay}></div>
      
      {/* Main image */}
      <div className={styles.gallerySlide}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`${styles.galleryImage} ${index === currentIndex ? styles.active : ''}`}
          >
            <img 
              src={image}
              alt={`Gallery image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'top right'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
