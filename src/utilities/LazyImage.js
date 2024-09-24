
import React, { useEffect, useRef, useState } from 'react';
import { placeholderImage } from './helper';


const LazyImage = ({ src, alt}) => {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

const handleError = (event) => {
    event.target.src = placeholderImage
}

useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(imgRef.current);
        }
      });
    });


    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      if (isInViewport) {
        setIsVisible(true);
      } else {
        observer.observe(imgRef.current);
      }
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      onError = {handleError}
    />
  );
};

export default LazyImage;
