import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Search.css';
import { setSearchTerm } from '../features/contentListingSlice';
import CloseIcon from '@mui/icons-material/Close';


const Search = ({ searchIcon, searchContainerExpanded, setSearchContainerExpanded }) => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.contentListing);
  // const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleSearchClick = () => {
    setSearchContainerExpanded(true);
    inputRef.current?.focus();
  };

  const handleCloseClick = () => {
    dispatch(setSearchTerm(''));
    setSearchContainerExpanded(false);
  };

  const handleInputChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  // const handleClickOutside = useCallback((event) => {
  //   if (containerRef.current && !containerRef.current.contains(event.target)) {
  //     setSearchContainerExpanded(false);
  //   }
  // }, []);


  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [handleClickOutside]);

  return (
    <div
      ref={containerRef}
      className={`searchContainer ${searchContainerExpanded ? 'expanded' : ''}`}
    >
      <button className="iconButton" onClick={handleSearchClick}>
        <img src={searchIcon} alt="Search" loading="lazy" />
      </button>
      <div
        className="searchInputContainer"
        style={{ display: searchContainerExpanded ? 'flex' : 'none' }}
      >
        <input
          ref={inputRef}
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleCloseClick} className="iconButton">
          <CloseIcon
            style={{
              display: searchTerm.length > 0 ? 'flex' : 'none',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Search);
