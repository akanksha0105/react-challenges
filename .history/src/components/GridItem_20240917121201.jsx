import React, { useState, useEffect } from 'react';
import { getImageUrl, getTruncatedTitle } from '../utilities/helper';
import CustomTooltip from './CustomTooltip';  // Import the CustomTooltip component

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);

  // Truncated title for display
  const truncatedTitle = getTruncatedTitle(title); // assuming 20 as max length

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
        {error ? (
          <p>{error}</p>
        ) : (
          <img src={displayImageUrl} alt="poster-image" loading="lazy" />
        )}
      </div>


      <CustomTooltip content={title}>
        <div className="title">{truncatedTitle}</div>
      </CustomTooltip>
    </div>
  );
};

export default GridItem;
