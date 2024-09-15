import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/contentListingSlice';
import { debounce } from '../utilities/helper';
import GridItem from './GridItem';
import '../css/styles.css';

const GridComponent = () => {
  const dispatch = useDispatch();
  const { data, isLoading, hasMore, currentPage, filteredList } = useSelector(
    (state) => state.contentListing
  );

  // Fetch initial data
  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      dispatch(fetchData(1));
    }
  }, [data.length, isLoading, dispatch]);

  // Scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      const bottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight;

      if (bottom && !isLoading && hasMore) {
        dispatch(fetchData(currentPage + 1));
      }
    }, 200), // Debounce wait time (200ms)
    [dispatch, isLoading, hasMore, currentPage]
  );

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="content-grid-container">
      {filteredList.length > 0 ? (
        filteredList.map((dataItem) => (
          <GridItem
            key={dataItem.id} // Use a unique identifier from your data
            title={dataItem.name}
            displayImage={dataItem['poster-image']}
          />
        ))
      ) : (
        <p>No results found.</p> // Optional: Handle empty state
      )}
      {isLoading && <p>Loading more...</p>} {/* Optional: Handle loading state */}
    </div>
  );
};

export default GridComponent;
