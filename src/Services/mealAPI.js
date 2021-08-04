const MEALS_FILTER_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEALS_NAME_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALS_FIRST_LETTER_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const DEFAULT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALS_FILTERS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const MEAL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const MEAL_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const MEAL_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const MEAL_AREAS_API = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const MEALS_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const getMealsDataByFilter = async (ingredient) => {
  const response = await fetch(`${MEALS_FILTER_API}${ingredient}`);
  const json = await response.json();
  return json;
};

export const getMealsByCategory = async (category) => {
  const response = await fetch(`${MEAL_BY_CATEGORY}${category}`);
  const json = await response.json();
  return json;
};

export const getMealDetails = async (mealId) => {
  const response = await fetch(`${MEAL_DETAILS}${mealId}`);
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

export const getRandomMeal = async () => {
  const response = await fetch(`${RANDOM_MEAL}`);
  const json = await response.json();
  return json.meals[0].idMeal;
};

export const getMealsIngredients = async () => {
  const response = await fetch(`${MEAL_INGREDIENTS}`);
  const json = await response.json();
  return json.meals;
};

export const getMealsArea = async () => {
  const response = await fetch(`${MEAL_AREAS_API}`);
  const json = await response.json();
  return json.meals;
};

export const getMealsByArea = async (area) => {
  const response = await fetch(`${MEALS_BY_AREA}${area}`);
  const json = await response.json();
  return json;
};

const requests = {
  getMealsDataByFilter,
  getMealsDataByName,
  getMealsDataByFirstLetter,
  getMealsDefault,
  getMealDetails,
  getRandomMeal,
  getMealsByCategory,
  getMealsByArea,
};

export default requests;
