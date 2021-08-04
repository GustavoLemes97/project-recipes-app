import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function MadeCard({
  index,
  image,
  name,
  tags,
  doneDate,
  category,
  type,
  id,
  alcoholicOrNot,
  area,
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const path = type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`;

  function copyToClipBoard() {
    const { pathname } = window.location;
    navigator.clipboard.writeText(
      `http://localhost:3000${pathname.replace(/\/receitas-feitas/, path)}`,
    );
    setCopiedLink(true);
  }
  console.log(type);

  return (
    <div>
      <button type="button" onClick={ copyToClipBoard }>
        <img
          src={ shareIcon }
          alt="share Button"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <Link to={ path }>
        <img
          data-testid={ `${index}-horizontal-image` }
          className="food-image"
          src={ image }
          alt={ name }
        />
        {copiedLink ? <p>Link copiado!</p> : null}
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      {alcoholicOrNot ? (
        <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
      ) : null}
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${area} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      {tags.map((tag, idx) => (
        <p key={ idx } data-testid={ `${index}-${tag}-horizontal-tag` }>
          {tag}
        </p>
      ))}
    </div>
  );
}

MadeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tags: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  area: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.bool.isRequired,
};

export default MadeCard;
