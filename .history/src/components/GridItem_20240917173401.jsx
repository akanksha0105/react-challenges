import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../utilities/helper';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
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
// Check if title text is overflowing
  useEffect(() => {
    if (titleRef.current) {
      const isOverflow = titleRef.current.scrollWidth > titleRef.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, [title]);

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        <img src={displayImageUrl} alt="poster-image" loading="lazy" />
      </div>

      <div className="titleContainer">
        {/* Conditionally render Tooltip only when text overflows */}
        {isOverflowing ? (
          <Tooltip
            title={title}
            enterTouchDelay={0} // Show tooltip immediately on touch devices
            leaveTouchDelay={2000} // Optional: keep tooltip for 2 seconds on touch
            disableFocusListener={isMobile}
            disableHoverListener={isMobile}
            disableTouchListener={!isMobile}
          >
            <span className="title" ref={titleRef}>
              {title}
            </span>
          </Tooltip>
        ) : (
          <span className="title" ref={titleRef}>
            {title}
          </span>
        )}
      </div>
    </div>
  );
 
};

export default GridItem;
