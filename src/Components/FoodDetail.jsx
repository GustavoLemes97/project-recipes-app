import React from 'react';
import '../css/FoodDetail.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCockTailsAPI } from '../Actions';
import { getCockTailsDefault } from '../Services/cockTailAPI';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function localStorageHandle(func, id, storageName) {
  const favoriteRecipes = JSON.parse(localStorage.getItem(storageName));

  if (favoriteRecipes) {
    const actualRecipe = favoriteRecipes.find(({ id: ID }) => ID === id);

    if (actualRecipe) {
      func(true);
    }
  }
}

function handleInProgressRecipe(func, id) {
  const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (store && store.meals[id]) {
    func(true);
  }
}

function FoodDetail({ meal, id }) {
  const [drink, setDrinks] = React.useState('');
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [doneRecipe, setDoneRecipe] = React.useState(false);
  const [progressRecipe, setProgressRecipe] = React.useState(false);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = meal;

  const dispatch = useDispatch();
  const globalState = useSelector(({ drinks }) => drinks);

  React.useEffect(() => {
    dispatch(fetchCockTailsAPI(getCockTailsDefault));
    localStorageHandle(setFavorited, id, 'favoriteRecipes');
    localStorageHandle(setDoneRecipe, id, 'doneRecipes');
    handleInProgressRecipe(setProgressRecipe, id);
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

  function favoriteRecipe() {
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipe = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (store) {
      const addFavoriteRecipe = [...store, newFavoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(addFavoriteRecipe));
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([newFavoriteRecipe]),
      );
    }
    setFavorited(!favorited);
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

      <button onClick={ copyToClipBoard } type="button">
        <img data-testid="share-btn" src={ shareIcon } alt={ shareIcon } />
      </button>

      {copiedLink && <p>Link copiado!</p>}

      <button onClick={ favoriteRecipe } type="button">
        <img
          data-testid="favorite-btn"
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-btn"
        />
      </button>

      <p data-testid="recipe-category">{strCategory}</p>

      <h2>Ingredientes:</h2>
      {ingredients.map((ingredient, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {` - ${ingredient[1]}`}
        </p>
      ))}

      <h2>Quantidades</h2>
      {measures.map((measure, index) => (
        <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {` - ${measure[1]}`}
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

      {!doneRecipe && (
        <Link to={ `/comidas/${id}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            type="button"
          >
            {progressRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      )}
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
    strArea: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default FoodDetail;
