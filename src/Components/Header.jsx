import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, searchBtn }) {
  const [showBar, setShowBar] = useState(false);
  return (
    <>
      <nav>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" alt="Profile" src={ ProfileIcon } />
        </Link>
        <h1 data-testid="page-title">{pageTitle}</h1>
        {searchBtn && (
          <button
            type="button"
            onClick={ () => (showBar ? setShowBar(false) : setShowBar(true)) }
          >
            <img
              data-testid="search-top-btn"
              alt="searchIcon"
              src={ SearchIcon }
            />
          </button>
        )}
      </nav>
      {showBar && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchBtn: PropTypes.bool.isRequired,
};

export default Header;
