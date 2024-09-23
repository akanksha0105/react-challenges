import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Grid.css';
import GridItem from './GridItem';
import ShimmerGridItem from './ShimmerGridItem';
import { fetchData } from '../features/contentListingSlice';
import { debounce } from '../utilities/helper';

const GridComponent = () => {
  const dispatch = useDispatch();
  const { data, isLoading, hasMore, currentPage, filteredList } = useSelector(
    (state) => state.contentListing,
  );

  // Fetch initial data
  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      dispatch(fetchData(1));
    }
  }, [data.length, isLoading, dispatch]);

  // Handle infinite scroll
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      const bottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight;

      if (bottom && !isLoading && hasMore) {
        dispatch(fetchData(currentPage + 1));
      }
    }, 200),
    [isLoading, hasMore, currentPage],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="contentGridContainer">
      {isLoading && data.length === 0 ? (
        // Show shimmer during the initial load when no data is available yet
        <ShimmerGridItem />
      ) : filteredList.length > 0 ? (
        // Show grid items when the filtered list has data
        filteredList.map((dataItem) => (
          <GridItem
            key={dataItem.id}
            name={dataItem.name}
            posterUrl={dataItem.posterUrl}
          />
        ))
      ) : !isLoading && data.length > 0 ? (
        // Show "No results" message when data exists but nothing matches the filter
        <div>No results</div>
      ) : null}

      {isLoading && filteredList.length > 0 && hasMore ? (
        // Show shimmer during subsequent loads when more data is being fetched
        <ShimmerGridItem />
      ) : null}
    </div>

  );
};

export default GridComponent;
