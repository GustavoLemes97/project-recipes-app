import React from 'react';
import { Link } from 'react-router-dom';

import {
  checkedIngredient,
  changeIngredients,
  changeFavorite,
  copyToClipBoard,
  saveProgressInLocalStorage,
} from '../functions/Food/DrinkProcess';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/FoodProcess.css';

function FoodProcess() {
  const [data, setData] = React.useState('');
  const [ingredient, setIngredients] = React.useState([]);
  const [copiedLink, setCopiedLink] = React.useState('');
  const [favorited, setFavorited] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    changeFavorite(setFavorited);
  }, []);

  function verifyAllInputs() {
    const settingDisabled = ingredient.every(({ checked }) => checked);
    setDisabled(!settingDisabled);
    saveProgressInLocalStorage('meals', ingredient);
  }

  async function fetchMeal(id) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await response.json();
    setData(json.meals[0]);

    const filteredIngredients = Object.entries(json.meals[0]).filter(
      (arr) => arr[0].includes('Ingredient') && arr[1],
    );

    const ingredients = filteredIngredients.map((ing) => ({
      ingredient: ing[1],
      checked: false,
    }));

    setIngredients(ingredients);
    changeIngredients(setIngredients, 'meals');
  }

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];
    fetchMeal(id);
  }, []);

  React.useEffect(() => {
    changeIngredients(setIngredients, 'meals');
  }, []);

  if (!data) return <p>Loading...</p>;

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strArea,
    idMeal,
  } = data;

  function favoriteRecipe() {
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipe = {
      id: idMeal,
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

  return (
    <div>
      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>

      <button
        onClick={ () => copyToClipBoard(setCopiedLink) }
        type="button"
        data-testid="share-btn"
      >
        COMPARTILHAR
      </button>
      {copiedLink && <p>Link copiado!</p>}

      <button onClick={ favoriteRecipe } type="button">
        <img
          data-testid="favorite-btn"
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-btn"
        />
      </button>

      <p data-testid="recipe-category">{`Category: ${strCategory}`}</p>
      {console.log(ingredient)}
      {ingredient.map(({ ingredient: ingred, checked }, index) => (
        <label
          style={ checked ? { textDecoration: 'line-through' } : null }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingred }
        >
          {ingred}
          <input
            defaultChecked={ checked }
            onClick={ (e) => checkedIngredient(
              e, setIngredients, verifyAllInputs, ingredient,
            ) }
            type="checkbox"
            id={ ingred }
          />
        </label>
      ))}

      <p data-testid="instructions">{strInstructions}</p>

      <Link to="/receitas-feitas">
        <button
          disabled={ disabled }
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </Link>
    </div>
  );
}

export default FoodProcess;
