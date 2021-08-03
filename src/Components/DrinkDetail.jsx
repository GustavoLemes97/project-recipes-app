import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMealsAPI } from '../Actions';
import { getMealsDefault } from '../Services/mealAPI';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/DrinkDetail.css';

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
  if (store && store.cocktails[id]) {
    func(true);
  }
}

function DrinkDetail({ drink, id }) {
  const [food, setFoods] = React.useState('');
  const [favorited, setFavorited] = React.useState(false);
  const [doneRecipe, setDoneRecipe] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [progressRecipe, setProgressRecipe] = React.useState(false);

  const {
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
    strCategory,
  } = drink;

  const dispatch = useDispatch();
  const globalState = useSelector(({ foods }) => foods);

  React.useEffect(() => {
    dispatch(fetchMealsAPI(getMealsDefault));
    localStorageHandle(setDoneRecipe, id, 'doneRecipes');
    localStorageHandle(setFavorited, id, 'favoriteRecipes');
    handleInProgressRecipe(setProgressRecipe, id);
  }, []);

  React.useEffect(() => {
    const six = 6;
    const filteredFoods = globalState.foods.filter((_, idx) => idx < six);
    setFoods(filteredFoods);
  }, [globalState.foods]);

  function copyToClipBoard() {
    navigator.clipboard.writeText(window.location);
    setCopiedLink(true);
  }

  function favoriteRecipe() {
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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

      <button type="button" onClick={ copyToClipBoard }>
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

      <p data-testid="recipe-category">{strAlcoholic}</p>

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

      <div className="recommendedFoods">
        {food
          && food.map(({ strMeal, strMealThumb, strCategory: categ }, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              className={
                index < 2 ? 'recommendedFood' : 'recommendedFoodsNotVisible'
              }
              key={ index }
            >
              <img src={ strMealThumb } alt={ strMealThumb } />
              <p>{categ}</p>
              <h4 data-testid={ `${index}-recomendation-title` }>{strMeal}</h4>
            </div>
          ))}
      </div>

      {!doneRecipe && (
        <Link to={ `/bebidas/${id}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            type="button"
          >
            {progressRecipe ? 'Continuar Receita' : '    Iniciar Receita'}
          </button>
        </Link>
      )}
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
    strCategory: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};
