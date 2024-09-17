import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getImageUrl } from '../utilities/helper';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [isOverflowing, setIsOverflowing] = useState(false); // Track overflow state
  const titleRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await getImageUrl(displayImage);
        setDisplayImageUrl(imageUrl);
      } catch (err) {
        setError('Failed to load image');
        console.error(err);
      }
    };

    fetchImage();
  }, [displayImage]);

  useEffect(() => {
    if (titleRef.current) {
      // Check if title overflows its container
      setIsOverflowing(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
  }, [title]);

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        {error ? (
          <div className="error">Error loading image</div>
        ) : (
          <img src={displayImageUrl} alt="poster-image" loading="lazy" />
        )}
      </div>

      {/* Tooltip: Only show when the title overflows */}
      <Tooltip
        title={title}
        enterTouchDelay={0}
        leaveTouchDelay={2000}
        disableFocusListener={isMobile}
        disableHoverListener={isMobile}
        disableTouchListener={!isMobile}
        arrow
        open={isOverflowing && !isMobile} // Show tooltip if overflow and not on mobile
      >
        <span ref={titleRef} className="title">
          {title}
        </span>
      </Tooltip>
    </div>
  );
};

export default GridItem;
