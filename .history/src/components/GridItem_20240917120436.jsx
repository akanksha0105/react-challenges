import React, { useState, useEffect } from 'react';
import { getImageUrl, getTruncatedTitle } from '../utilities/helper';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
      getTruncatedTitle(title)
  }, [title])
  
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
      <div title = {""} className="title">{title}</div>
    </div>
  );
};

export default GridItem;
