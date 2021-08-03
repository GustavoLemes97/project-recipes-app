import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ thumb, name, index }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default IngredientCard;

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
