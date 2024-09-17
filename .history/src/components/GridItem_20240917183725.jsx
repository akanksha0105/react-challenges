import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../utilities/helper';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
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
      setShowTooltip(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
  }, [title]);

  const handleTooltipClick = () => {
    if (isMobile) {
      setShowTooltip((prev) => !prev);
    }
  };

  return (
    <div className="gridItem" onClick={handleTooltipClick}>
      <div className="imageWrapper">
        {error ? (
          <div className="error">Error loading image</div>
        ) : (
          <img src={displayImageUrl} alt="poster-image" loading="lazy" />
        )}
      </div>

      {/* Tooltip: Use hover for desktop, click/touch for mobile */}
      <Tooltip
        title={title}
        enterTouchDelay={0}
        leaveTouchDelay={2000}
        disableFocusListener={isMobile}
        disableHoverListener={isMobile}
        disableTouchListener={!isMobile}
        arrow
        open={showTooltip} // Always control the open state
      >
        <span ref={titleRef} className="title">
          {title}
        </span>
      </Tooltip>
    </div>
  );
};

export default GridItem;
