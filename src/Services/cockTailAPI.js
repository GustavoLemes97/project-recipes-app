const COCK_TAIL_FILTER_API = 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCK_TAIL_NAME_API = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCK_TAIL_FIRST_LETTER_API = 'www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const getCockTailsDataByFilter = (ingredient) => (
  fetch(`${COCK_TAIL_FILTER_API}${ingredient}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getCockTailsDataByName = (name) => (
  fetch(`${COCK_TAIL_NAME_API}${name}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getCockTailsDataByFirstLetter = (firstLetter) => (
  fetch(`${COCK_TAIL_FIRST_LETTER_API}${firstLetter}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

const requests = {
  getCockTailsDataByFilter,
  getCockTailsDataByName,
  getCockTailsDataByFirstLetter,
};

export default requests;
