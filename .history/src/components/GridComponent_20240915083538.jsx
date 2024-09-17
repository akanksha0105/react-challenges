import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../features/contentListingSlice'

import { debounce } from '../utilities/helper'
import GridItem from './GridItem'
import '../css/styles.css'
import { v4 as uuidv4 } from 'uuid'


const GridComponent = () => {
  const dispatch = useDispatch()
  const { data, isLoading, hasMore, currentPage, filteredList } = useSelector(
    (state) => state.contentListing,
  )

  
  const [requestSent, setRequestSent] = useState(false)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData(1))
    }
  }, [data.length])

 
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY
      const bottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight

     
      if (bottom && !isLoading && hasMore && !requestSent) {
        setRequestSent(true)
        dispatch(fetchData(currentPage + 1))
          .then(() => setRequestSent(false))
          .catch(() => setRequestSent(false))
      }
    }, 200), 
    [isLoading, hasMore, currentPage, requestSent],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="content-grid-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredList.length > 0 ? (
        filteredList.map((dataItem) => (
          <GridItem
            key={uuidv4()}
            title={dataItem.name}
            displayImage={dataItem['poster-image']}
          />
        ))
      ) : (
       
        <p>No results found.</p>
      )}
    </div>
  )
  
}

export default GridComponent
