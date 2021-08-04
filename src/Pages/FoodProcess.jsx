import React from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/FoodProcess.css';

function checkedIngredient(
  { target: { checked, parentNode } },
  setIngredients,
  verify,
  ingredient,
) {
  if (checked) {
    parentNode.style.textDecoration = 'line-through';
  } else {
    parentNode.style.textDecoration = 'none';
  }
  const checkIngredient = ingredient.map((ing) => {
    if (parentNode.innerText === ing.ingredient) ing.checked = true;
    return ing;
  });

  setIngredients(checkIngredient);
  verify();
}

function FoodProcess() {
  const [data, setData] = React.useState('');
  const [ingredient, setIngredients] = React.useState([]);
  const [copiedLink, setCopiedLink] = React.useState('');
  const [favorited, setFavorited] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];
    const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (store) {
      const actualFood = store.find((item) => item.id === id);
      if (actualFood) setFavorited(true);
    }
  }, []);

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
  }

  function copyToClipBoard() {
    const { pathname } = window.location;
    navigator.clipboard.writeText(
      `http://localhost:3000${pathname.replace(/\/in-progress/, '')}`,
    );
    setCopiedLink(true);
  }

  function verifyAllInputs() {
    const settingDisabled = ingredient.every(({ checked }) => checked);
    setDisabled(!settingDisabled);
  }

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];
    fetchMeal(id);
  }, []);

  if (!data) return <p>Loading...</p>;
  console.log(data);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strArea,
    idMeal,
    strTags,
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
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(addFavoriteRecipe),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([newFavoriteRecipe]),
      );
    }
    setFavorited(!favorited);
  }

  function doneRecipes() {
    const currentDate = new Date().toLocaleDateString('PT-BR');
    const localStorageData = JSON.parse(localStorage.getItem('doneRecipes'));
    let tags = strTags;
    if (tags === null) {
      tags = '';
    }
    const finishLocalStorage = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: currentDate,
      tags: [tags],
    };
    if (localStorageData) {
      const addFinishRecipes = [...localStorageData, finishLocalStorage];
      localStorage.setItem('doneRecipes', JSON.stringify(addFinishRecipes));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([finishLocalStorage]));
    }
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

      <button onClick={ copyToClipBoard } type="button" data-testid="share-btn">
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

      {ingredient.map(({ ingredient: ingred }, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingred }
        >
          {ingred}
          <input
            onClick={ (e) => checkedIngredient(e, setIngredients, verifyAllInputs, ingredient) }
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
          onClick={ doneRecipes }
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </Link>
    </div>
  );
}

export default FoodProcess;
