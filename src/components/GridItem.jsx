import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../css/Grid.css';
import { placeholderImage } from '../utilities/helper';

const GridItem = ({ posterUrl, name }) => {

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

  const handleError = (event) => {
    event.target.src = placeholderImage; // Set placeholder image on error
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
      <img src={posterUrl} alt="poster-image" loading="lazy" onError={handleError} />
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
};

export default GridItem;
