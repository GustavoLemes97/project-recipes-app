import React from 'react';
import PropTypes from 'prop-types';

function Card({ mealOrDrink, thumb, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        className="food-image"
        src={ thumb }
        alt={ mealOrDrink }
      />
      <p data-testid={ `${index}-card-name` }>{mealOrDrink}</p>
    </div>
  );
}

export default Card;

Card.propTypes = {
  mealOrDrink: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
