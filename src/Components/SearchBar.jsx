import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  getMealsDataByFilter,
  getMealsDataByName,
  getMealsDataByFirstLetter,
} from '../Services/mealAPI';
import {
  getCockTailsDataByFilter,
  getCockTailsDataByName,
  getCockTailsDataByFirstLetter,
} from '../Services/cockTailAPI';
import { fetchMealsAPI, fetchCockTailsAPI } from '../Actions/index';

function SearchBar({ isFood }) {
  const [inputRadio, setInputRadio] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const changeInputRadio = ({ target: { value } }) => {
    setInputRadio(value);
  };

  const changeInput = ({ target: { value } }) => {
    setInput(value);
  };

  const drinkFetchs = () => {
    switch (inputRadio) {
    case 'ingredient':
      dispatch(fetchCockTailsAPI(getCockTailsDataByFilter, input));
      break;
    case 'name':
      dispatch(fetchCockTailsAPI(getCockTailsDataByName, input));
      break;
    case 'firstLetter': {
      return input.length > 1
        ? window.alert('Sua busca deve conter somente 1 (um) caracter')
        : dispatch(fetchCockTailsAPI(getCockTailsDataByFirstLetter, input));
    }
    default:
      break;
    }
  };

  const foodFetchs = () => {
    switch (inputRadio) {
    case 'ingredient':
      dispatch(fetchMealsAPI(getMealsDataByFilter, input));
      break;
    case 'name':
      dispatch(fetchMealsAPI(getMealsDataByName, input));
      break;
    case 'firstLetter':
      return input.length > 1
        ? window.alert('Sua busca deve conter somente 1 (um) caracter')
        : dispatch(fetchMealsAPI(getMealsDataByFirstLetter, input));
    default:
      break;
    }
  };

  return (
    <section>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receita"
        onChange={ changeInput }
      />
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input
          name="radio-filter"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          onChange={ changeInputRadio }
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          name="radio-filter"
          data-testid="name-search-radio"
          type="radio"
          value="name"
          onChange={ changeInputRadio }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input
          name="radio-filter"
          data-testid="first-letter-search-radio"
          type="radio"
          value="firstLetter"
          onChange={ changeInputRadio }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => (isFood ? foodFetchs() : drinkFetchs()) }
      >
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  isFood: PropTypes.bool.isRequired,
};
