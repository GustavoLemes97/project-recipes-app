import React from 'react';
import '../css/FoodDetail.css';
import PropTypes from 'prop-types';

function FoodDetail({ meal }) {
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = meal;

  const ingredients = Object.entries(meal).filter(
    (food) => food[0].includes('Ingredient') && food[1],
  );
  console.log(meal);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        className="foodDetail-img"
        src={ strMealThumb }
        alt={ strMealThumb }
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>

      <button type="button" data-testid="share-btn">
        COMPARTILHAR
      </button>
      <button type="button" data-testid="favorite-btn">
        FAVORITAR
      </button>

      <p data-testid="recipe-category">{strCategory}</p>

      <h2>Ingredientes:</h2>
      {ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {`-${ingredient[1]}`}
        </p>
      ))}

      <p data-testid="instructions">{strInstructions}</p>

      <iframe
        width="325"
        height="240"
        data-testid="video"
        src={ strYoutube.replace('watch?v=', 'embed/') }
        title="YouTube Video Player"
      />

      <button type="button" data-testid="start-recipe-btn">
        INICIAR
      </button>

      <p data-testid="0-recomendation-card" />
      <p data-testid="1-recomendation-card" />
    </div>
  );
}

FoodDetail.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default FoodDetail;
