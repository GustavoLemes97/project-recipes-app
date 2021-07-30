import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="pages-footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          className="icon-footer"
          src={ drinkIcon }
          alt="drink"
        />
      </Link>

      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          className="icon-footer"
          src={ exploreIcon }
          alt="explore"
        />
      </Link>

      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          className="icon-footer"
          src={ mealIcon }
          alt="foods"
        />
      </Link>
    </footer>
  );
}

export default Footer;
