import React from 'react';

function DrinkProcess() {
  const [data, setData] = React.useState('');

  async function fetchMeal(id) {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await response.json();
    setData(json.drinks[0]);
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
  }

  if (!data) return <p>Loading...</p>;

  const { strDrinkThumb, strDrink, strCategory, strInstructions } = data;

  const ingredients = Object.entries(data).filter(
    (arr) => arr[0].includes('Ingredient') && arr[1],
  );

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

      {ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient[1] }
        >
          {ingredient[1]}
          <input
            onClick={ checkedIngredient }
            type="checkbox"
            id={ ingredient[1] }
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
