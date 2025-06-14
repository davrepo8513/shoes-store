import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/images/placeholder-shoe.svg',
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`image-container ${className}`} {...props}>
      {isLoading && !hasError && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${isLoading ? 'loading' : ''} ${hasError ? 'fallback' : ''}`}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default ImageWithFallback;