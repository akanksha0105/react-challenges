//TODO : Check the scrolling in the last, the title goes
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getImageUrl } from '../utilities/helper'

import Search from './Search';

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
      className="navbar"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '60px',
        display: 'flex',
        gap: '2em',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5em 0.75em',
        position: 'fixed',
        top: 0, // Fix it to the top
        left: 0,
        right: 0,
        zIndex: 1000,
        // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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
      <div className="title" style={{ fontSize: '18px', color: '#fff' }}>
        {title}
      </div>

        <Search searchIcon = {searchIcon}/>
      {/* Search Icon */}
    
    </div>
  )
}

export default Navbar
