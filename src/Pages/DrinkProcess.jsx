import React from 'react';

function DrinkProcess() {
  const [data, setData] = React.useState('');
  const [ingredient, setIngredients] = React.useState([]);

  function setStateInLocalStorage() {
    const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];

    if (store) {
      store.cocktails[id] = ingredient.map((arr) => arr[1]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(store));
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          cocktails: { [id]: ingredient.map((arr) => arr[1]) },
          meals: {},
        }),
      );
    }
  }

  async function fetchMeal(id) {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await response.json();
    setData(json.drinks[0]);
    setIngredients(
      Object.entries(json.drinks[0]).filter(
        (arr) => arr[0].includes('Ingredient') && arr[1],
      ),
    );
  }

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/)[0];
    fetchMeal(id);
  }, []);

  function checkedIngredient({ target: { checked, parentNode } }) {
    if (checked) {
      parentNode.style.textDecoration = 'line-through';
    } else {
      parentNode.style.textDecoration = 'none';
    }
    setStateInLocalStorage();
  }

  if (!data) return <p>Loading...</p>;

  const { strDrinkThumb, strDrink, strCategory, strInstructions } = data;

  return (
    <div>
      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>

      <button type="button" data-testid="share-btn">
        COMPARTILHAR
      </button>
      <button type="button" data-testid="favorite-btn">
        FAVORITE
      </button>

      <p data-testid="recipe-category">{`Category: ${strCategory}`}</p>

      {ingredient.map((ingredients, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredients[1] }
        >
          {ingredients[1]}
          <input
            onClick={ checkedIngredient }
            type="checkbox"
            id={ ingredients[1] }
          />
        </label>
      ))}

      <p data-testid="instructions">{strInstructions}</p>

      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </div>
  );
}

export default DrinkProcess;
