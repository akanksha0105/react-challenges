import React, { useState, useEffect, useRef, forwardRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../css/Grid.css';

import LazyImage from '../utilities/LazyImage';

const GridItem = forwardRef(({ name, posterUrl, key }, ref) => {

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const titleRef = useRef(null);
  const tooltipRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        setIsOverflowing(
          titleRef.current.scrollWidth > titleRef.current.clientWidth,
        );
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [name]);

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
    <div key={key} ref={ref || null} className="gridItem">
      {/* <img src={posterUrl} alt="poster-image" loading="lazy" onError={handleError} /> */}
      <LazyImage src={posterUrl} alt="poster-image" />
      <Tooltip
        title={name}
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
        <span ref={titleRef} className="title" onClick={handleTooltipClick}>
          {name}
        </span>
      </Tooltip>
    </div>
  );
});

export default GridItem;
