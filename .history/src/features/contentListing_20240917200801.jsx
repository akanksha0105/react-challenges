import React from 'react'
import "./Con"
const ContentListing = () => {
  return (
    <div className = "contentListing">
      <NavBar />
      <div className="content">
        <GridComponent />
      </div>
    </div>
  )
}

export default ContentListing
