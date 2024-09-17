import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getImageUrl } from '../utilities/helper';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false); // Manage tooltip state for mobile
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
    const checkOverflow = () => {
      if (titleRef.current) {
        setIsOverflowing(
          titleRef.current.scrollWidth > titleRef.current.clientWidth
        );
      }
    };

    checkOverflow(); // Check overflow on mount and on title change

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [title]);

  const handleTooltipClick = () => {
    if (isMobile && isOverflowing) {
      setTooltipOpen((prev) => !prev);
    }
  };

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        {error ? (
          <div className="error">Error loading image</div>
        ) : (
          <img src={displayImageUrl} alt="poster-image" loading="lazy" />
        )}
      </div>

      {isOverflowing && (
        isMobile ? (
          <div className="tooltip-container" onClick={handleTooltipClick}>
            <span ref={titleRef} className="title">
              {title}
            </span>
            {tooltipOpen && (
              <div className="customTooltip">
                {title}
              </div>
            )}
          </div>
        ) : (
          <Tooltip
            title={title}
            enterTouchDelay={0}
            leaveTouchDelay={2000}
            arrow
          >
            <span ref={titleRef} className="title">
              {title}
            </span>
          </Tooltip>
        )
      )}
    </div>
  );
};

export default GridItem;
