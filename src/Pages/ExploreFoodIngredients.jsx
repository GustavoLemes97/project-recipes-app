import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientCard from '../Components/IngredientCard';
import { getMealsIngredients } from '../Services/mealAPI';

function ExploreFoodIngredients() {
  const [ingredients, setIngredients] = useState();

  React.useEffect(() => {
    const fetch = async () => {
      let data = await getMealsIngredients();
      const TWELVE = 12;

      data = data.filter((_, index) => index < TWELVE);
      setIngredients(data);
    }
    fetch();
  }, []);

  if (!ingredients) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" />
      {ingredients.map(({strIngredient}, index) => (
        <IngredientCard
          name={ strIngredient }
          index={ index }
          thumb={`https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`}
        />
      ))}
      <Footer />
    </div>);
}

export default ExploreFoodIngredients;
