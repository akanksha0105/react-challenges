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

  
  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      dispatch(fetchData(1));
    }
  }, [data.length, isLoading]);

  
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      const bottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight;

      if (bottom && !isLoading && hasMore) {
        dispatch(fetchData(currentPage + 1));
      }
    }, 200), 
    [isLoading, hasMore, currentPage]
  );


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="contentGridContainer">
      {filteredList.length > 0 ? (
        filteredList.map((dataItem) => (
          <GridItem
            key={dataItem.id} 
            title={dataItem.name}
            displayImage={dataItem['poster-image']}
          />
        ))
      ) : (
        <p>No results found.</p> 
      )}
    </div>
  );
};

export default GridComponent;
