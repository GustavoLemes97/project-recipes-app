import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getItemLocalStorage, removeToFavorite } from '../Services/storage';

import '../css/FavoritesRecipes.css';

function FavoritesRecipes() {
  const [filter, setFilter] = useState('');
  const [copy, setCopy] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);

  const data = localStorage.favoriteRecipes
    ? getItemLocalStorage('favoriteRecipes') : [];

  const handleClick = ({ target: { value } }) => setFilter(value);

  const removeItem = (id) => {
    const milliseconds = 1000;
    removeToFavorite(id);
    setItemRemoved(true);
    setTimeout(() => setItemRemoved(false), milliseconds);
  };

  const share = (href) => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}${href}`);
    setCopy(true);
  };

  return (
    <main>
      <Header pageTitle="Receitas Favoritas" />
      <section>
        <button
          type="button"
          value=""
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          type="button"
          value="comida"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
        >
          comida
        </button>
        <button
          type="button"
          value="bebida"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
        >
          bebida
        </button>
        { itemRemoved && <p>Item removido dos favoritos</p> }
        { data.filter(({ type }) => type.includes(filter)).map(
          (
            { id, type, area, category, alcoholicOrNot, name, image },
            index,
          ) => (
            <div key={ name }>
              <Link to={ `/${type}s/${id}` } key={ name }>
                <img
                  className="recipe-favorite"
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
                </p>
                <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
              </Link>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => share(`/${type}s/${id}`) }
              >
                <img src={ shareIcon } alt="Share Icon" />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
                onClick={ () => removeItem(id) }
                src={ blackHeartIcon }
              >
                <img
                  src={ blackHeartIcon }
                  alt="favorite icon"
                />
              </button>
            </div>
          ),
        ) }
        { copy && <span>Link copiado!</span> }
      </section>
    </main>
  );
}

export default FavoritesRecipes;
