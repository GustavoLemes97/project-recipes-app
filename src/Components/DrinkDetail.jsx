import React from 'react';
import PropTypes from 'prop-types';
import '../css/DrinkDetail.css';

function DrinkDetail({ drink }) {
  console.log(drink);
  const {
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
  } = drink;

  const ingredients = Object.entries(drink).filter(
    (cocktail) => cocktail[0].includes('Ingredient') && cocktail[1],
  );

  const measures = Object.entries(drink).filter(
    (measure) => measure[0].includes('Measure') && measure[1],
  );

  return (
    <div>
      <img
        data-testid="recipe-photo"
        className="drinkDetail-img"
        src={ strDrinkThumb }
        alt={ strDrinkThumb }
      />

      <h1 data-testid="recipe-title">{strDrink}</h1>

      <button type="button" data-testid="share-btn">
        COMPARTILHAR
      </button>
      <button type="button" data-testid="favorite-btn">
        FAVORITAR
      </button>

      <p data-testid="recipe-category">{strAlcoholic}</p>

      <h2>Ingredientes:</h2>
      {ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {` - ${ingredient[1]}: ${measures[index][1]}`}
        </p>
      ))}

      <p data-testid="instructions">{strInstructions}</p>

      <button type="button" data-testid="start-recipe-btn">
        INICIAR
      </button>

      <p data-testid="0-recomendation-card" />
      <p data-testid="1-recomendation-card" />
    </div>
  );
}

export default DrinkDetail;

DrinkDetail.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strInstructions: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
};
