import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import '../css/styles.css'
import { setSearchTerm } from '../features/contentListingSlice'
import { debounce } from '../utilities/helper'
import '../css/Search.css'
const Search = ({ searchIcon }) => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector((state) => state.contentListing)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

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

  const handleClickOutside = useCallback((event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsExpanded(false)
    }
  }, [])
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div
      ref={containerRef}
      className={`searchContainer ${isExpanded ? 'expanded' : ''}`}
    >
      <button className="iconButton">
        {searchIcon && (
          <img
            src={searchIcon}
            alt="Search"
            onClick={handleSearchClick}
            style={{
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
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
        <button onClick={handleCloseClick} className="iconButton">
          <CloseIcon /> {/* Set the color here */}
        </button>
      )}
    </div>
  )
}

export default React.memo(Search)
