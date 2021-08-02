import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealsAPI } from '../Actions';
import { getMealsDefault } from '../Services/mealAPI';
import '../css/DrinkDetail.css';

function DrinkDetail({ drink }) {
  const [food, setFoods] = React.useState('');
  const { strDrinkThumb, strDrink, strInstructions, strAlcoholic } = drink;

  const dispatch = useDispatch();
  const globalState = useSelector(({ foods }) => foods);

  React.useEffect(() => {
    dispatch(fetchMealsAPI(getMealsDefault));
  }, []);

  React.useEffect(() => {
    const six = 6;
    const filteredFoods = globalState.foods.filter((_, idx) => idx < six);
    setFoods(filteredFoods);
  }, [globalState.foods]);

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

      <div className="recommendedFoods">
        {food
          && food.map(({ strMeal, strMealThumb, strCategory }, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              className={
                index < 2 ? 'recommendedFood' : 'recommendedFoodsNotVisible'
              }
              key={ index }
            >
              <img src={ strMealThumb } alt={ strMealThumb } />
              <p>{strCategory}</p>
              <h4 data-testid={ `${index}-recomendation-title` }>{strMeal}</h4>
            </div>
          ))}
      </div>

      <button
        data-testid="start-recipe-btn"
        className="start-recipe-button"
        type="button"
      >
        Iniciar Receita
      </button>
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
