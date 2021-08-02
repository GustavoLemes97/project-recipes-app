import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import { fetchCockTailsAPI, fetchDrinkFilters } from '../Actions';
import {
  getCockTailsDefault,
  getCockTailsFilters,
  getCockTailsDataByName,
} from '../Services/cockTailAPI';

function Drinks() {
  const [data, setData] = React.useState();
  const [filters, setFilters] = React.useState();
  const [selected, setSelected] = React.useState();

  const dispatch = useDispatch();
  const globalState = useSelector(({ drinks }) => drinks);

  React.useEffect(() => {
    dispatch(fetchCockTailsAPI(getCockTailsDefault));
    dispatch(fetchDrinkFilters(getCockTailsFilters));
  }, []);

  React.useEffect(() => {
    const five = 5;
    const filteredFilters = globalState.filters.filter((_, idx) => idx < five);
    setFilters(filteredFilters);
  }, [globalState.filters]);

  React.useEffect(() => {
    const twelve = 12;
    const filteredDrinks = globalState.drinks.filter((_, idx) => idx < twelve);
    setData(filteredDrinks);
  }, [globalState.drinks]);

  function fetchDrinkByCategory(strCategory) {
    if (strCategory === selected) {
      dispatch(fetchCockTailsAPI(getCockTailsDefault));
    } else {
      dispatch(fetchCockTailsAPI(getCockTailsDataByName, strCategory));
      setSelected(strCategory);
    }
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header pageTitle="Bebidas" searchBtn="true" isFood={ false }/>

      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => dispatch(fetchCockTailsAPI(getCockTailsDefault)) }
      >
        All
      </button>
      {filters
        && filters.map(({ strCategory }) => (
          <button
            onClick={ () => fetchDrinkByCategory(strCategory) }
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
