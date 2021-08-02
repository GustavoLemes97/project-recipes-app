import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getRandomMeal } from '../Services/mealAPI';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreFood() {
  const history = useHistory();

  return (
    <div>
      <Header pageTitle="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area" type="button">
          Por Local de Origem
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ async () => {
          const id = await getRandomMeal();
          history.push(`/comidas/${id}`);
        } }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFood;
