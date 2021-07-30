import React from 'react';
import FoodDetail from '../Components/FoodDetail';

function FoodDetails() {
  const [meal, setMeal] = React.useState('');

  async function fetchFoodById() {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const json = await response.json();
    setMeal(json.meals[0]);
  }

  React.useEffect(() => {
    fetchFoodById();
  }, []);

  if (!meal) return <p>Loading...</p>;

  return <FoodDetail meal={ meal } />;
}

export default FoodDetails;
