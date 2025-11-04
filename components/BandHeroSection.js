import React from 'react';

export default function BandHeroSection() {
  return (
    <section className="band-hero-section gothic-bg-full" style={{
      padding: '0',
      backgroundColor: '#000000',
      borderTop: '1px solid #8b0000',
      borderBottom: '1px solid #8b0000',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      minHeight: '60vh',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        margin: '0',
        padding: '0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img 
          src="/band-hero3.jpeg" 
          alt="WysteriA Band" 
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            maxHeight: '80vh',
            display: 'block'
          }}
        />
      </div>
    </section>
  );
}
