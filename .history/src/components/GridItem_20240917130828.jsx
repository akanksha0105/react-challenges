import React, { useState, useEffect } from 'react'
import { getImageUrl, getTruncatedTitle } from '../utilities/helper'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('')
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await getImageUrl(displayImage)
        setDisplayImageUrl(imageUrl)
      } catch (err) {
        setError('Failed to load image')
        console.error(err)
      }
    }

    fetchImage()
  }, [displayImage])

  return (
    <div className="gridItem">
      <div className="imageWrapper">
        <img src={displayImageUrl} alt="poster-image" loading="lazy" />
      </div>

      <Tooltip title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
    </div>
  )
}

export default GridItem
