import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import '../css/Food.css';

function Food() {
  const [data, setData] = React.useState();
  const [filters, setFilters] = React.useState();
  const [selected, setSelected] = React.useState();

  async function fetchFoods() {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    const json = await response.json();
    const twelve = 12;
    const filteredFoods = json.meals.filter((_, index) => index < twelve);
    setData(filteredFoods);
  }

  async function fetchFilters() {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    );
    const json = await response.json();
    const four = 4;
    setFilters(json.meals.filter((_, index) => index <= four));
  }

  async function fetchMeal(meal) {
    if (meal === selected) {
      fetchFoods();
    } else {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`,
      );
      const json = await response.json();
      const filtered = json.meals.filter((_, index) => index < 12);
      setData(filtered);
    }

    setSelected(meal);
  }

  React.useEffect(() => {
    fetchFoods();
    fetchFilters();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Comidas" searchBtn="true" />

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => fetchFoods() }
      >
        All
      </button>
      {filters
        && filters.map(({ strCategory }) => (
          <button
            onClick={ () => fetchMeal(strCategory) }
            key={ strCategory }
            type="submit"
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))}

      {data.map(({ strMealThumb, strMeal, idMeal }, idx) => (
        <Link key={ strMeal } to={ `/comidas/${idMeal}` }>
          <Card mealOrDrink={ strMeal } thumb={ strMealThumb } index={ idx } />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Food;
