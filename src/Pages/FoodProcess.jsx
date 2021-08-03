import React from 'react';
import '../css/FoodProcess.css';

function FoodProcess() {
  const [data, setData] = React.useState('');
  const [ingredient, setIngredients] = React.useState([]);

  function setStateInLocalStorage() {
    const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];

    if (store) {
      store.meals[id] = ingredient.map((arr) => arr[1]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(store));
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          cocktails: {},
          meals: {
            [id]: ingredient.map((arr) => arr[1]),
          },
        }),
      );
    }
  }

  async function fetchMeal(id) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await response.json();
    setData(json.meals[0]);
    setIngredients(
      Object.entries(json.meals[0]).filter(
        (arr) => arr[0].includes('Ingredient') && arr[1],
      ),
    );
  }

  function checkedIngredient({ target: { checked, parentNode } }) {
    if (checked) {
      parentNode.style.textDecoration = 'line-through';
    } else {
      parentNode.style.textDecoration = 'none';
    }
    setStateInLocalStorage();
  }

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];
    fetchMeal(id);
  }, []);

  if (!data) return <p>Loading...</p>;

  const { strMealThumb, strMeal, strCategory, strInstructions } = data;

  return (
    <div>
      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>

      <button type="button" data-testid="share-btn">
        COMPARTILHAR
      </button>
      <button type="button" data-testid="favorite-btn">
        FAVORITE
      </button>

      <p data-testid="recipe-category">{`Category: ${strCategory}`}</p>

      {ingredient.map((ingred, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingred[1] }
        >
          {ingred[1]}
          <input onClick={ checkedIngredient } type="checkbox" id={ ingred[1] } />
        </label>
      ))}

      <p data-testid="instructions">{strInstructions}</p>

      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </div>
  );
}

export default FoodProcess;
