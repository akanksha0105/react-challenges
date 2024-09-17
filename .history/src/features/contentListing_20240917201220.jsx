import React from 'react'
import "../css/ContentListing.css"
import NavBar from '../components/NavBar'

const ContentListing = () => {
  return (
    <div className = "contentListing">
      <Navr />
      <div className="content">
        <GridComponent />
      </div>
    </div>
  )
}

export default ContentListing
