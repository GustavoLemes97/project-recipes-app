const COCK_TAIL_FILTER_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCK_TAIL_NAME_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCK_TAIL_FIRST_LETTER_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const COCK_TAIL_FILTERS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const COCK_TAIL_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const COCK_TAILS_DEFAULT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCK_TAILS_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const COCK_TAILS_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const getCockTailsDataByFilter = async (ingredient) => {
  const response = await fetch(`${COCK_TAIL_FILTER_API}${ingredient}`);
  const json = await response.json();
  return json;
};

export const getCockTailsByCategory = async (name) => {
  const response = await fetch(`${COCK_TAILS_CATEGORY}${name}`);
  const json = await response.json();
  return json;
};

export const getCockTailDetails = async (id) => {
  const response = await fetch(`${COCK_TAIL_DETAILS}${id}`);
  const json = await response.json();
  return json;
};

export const getCockTailsDataByName = async (name) => {
  const response = await fetch(`${COCK_TAIL_NAME_API}${name}`);
  const json = await response.json();
  return json;
};

export const getCockTailsDataByFirstLetter = async (firstLetter) => {
  const response = await fetch(`${COCK_TAIL_FIRST_LETTER_API}${firstLetter}`);
  const json = await response.json();
  return json;
};

export const getCockTailsFilters = async () => {
  const response = await fetch(COCK_TAIL_FILTERS);
  const json = await response.json();
  return json;
};

export const getCockTailsDefault = async () => {
  const response = await fetch(COCK_TAILS_DEFAULT);
  const json = await response.json();
  return json;
};

export const getRandomCockTails = async () => {
  const response = await fetch(`${COCK_TAILS_RANDOM}`);
  const json = await response.json();
  return json.drinks[0].idDrink;
};

const requests = {
  getCockTailsDataByFilter,
  getCockTailsDataByName,
  getCockTailsDataByFirstLetter,
  getCockTailDetails,
  getRandomCockTails,
};

export default requests;
