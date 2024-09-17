import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'



import Search from './Search'

const Navbar = () => {
  const { title } = useSelector((state) => state.contentListing)

  const [bgImage, setBgImage] = useState('')
  const [backIcon, setBackIcon] = useState('')
  const [searchIcon, setSearchIcon] = useState('')
  const [error, setError] = useState(null)

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
      <div className="iconContainer">
        {backIcon && <img src={backIcon} alt="Back" />}
      </div>

      <div className="contentPageTitle">{title}</div>

      <Search searchIcon={searchIcon} />
    </div>
  )
}

export default Navbar
