import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkDetails } from '../Actions';
import { getCockTailDetails } from '../Services/cockTailAPI';
import DrinkDetail from '../Components/DrinkDetail';

function DrinkDetails() {
  const [drink, setDrink] = React.useState('');

  const globalState = useSelector(({ drinks }) => drinks);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.match(/\d+/);
    dispatch(fetchDrinkDetails(getCockTailDetails, id));
  }, []);

  React.useEffect(() => {
    setDrink(globalState.drinkDetails);
  }, [globalState.drinkDetails]);

  if (!drink) return <p>Loading...</p>;

  return <DrinkDetail drink={ drink[0] } />;
}

export default DrinkDetails;
