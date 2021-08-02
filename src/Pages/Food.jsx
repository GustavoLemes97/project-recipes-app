import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import { fetchMealsAPI, fetchMealFilters } from '../Actions';
import {
  getMealsDefault,
  getMealsFilters,
  getMealsDataByName,
} from '../Services/mealAPI';
import '../css/Food.css';

function Food() {
  const [data, setData] = React.useState();
  const [filters, setFilters] = React.useState();
  const [selected, setSelected] = React.useState();

  const dispatch = useDispatch();
  const globalState = useSelector(({ foods }) => foods);

  React.useEffect(() => {
    dispatch(fetchMealsAPI(getMealsDefault));
    dispatch(fetchMealFilters(getMealsFilters));
  }, []);

  React.useEffect(() => {
    const twelve = 12;
    const filteredMeals = globalState.foods.filter((_, idx) => idx < twelve);
    setData(filteredMeals);
  }, [globalState.foods]);

  React.useEffect(() => {
    const five = 5;
    const filteredFilters = globalState.filters.filter((_, idx) => idx < five);
    setFilters(filteredFilters);
  }, [globalState.filters]);

  function fetchMealsByCategory(strCategory) {
    if (strCategory === selected) {
      dispatch(fetchMealsAPI(getMealsDefault));
    } else {
      dispatch(fetchMealsAPI(getMealsDataByName, strCategory));
      setSelected(strCategory);
    }
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Comidas" searchBtn="true" />

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => dispatch(fetchMealsAPI(getMealsDefault)) }
      >
        All
      </button>
      {filters
        && filters.map(({ strCategory }, index) => (
          <button
            onClick={ () => fetchMealsByCategory(strCategory) }
            key={ index }
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
