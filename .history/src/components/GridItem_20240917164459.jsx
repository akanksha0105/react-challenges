import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../utilities/helper';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  // Check if it's a mobile screen
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
    if (titleRef.current && containerRef.current) {
      const titleWidth = titleRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;

      // Check if title is overflowing
      setShowTooltip(titleWidth > containerWidth);
    }
  }, [title]);

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        <img src={displayImageUrl} alt="poster-image" loading="lazy" />
      </div>

      <div
        className="titleContainer"
        ref={containerRef}
      >
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
      </div>
    </div>
  );
};

export default GridItem;
