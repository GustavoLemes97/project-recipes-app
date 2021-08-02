import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoodDetail from '../Components/FoodDetail';
import { fetchMealDetails } from '../Actions';
import { getMealDetails } from '../Services/mealAPI';

function FoodDetails() {
  const [meal, setMeal] = React.useState('');

  const globalState = useSelector(({ foods }) => foods);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/);
    dispatch(fetchMealDetails(getMealDetails, id));
  }, []);

  React.useEffect(() => {
    setMeal(globalState.mealDetails);
  }, [globalState.mealDetails]);

  if (!meal) return <p>Loading...</p>;

  return <FoodDetail meal={ meal[0] } />;
}

export default FoodDetails;
