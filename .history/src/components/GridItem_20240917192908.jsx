import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getImageUrl } from '../utilities/helper';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const titleRef = useRef(null);
  const tooltipRef = useRef(null);
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

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [title]);

  const handleTooltipClick = () => {
    if (isMobile && isOverflowing) {
      setTooltipOpen((prev) => !prev);
    }
  };

 
  const handleClickOutside = (event) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target) &&
      titleRef.current &&
      !titleRef.current.contains(event.target)
    ) {
      setTooltipOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile]);

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        {error ? (
          <div className="error">Error loading image</div>
        ) : (
          <img src={displayImageUrl} alt="poster-image" loading="lazy" />
        )}
      </div>

      <Tooltip
        title={title}
        enterTouchDelay={0}
        leaveTouchDelay={2000}
        disableFocusListener={isMobile}
        disableHoverListener={isMobile}
        disableTouchListener={!isMobile}
        arrow
        open={isOverflowing && (isMobile ? tooltipOpen : undefined)}
        PopperProps={{
          anchorEl: tooltipRef.current,
        }}
        ref={tooltipRef}
      >
        <span 
          ref={titleRef} 
          className="title" 
          onClick={handleTooltipClick} 
        >
          {title}
        </span>
      </Tooltip>
    </div>
  );
};

export default GridItem;
