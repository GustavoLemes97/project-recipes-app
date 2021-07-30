const MEALS_FILTER_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEALS_NAME_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALS_FIRST_LETTER_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const getMealsDataByFilter = (ingredient) => (
  fetch(`${MEALS_FILTER_API}${ingredient}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

const getMealsDataByName = (name) => (
  fetch(`${MEALS_NAME_API}${name}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

const getMealsDataByFirstLetter = (firstLetter) => (
  fetch(`${MEALS_FIRST_LETTER_API}${firstLetter}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

const requests = {
  getMealsDataByFilter,
  getMealsDataByName,
  getMealsDataByFirstLetter,
};

export default requests;