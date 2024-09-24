import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Grid.css';
import GridItem from './GridItem';
import { fetchData } from '../features/contentListingSlice';


const GridComponent = () => {
  const dispatch = useDispatch();
  const { data, isLoading, hasMore, currentPage, filteredList } = useSelector(
    (state) => state.contentListing
  );

  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      dispatch(fetchData(1));
    }
  }, [data.length, dispatch, isLoading]);

  const observer = useRef();

  const lastBookElementRef = useCallback(node => {

    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasMore) {
          dispatch(fetchData(currentPage + 1));
        }
      });
    });

    if (node) observer.current.observe(node);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, hasMore, dispatch, currentPage]);


  return (
    <div className="contentGridContainer">
      {data?.length > 0 ?
        filteredList.length > 0 ? (
          filteredList.map((dataItem, index) => {
            const isLastItem = index === filteredList.length - 1;

            return (
              <GridItem
                ref={isLastItem ? lastBookElementRef : null}
                key={dataItem.id}
                name={dataItem.name}
                posterUrl={dataItem.posterUrl}
              />
            );
          })
        ) : (
          <div>No items found.</div>
        )
        : null}


    </div>
  );
};

export default GridComponent;
