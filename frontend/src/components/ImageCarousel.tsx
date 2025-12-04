import React, { useState } from 'react';
import './ImageCarousel.css';

interface Props {
  images: string[];
  alt: string;
}

export const ImageCarousel: React.FC<Props> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si pas d'images, afficher placeholder
  if (!images || images.length === 0) {
    return (
      <div className="carousel-placeholder">
        <span>🏠</span>
        <p>Aucune image disponible</p>
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-carousel">
      <img src={images[currentIndex]} alt={`${alt} - Photo ${currentIndex + 1}`} />
      
      {images.length > 1 && (
        <>
          <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
            ‹
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
            ›
          </button>
          
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};