import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../utilities/helper';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  

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

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        <img src={displayImageUrl} alt="poster-image" loading="lazy" />
      </div>

      {/* Tooltip: Use hover for desktop, click/touch for mobile */}
      <Tooltip
        title={title}
        enterTouchDelay={0} // Show tooltip immediately on touch devices
        leaveTouchDelay={2000} 
        disableFocusListener={isMobile}
        disableHoverListener={isMobile}
        disableTouchListener={!isMobile}
        onClick={isMobile ? () => {} : null} // Handle tooltip for mobile click
      >
        <span className="title">{title}</span>
      </Tooltip>
    </div>
  );
};

export default GridItem;
