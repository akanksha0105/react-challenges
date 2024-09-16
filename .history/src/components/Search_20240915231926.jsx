import React, { useState, useCallback , useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import "../css/styles.css";
import { setSearchTerm } from '../features/contentListingSlice';
import { debounce } from '../utilities/helper';

const Search = ({ searchIcon }) => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.contentListing);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setIsExpanded(true);
    inputRef.current?.focus(); 
  };

  
  const handleCloseClick = () => {
    dispatch(setSearchTerm('')); 
    setIsExpanded(false);
  };

  
  const handleInputChange = (event) => {
   
    dispatch(setSearchTerm(event.target.value))
  };

  return (
    <div className={`searchContainer ${isExpanded ? 'expanded' : ''}`} style={{ display: "flex", gap: "0.25em" }}>
      <button className="icon-button" style={{ background: "transparent", border: "none" }}>
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
        style={{ padding: '0.5em', fontSize: '16px', width: '100%' }}
      />
       {searchTerm.length > 0 && (
        <button
          onClick={handleCloseClick}
          className="icon-button"
          style={{ background: "transparent", border: "none", display: 'flex', alignItems: 'center' }}
        >
          <CloseIcon style={{ fontSize: '24px', color: 'white' }} />  {/* Set the color here */}
        </button>
      )}
    </div>
  );
};

export default React.memo(Search);
