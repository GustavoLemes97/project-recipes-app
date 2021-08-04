import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Card from './Card';

import { fetchMealsAPI } from '../Actions';
import { getMealsDefault, getMealsArea, getMealsByArea } from '../Services/mealAPI';

function MealsAreaDropBox() {
  const [areas, setAreas] = useState();
  const [data, setData] = useState();
  const [optionValue, setoptionValue] = useState('All');
  const globalState = useSelector(({ foods }) => foods);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (optionValue === 'All') dispatch(fetchMealsAPI(getMealsDefault));
    else {
      dispatch(fetchMealsAPI(getMealsByArea, optionValue));
    }
  }, [optionValue]);

  React.useEffect(() => {
    const twelve = 12;
    const filteredMeals = globalState.foods.filter((_, idx) => idx < twelve);
    setData(filteredMeals);
  }, [globalState.foods]);

  React.useEffect(() => {
    const fetch = async () => {
      const areaData = await getMealsArea();
      setAreas(areaData);
    };
    fetch();
  }, []);

  if (!areas) {
    return (
      <select>
        <option>Loading...</option>
      </select>
    );
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target: { value } }) => { setoptionValue(value); } }
      >
        <option data-testid="All-option">All</option>
        {
          areas.map(({ strArea }, index) => (
            <option key={ index } data-testid={ `${strArea}-option` }>
              {strArea}
            </option>
          ))
        }
      </select>
      {data.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Link key={ index } to={ `/comidas/${idMeal}` }>
          <Card mealOrDrink={ strMeal } thumb={ strMealThumb } index={ index } />
        </Link>
      ))}
    </div>
  );
}

export default MealsAreaDropBox;
