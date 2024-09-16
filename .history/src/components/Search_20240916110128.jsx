import React, { useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import '../css/styles.css'
import { setSearchTerm } from '../features/contentListingSlice'
import { debounce } from '../utilities/helper'

const Search = ({ searchIcon }) => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector((state) => state.contentListing)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)

  const handleSearchClick = () => {
    setIsExpanded(true)
    inputRef.current?.focus()
  }

  const handleCloseClick = () => {
    dispatch(setSearchTerm(''))
    setIsExpanded(false)
  }

  const handleInputChange = (event) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <div
      className={`searchContainer ${isExpanded ? 'expanded' : ''}`}
    
    >
      <button
        className="icon-button"
       
      >
        {searchIcon && (
          <img
            src={searchIcon}
            alt="Search"
            onClick={handleSearchClick}
          
          />
        )}
      </button>
      <input
        ref={inputRef}
        className="searchInput"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      
      />
      {searchTerm.length > 0 && (
        <button
          onClick={handleCloseClick}
          className="icon-button"
        
        >
          <CloseIcon  />{' '}
          {/* Set the color here */}
        </button>
      )}
    </div>
  )
}

export default React.memo(Search)
