import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function Profile() {
  const [email, setEmail] = useState();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    const user = JSON.parse(userLocalStorage);
    setEmail(user.email);
  }, []);

  return (
    <div>
      <Header pageTitle="Perfil" />
      <span data-testid="profile-email">{email}</span>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => setEmail(localStorage.clear()) }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Profile;
