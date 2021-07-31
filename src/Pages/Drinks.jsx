import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import { fetchCockTailsAPI } from '../Actions';
import {
  getCockTailsDefault,
  getCockTailsFilters,
} from '../Services/cockTailAPI';

function Drinks() {
  const [data, setData] = React.useState();
  const [filters, setFilters] = React.useState();
  const [selected, setSelected] = React.useState();

  const dispatch = useDispatch();
  const globalState = useSelector(({ drinks }) => drinks);

  React.useEffect(() => {
    dispatch(fetchCockTailsAPI(getCockTailsDefault));
    dispatch(fetchCockTailsAPI(getCockTailsFilters, 'filters'));
  }, [dispatch]);

  const setDrinksInData = useCallback(() => {
    const twelve = 12;
    const filteredDrinks = globalState.drinks.filter((_, index) => index < twelve);
    setData(filteredDrinks);
  }, [globalState.drinks]);

  const setFiltersInData = useCallback(() => {
    const five = 5;
    const filterButtons = globalState.filters.filter((_, index) => index < five);
    setFilters(filterButtons);
  }, [globalState.filters]);

  React.useEffect(() => {
    setDrinksInData();
  }, [setDrinksInData]);

  React.useEffect(() => {
    setFiltersInData();
  }, [setFiltersInData]);

  // async function fetchDrink(drink) {
  //   if (drink === selected) {
  //     fetchAPI();
  //   } else {
  //     const response = await fetch(
  //       `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`,
  //     );
  //     const twelve = 12;
  //     const json = await response.json();
  //     const filtered = json.drinks.filter((_, index) => index < twelve);
  //     setData(filtered);
  //   }

  //   setSelected(drink);
  // }
  console.log(globalState);
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Bebidas" searchBtn="true" />

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setDrinksInData() }
      >
        All
      </button>
      {filters
        && filters.map(({ strCategory }) => (
          <button
            // onClick={ () => fetchDrink(strCategory) }
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
