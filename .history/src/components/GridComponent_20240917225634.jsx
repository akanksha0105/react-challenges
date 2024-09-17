import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/Grid.css'
import GridItem from './GridItem'
import Shimm
import { v4 as uuidv4 } from 'uuid'
import { fetchData } from '../features/contentListingSlice'
import { debounce } from '../utilities/helper'


const GridComponent = () => {
  const dispatch = useDispatch()
  const { data, isLoading, hasMore, currentPage, filteredList } = useSelector(
    (state) => state.contentListing,
  )

  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      dispatch(fetchData(1))
    }
  }, [data.length, isLoading, dispatch])

  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY
      const bottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight

      if (bottom && !isLoading && hasMore) {
        dispatch(fetchData(currentPage + 1))
      }
    }, 200),
    [isLoading, hasMore, currentPage],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="contentGridContainer">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <ShimmerGridItem key={index} />
        ))
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
