//TODO : Check the scrolling in the last, the title goes
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getImageUrl } from '../utilities/helper'

import Search from './Search'
import '../css/styles.css'
const Navbar = () => {
  const { title } = useSelector((state) => state.contentListing)

  const [bgImage, setBgImage] = useState('')
  const [backIcon, setBackIcon] = useState('')
  const [searchIcon, setSearchIcon] = useState('')
  const [error, setError] = useState(null)
  const [searchBarActivated, setSearchBarActivated] = useState(false)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const bgImageUrl = await getImageUrl('nav_bar.png')
        setBgImage(bgImageUrl)

        const backIconUrl = await getImageUrl('Back.png')
        setBackIcon(backIconUrl)

        const searchIconUrl = await getImageUrl('search.png')
        setSearchIcon(searchIconUrl)
      } catch (err) {
        setError('Failed to load images')
        console.error(err)
      }
    }

    fetchImages()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div
      className="navBar"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Back Icon */}
      <div className="icon-container">
        {backIcon && (
          <img
            src={backIcon}
            alt="Back"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          />
        )}
      </div>

      {/* Title */}
      <div className="" style={{ fontSize: '18px', color: '#fff' }}>
        {title}
      </div>

      <Search searchIcon={searchIcon} />
      {/* Search Icon */}
    </div>
  )
}

export default Navbar
