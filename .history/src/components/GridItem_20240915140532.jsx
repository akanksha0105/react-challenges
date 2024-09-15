import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../utilities/helper';

const GridItem = ({ displayImage, title }) => {
  const [displayImageUrl, setDisplayImageUrl] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log("")
        const displayImageUrl = await getImageUrl(displayImage)
        setDisplayImageUrl(displayImageUrl)
      } catch (err) {
        setError('Failed to load image')
       
        console.error(err)
      }
    }

    fetchImage()
  }, [])

  return (
    <div className="gridItem">
      <img src={displayImageUrl} alt={'poster-image'} />
      <div>{title}</div>
    </div>
  )
}

export default GridItem
