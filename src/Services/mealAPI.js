const MEALS_FILTER_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEALS_NAME_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const MEALS_FIRST_LETTER_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const DEFAULT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALS_FILTERS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const getMealsDataByFilter = async (ingredient) => {
  const response = await fetch(`${MEALS_FILTER_API}${ingredient}`);
  const json = await response.json();
  return json;
};

export const getMealsDataByName = async (name) => {
  const response = await fetch(`${MEALS_NAME_API}${name}`);
  const json = await response.json();
  return json;
};

export const getMealsDataByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${MEALS_FIRST_LETTER_API}${firstLetter}`);
  const json = await response.json();
  return json;
};

export const getMealsFilters = async () => {
  const response = await fetch(MEALS_FILTERS);
  const json = await response.json();
  return json;
};

export const getMealsDefault = async () => {
  const response = await fetch(DEFAULT_MEALS);
  const json = await response.json();
  return json;
};

const requests = {
  getMealsDataByFilter,
  getMealsDataByName,
  getMealsDataByFirstLetter,
  getMealsDefault,
};

export default requests;
