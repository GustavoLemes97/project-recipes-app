import React from 'react';

function SearchBar() {
  return (
    <section>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Buscar Receita"
      />
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input data-testid="ingredient-search-radio" type="radio" />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input data-testid="name-search-radio" type="radio" />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input data-testid="first-letter-search-radio" type="radio" />
      </label>
      <button data-testid="exec-search-btn" type="button">
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
