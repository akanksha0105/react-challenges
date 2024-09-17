import React from 'react'
import "../css/ContentListing.css"
import Navbar from '../components/NavBar'
import Grid

const ContentListing = () => {
  return (
    <div className = "contentListing">
      <Navbar/>
      <div className="content">
        <GridComponent />
      </div>
    </div>
  )
}

export default ContentListing
