import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientCard from '../Components/IngredientCard';

import { getCockTailsIngredients } from '../Services/cockTailAPI';

function ExploreDrinkIngredients() {
  const [ingredients, setIngredients] = useState();

  React.useEffect(() => {
    const fetch = async () => {
      let data = await getCockTailsIngredients();
      const TWELVE = 12;

      data = data.filter((_, index) => index < TWELVE);
      setIngredients(data);
    };
    fetch();
  }, []);

  if (!ingredients) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" />
      {ingredients.map(({ strIngredient1 }, index) => (
        <Link
          key={ index }
          to={ {
            pathname: '/bebidas',
            state: strIngredient1,
          } }
        >
          <IngredientCard
            name={ strIngredient1 }
            index={ index }
            thumb={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          />
        </Link>

      ))}
      <Footer />
    </div>);
}

export default ExploreDrinkIngredients;
