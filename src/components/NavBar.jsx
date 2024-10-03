import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Navbar.css';
import Search from './Search';
import { getImageUrl } from '../utilities/helper';
import { backIcon, navBarBackground, searchIcon } from '../utilities/icons';
import { setSearchTerm } from '../features/contentListingSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.contentListing);
  const [searchContainerExpanded, setSearchContainerExpanded] = useState(false);
  // const [backIcon, setBackIcon] = useState(localStorage.getItem('backIcon') || null);
  // const [searchIcon, setSearchIcon] = useState(localStorage.getItem('searchIcon') || null);


  const handleBackButtonClick = () => {
    dispatch(setSearchTerm(""));
    setSearchContainerExpanded(false);
  };

  return (
    <div
      className="navBar"
      style={{
        backgroundImage: `url(${getImageUrl(navBarBackground)})`,
      }}
    >
      <button className="iconButton" onClick={handleBackButtonClick}>
        <img src={`${getImageUrl(backIcon)}`} alt="Back" loading="lazy" />

      </button>

      <div className={`contentPageTitle ${searchContainerExpanded ? "hide" : ""}`}>{title}</div>

      <Search searchIcon={`${getImageUrl(searchIcon)}`} searchContainerExpanded={searchContainerExpanded} setSearchContainerExpanded={setSearchContainerExpanded} />
    </div>
  );
};

export default Navbar;
