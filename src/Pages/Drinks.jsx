import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';

function Drinks() {
  const [data, setData] = React.useState();
  const [filters, setFilters] = React.useState();
  const [selected, setSelected] = React.useState();

  async function fetchAPI() {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    const json = await response.json();
    const twelve = 12;
    const filteredFoods = json.drinks.filter((_, index) => index < twelve);
    setData(filteredFoods);
  }

  async function fetchFilters() {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
    const json = await response.json();
    const four = 4;
    setFilters(json.drinks.filter((_, index) => index <= four));
  }

  async function fetchDrink(drink) {
    if (drink === selected) {
      fetchAPI();
    } else {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`,
      );
      const json = await response.json();
      const filtered = json.drinks.filter((_, index) => index < 12);
      setData(filtered);
    }

    setSelected(drink);
  }

  React.useEffect(() => {
    fetchAPI();
    fetchFilters();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Bebidas" searchBtn="true" />

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => fetchAPI() }
      >
        All
      </button>
      {filters
        && filters.map(({ strCategory }) => (
          <button
            onClick={ () => fetchDrink(strCategory) }
            key={ strCategory }
            type="submit"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}

      {data.map(({ strDrinkThumb, strDrink, idDrink }, idx) => (
        <Link key={ strDrink } to={ `/bebidas/${idDrink}` }>
          <Card mealOrDrink={ strDrink } thumb={ strDrinkThumb } index={ idx } />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
