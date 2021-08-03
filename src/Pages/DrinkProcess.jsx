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

      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            {ingredient[1]}
          </li>
        ))}
      </ul>

      <p data-testid="instructions">{strInstructions}</p>

      <button type="button" data-testid="finish-recipe-btn">
        Finalizar
      </button>
    </div>
  );
}

export default DrinkProcess;
