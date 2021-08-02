import React from 'react';
import '../css/FoodDetail.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCockTailsAPI } from '../Actions';
import { getCockTailsDefault } from '../Services/cockTailAPI';
import shareIcon from '../images/shareIcon.svg';

function FoodDetail({ meal, id }) {
  const [drink, setDrinks] = React.useState('');
  const [copiedLink, setCopiedLink] = React.useState(false);
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = meal;

  const dispatch = useDispatch();
  const globalState = useSelector(({ drinks }) => drinks);

  React.useEffect(() => {
    dispatch(fetchCockTailsAPI(getCockTailsDefault));
  }, []);

  React.useEffect(() => {
    const six = 6;
    const filteredDrinks = globalState.drinks.filter((_, idx) => idx < six);
    setDrinks(filteredDrinks);
  }, [globalState.drinks]);

  function copyToClipBoard() {
    navigator.clipboard.writeText(window.location);
    setCopiedLink(true);
  }

  const ingredients = Object.entries(meal).filter(
    (food) => food[0].includes('Ingredient') && food[1],
  );

  const measures = Object.entries(meal).filter(
    (measure) => measure[0].includes('Measure') && measure[1],
  );

  return (
    <div>
      <img
        data-testid="recipe-photo"
        className="foodDetail-img"
        src={ strMealThumb }
        alt={ strMealThumb }
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>

      <button
        onClick={ copyToClipBoard }
        type="button"
      >
        <img data-testid="share-btn" src={ shareIcon } alt={ shareIcon } />
      </button>

      {copiedLink && <p>Link copiado!</p>}

      <button type="button" data-testid="favorite-btn">
        FAVORITAR
      </button>

      <p data-testid="recipe-category">{strCategory}</p>

      <h2>Ingredientes:</h2>
      {ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {` - ${ingredient[1]}: ${measures[index][1]}`}
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

      <div className="recommendedDrinks">
        {drink
          && drink.map(
            ({ strDrink, strDrinkThumb, strCategory: category }, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                className={
                  index < 2 ? 'recommendedDrink' : 'recommendedDrinksNotVisible'
                }
                key={ index }
              >
                <img src={ strDrinkThumb } alt={ strDrinkThumb } />
                <p>{category}</p>
                <h4 data-testid={ `${index}-recomendation-title` }>{strDrink}</h4>
              </div>
            ),
          )}
      </div>

      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-button"
          type="button"
        >
          Iniciar Receita
        </button>
      </Link>
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
