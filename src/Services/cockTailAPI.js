const COCK_TAIL_FILTER_API = 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCK_TAIL_NAME_API = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCK_TAIL_FIRST_LETTER_API = 'www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const COCK_TAIL_FILTERS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const COCK_TAIL_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const getCockTailsDataByFilter = (ingredient) => {
  fetch(`${COCK_TAIL_FILTER_API}${ingredient}`).then((response) => response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
};

export const getCockTailsDataByName = async (name) => {
  const response = fetch(`${COCK_TAIL_NAME_API}${name}`);
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

export const getCockTailsByCategory = async () => {
  const response = await fetch(COCK_TAIL_CATEGORY);
  const json = await response.json();
  return json;
};

export const getCockTailsDefault = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  );
  const json = await response.json();
  return json;
};

const requests = {
  getCockTailsDataByFilter,
  getCockTailsDataByName,
  getCockTailsDataByFirstLetter,
};

export default requests;
