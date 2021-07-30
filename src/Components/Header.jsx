import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, searchBtn }) {
  return (
    <nav>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" alt="Profile" src={ ProfileIcon } />
      </Link>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {searchBtn && (
        <button type="button">
          <img data-testid="search-top-btn" alt="searchIcon" src={ SearchIcon } />
        </button>
      )}
    </nav>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchBtn: PropTypes.bool.isRequired,
};

export default Header;
