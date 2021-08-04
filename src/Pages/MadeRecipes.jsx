import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import MadeCard from '../Components/MadeCard';

function MadeRecipes() {
  const [recipes, setRecipes] = useState();

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setRecipes(doneRecipes);
  }, []);

  function allClick() {
    setRecipes(doneRecipes);
  }

  function foodClick() {
    const foodFilter = doneRecipes.filter(({ type }) => type === 'comida');
    setRecipes(foodFilter);
  }

  function drinkClick() {
    const drinkFilter = doneRecipes.filter(({ type }) => type === 'bebida');
    setRecipes(drinkFilter);
  }

  if (!recipes) {
    return <Header pageTitle="Receitas Feitas" />;
  }

  return (
    <div>
      <Header pageTitle="Receitas Feitas" />
      <button onClick={ allClick } type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button
        onClick={ foodClick }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ drinkClick }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {recipes.map((item, index) => (
        <MadeCard key={ index } index={ index } { ...item } />
      ))}
    </div>
  );
}

export default MadeRecipes;
