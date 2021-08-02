const COCK_TAIL_FILTER_API = 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCK_TAIL_NAME_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const COCK_TAIL_FIRST_LETTER_API = 'www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const COCK_TAIL_FILTERS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const COCK_TAIL_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const COCK_TAILS_DEFAULT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getCockTailsDataByFilter = (ingredient) => {
  fetch(`${COCK_TAIL_FILTER_API}${ingredient}`).then((response) => response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
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

const requests = {
  getCockTailsDataByFilter,
  getCockTailsDataByName,
  getCockTailsDataByFirstLetter,
  getCockTailDetails,
};

export default requests;
